const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');
const profileModel = require('../models/profile');
const requestModel = require('../models/connectionRequests');
const connectionModel = require('../models/connections');
const rejectedRequestModel = require('../models/rejectedRequests');

const suggestedNetwork = async (req, res, next) => {
  const username = req.user.username;
  try {
    const user = await userModel.findOne({ username }).lean();
    const userId = user._id;

    const connections = await connectionModel.findOne({ user: userId }).lean();
    const connectedUserIds = connections ? connections.connectedusers : [];

    const requests = await requestModel.find({
      $or: [{ sender: userId }, { reciever: userId }],
    }).lean();

    const requestedUserIds = new Set();
    for (const req of requests) {
      if (req.sender.toString() !== userId.toString()) {
        requestedUserIds.add(req.sender.toString());
      }
      if (req.reciever.toString() !== userId.toString()) {
        requestedUserIds.add(req.reciever.toString());
      }
    }

    const excludedIds = new Set([
      ...connectedUserIds.map(id => id.toString()),
      ...requestedUserIds,
      userId.toString(),
    ]);

    const notConnectedUsers = await userModel
      .find({
        _id: { $nin: Array.from(excludedIds) }
      })
      .populate({
        path: 'profile',
        select: 'designation -_id'
      })
      .select('name profile_pic username')
      .limit(50)

    const response = notConnectedUsers.map(user => user.toJSON());

    res.status(200).json({
      message: 'Non-connected users fetched successfully',
      status: 'success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};


const userNetwork = async (req, res, next) => {
  const username = req.user.username;
  const user = await userModel.findOne({ username: username }).lean();

  try {
    const connections = await connectionModel
      .findOne({ user: user._id })
      .populate({
        path: 'connectedusers',
        select: 'name profile_pic username -_id',
        populate: {
          path: 'profile',
          select: 'designation about -_id'
        }
      })
      .lean();

    if (!connections) {
      return next(
        new ApiError(400, 'Connections Not Found')
      );
    }

    const connectedUser = connections ? connections.connectedusers : [];
    if (connectedUser.length === 0) {
      return next(new ApiError(400, 'No Users Connected'));
    }

    res.status(200).json({
      message: 'Connected users fetched successfully',
      status: 'success',
      data: connectedUser,
    });
  } catch (error) {
    next(error);
  }
};

const sendRequest = async (req, res, next) => {

  const { recieverUsername } = req.body;

  const user = await userModel.findOne({ username: req.user.username }).lean();
  const reciever = await userModel
    .findOne({ username: recieverUsername })
    .lean();

  try {
    if (!reciever) {
      return next(new ApiError(400, 'Reciever does not exist'));
    }

    if (!user) {
      return next(new ApiError(400, 'User does not exist'));
    }

    const [rejected, alreadyConnected, requested] = await Promise.all([
      rejectedRequestModel.exists({ sender: user._id, reciever: reciever._id }),
      connectionModel.exists({ user: user._id, connectedusers: reciever._id }),
      requestModel.exists({ sender: user._id, reciever: reciever._id }),
    ]);

    if (rejected) {
      return next(
        new ApiError(
          400,
          'You have already sent a request that was rejected. Please wait before sending a new one.'
        )
      );
    } else if (alreadyConnected) {
      return next(
        new ApiError(
          400,
          'You are already connected with this user! No need to send the request again.'
        )
      );
    }
    else if (requested) {
      return next(
        new ApiError(
          400,
          'You have already sent the request! No need to send the request again.'
        )
      );
    }

    const newRequest = await requestModel.create({
      sender: user._id,
      reciever: reciever._id,
      reqstatus: 'pending',
    });

    res.status(200).json({
      message: 'Request Created',
      status: 'success',
      data: newRequest,
    });
  } catch (error) {
    next(error);
  }
};

const acceptRequest = async (req, res, next) => {

  const { senderUsername } = req.body;
  const sender = await userModel.findOne({ username: senderUsername }).lean();
  const reciever = await userModel
    .findOne({ username: req.user.username })
    .lean();

  const request = await requestModel
    .findOne({
      sender: sender._id,
      reciever: reciever._id,
    })
    .lean();

  try {
    if (!request) {
      return next(new ApiError(400, 'Request does not exist'));
    }

    const [updatedSenderConnection, updatedRecieverConnection] =
      await Promise.all([
        connectionModel.findOneAndUpdate(
          { user: sender._id },
          { $addToSet: { connectedusers: reciever._id } },
          { new: true, upsert: true }
        ),
        connectionModel.findOneAndUpdate(
          { user: reciever._id },
          { $addToSet: { connectedusers: sender._id } },
          { new: true, upsert: true }
        ),
      ]);

    await requestModel.findByIdAndDelete(request._id);

    res.status(200).json({
      message: 'Request Accepted',
      status: 'success',
      data: updatedSenderConnection,
      updatedRecieverConnection,
    });
  } catch (error) {
    next(error);
  }
};

const rejectRequest = async (req, res, next) => {
  const { senderUsername } = req.body;

  const sender = await userModel.findOne({ username: senderUsername }).lean();
  const reciever = await userModel
    .findOne({ username: req.user.username })
    .lean();

  const request = await requestModel
    .findOne({
      sender: sender._id,
      reciever: reciever._id,
    })
    .lean();

  try {
    if (!request) {
      return next(new ApiError(400, 'Request is no longer available.'));
    }

    const newReject = await rejectedRequestModel.create({
      sender: sender._id,
      reciever: reciever._id,
    });

    await requestModel.findByIdAndDelete(request._id);

    res.status(200).json({
      message: 'Request Rejected',
      status: 'success',
      data: newReject,
    });
  } catch (error) {
    next(error);
  }
};

const collabRequest = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.user.username }).lean();
  const requests = await requestModel
    .find({ reciever: user._id })
    .populate('sender')
    .lean();
  try {
    if (!requests) {
      return next(new ApiError(400, 'Collaboration Requests could not be fetched'));
    }

    res.status(200).json({
      message: 'Requests fetched successfully',
      status: 'success',
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

const myCollabRequest = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.user.username }).lean();
    const requests = await requestModel
      .find({ sender: user._id })
      .select('_id reciever')
      .populate({
        path: 'reciever',
        select: 'name profile_pic username'
      })

    if (!requests) {
      return next(new ApiError(400, 'Your Requests could not be fetched'));
    }

    const response = requests.map(request => request.toJSON())

    res.status(200).json({
      message: 'Requests fetched successfully',
      status: 'success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  rejectRequest,
  suggestedNetwork,
  userNetwork,
  collabRequest,
  myCollabRequest,
};
