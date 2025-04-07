const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');
const profileModel = require('../models/profile');
const requestModel = require('../models/connectionRequests');
const connectionModel = require('../models/connections');
const rejectedRequestModel = require('../models/rejectedRequests');

const suggestedNetwork = async (req, res, next) => {
  const username = req.user.username;
  const user = await userModel.findOne({ username: username });
  const connections = await connectionModel.findOne({ user: user._id });
  const connectedUserIds = connections ? connections.connectedusers : [];

  try {
    if (!connectedUserIds) {
      return next(new ApiError(400, 'Connected User Ids couldn not be fetched'));
    }

    connectedUserIds.push(user._id);

    const notConnectedUsers = await userModel.find({
      _id: { $nin: connectedUserIds }
    });

    res.status(200).json({
      message: 'Non-connected users fetched successfully',
      status: 'success',
      data: notConnectedUsers,
    });
  } catch (error) {
    next(error);
  }
};

const userNetwork = async (req, res, next) => {
  const username = req.user.username;
  console.log("username: ", username);
  console.log("username: ", req.user);
  const user = await userModel.findOne({ username: username })
  console.log("user: ", user);

  try {
    const connections = await connectionModel.findOne({ user: user._id })
      .populate({
        path: 'connectedusers',
        populate: {
          path: 'profile',
        }
      });
    const connectedUserIds = connections ? connections.connectedusers : [];

    if (!connectedUserIds) {
      return next(new ApiError(400, 'Connected User Ids couldn not be fetched'));
    }

    res.status(200).json({
      message: 'Connected users fetched successfully',
      status: 'success',
      data: connectedUserIds,
    });
  } catch (error) {
    next(error);
  }
};

const sendRequest = async (req, res, next) => {
  console.log(req.body);
  const { recieverUsername } = req.body;

  const user = await userModel.findOne({ username: req.user.username }).lean();
  const reciever = await userModel.findOne({ username: recieverUsername }).lean();

  console.log("reciever: ", reciever);
  console.log("user: ", user);

  try {
    if (!reciever) {
      return next(new ApiError(400, 'Reciever does not exist'));
    }

    if (!user) {
      return next(new ApiError(400, 'User does not exist'));
    }

    const [rejected, alreadyConnected] = await Promise.all([
      rejectedRequestModel.exists({ sender: user._id, reciever: reciever._id }),
      connectionModel.exists({ user: user._id, connectedusers: reciever._id }),
    ]);

    if (rejected) {
      return next(new ApiError(400, 'You have already sent a request that was rejected. Please wait before sending a new one.'));
    }
    else if (alreadyConnected) {
      return next(new ApiError(400, 'You are already connected with this user! No need to send the request again.'));
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
  console.log(req.body);
  const { senderUsername } = req.body;

  const sender = await userModel.findOne({ username: senderUsername }).lean();
  const reciever = await userModel.findOne({ username: req.user.username }).lean();

  console.log("reciever: ", reciever);
  console.log("sender: ", sender);
  const request = await requestModel.findOne({
    sender: sender._id,
    reciever: reciever._id,
  }).lean();

  try {
    if (!request) {
      return next(new ApiError(400, 'Request does not exist'));
    }

    const [updatedSenderConnection, updatedRecieverConnection] = await Promise.all([
      connectionModel.findOneAndUpdate(
        { user: sender._id },
        { $addToSet: { connectedusers: reciever._id } },
        { new: true, upsert: true }
      ),
      connectionModel.findOneAndUpdate(
        { user: reciever._id },
        { $addToSet: { connectedusers: sender._id } },
        { new: true, upsert: true }
      )
    ]);

    await requestModel.findByIdAndDelete(request._id);

    res.status(200).json({
      message: 'Request Accepted',
      status: 'success',
      data: updatedSenderConnection, updatedRecieverConnection,
    });
  } catch (error) {
    next(error);
  }
};

const rejectRequest = async (req, res, next) => {
  const { senderUsername } = req.body;

  const sender = await userModel.findOne({ username: senderUsername }).lean();
  const reciever = await userModel.findOne({ username: req.user.username }).lean();

  const request = await requestModel.findOne({
    sender: sender._id,
    reciever: reciever._id,
  }).lean();

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

const getRequest = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.user.username }).lean();
  const requests = await requestModel.find({ reciever: user._id }).populate('sender');
  ;
  try {
    if (!requests) {
      return next(new ApiError(400, 'Requests could not be fetched'));
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

module.exports = {
  sendRequest,
  acceptRequest,
  rejectRequest,
  suggestedNetwork,
  userNetwork,
  getRequest,
};