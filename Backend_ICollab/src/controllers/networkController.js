const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');
const profileModel = require('../models/profile');
const requestModel = require('../models/connectionRequests');
const connectionModel = require('../models/connections');
const rejectedRequestModel = require('../models/rejectedRequests');




const suggestedNetwork = async (req, res, next) => {
  const {username} = req.user.username;
  const user = await userModel.findOne({ username: username });
  const connections = await connectionModel.findOne({ user: user._id });
  const connectedUserIds = connections ? connections.connectedusers : [];
  
  try {
      if(!connectedUserIds){
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
  const {username} = req.body;
  const user = await userModel.findOne({ username: username });
  
  
  try {

      const connections = await connectionModel.findOne({ user: user._id }).populate('connectedusers');
      const connectedUserIds = connections ? connections.connectedusers : [];

      if(!connectedUserIds){
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
  const {recieverUsername} = req.body;
  //const user = await userModel.findOne({ _id: req.user._id });
  //const reciever = await userModel.findOne({ username: recieverUsername });
  
  const [user, reciever] = await Promise.all([
    userModel.findOne({username: req.user.username}).lean(),
    userModel.findOne({ username: recieverUsername }).lean(),
  ]);

  console.log(user);


  try {
      if(!reciever || !user){
        return next(new ApiError(400, 'Content is required'));
      }
      //const rejected = await rejectedRequestModel.findOne({ sender: user._id, reciever: reciever._id });
      //const alreadyConnected = await connectionModel.findOne({user: user._id, connectedusers: reciever._id});

      const [rejected, alreadyConnected] = await Promise.all([
        rejectedRequestModel.exists({ sender: user._id, reciever: reciever._id }),
        connectionModel.exists({ user: user._id, connectedusers: reciever._id }),
      ]);



      if(rejected){
         return next(new ApiError(400, 'You have already sent a request that was rejected. Please wait before sending a new one.'));
      }

      else if(alreadyConnected){
        return next(new ApiError(400, 'You are already connected with this user! No need to send the request again.'));
      }

      

   /* const newRequest = new requestModel({
      sender: user._id,
      reciever: reciever._id,
      reqstatus: 'pending',
    });

    await newRequest.save();*/



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
    const {senderusername } = req.body;
    const [senderid, recieverid] = await Promise.all([
      userModel.findOne({ username: senderusername }).lean(),
      userModel.findOne({ username: req.user.username }).lean()
    ]);

console.log("recieverid: ", recieverid);


    const request = await requestModel.findOne({
      sender: senderid,
      reciever: recieverid,
    }).lean();
  



    try {
        if(!request){
          return next(new ApiError(400, 'Request does not exist'));
        }

          const [updatedSenderConnection, updatedRecieverConnection] = await Promise.all([
            connectionModel.findOneAndUpdate(
              { user: senderid },
              { $addToSet: { connectedusers: recieverid } },
              { new: true, upsert: true }
            ),
            connectionModel.findOneAndUpdate(
              { user: recieverid },
              { $addToSet: { connectedusers: senderid } },
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
    const {senderusername } = req.body;
    const [senderid, recieverid] = await Promise.all([
      userModel.findOne({ username: senderusername }).lean(),
      userModel.findOne({ username: req.user.username }).lean()
    ]);

    const request = await requestModel.findOne({
      sender: senderid,
      reciever: recieverid,
    }).lean();
  
    try {
        if(!request){
          return next(new ApiError(400, 'Request is no longer available.'));
        }

        const newReject = await rejectedRequestModel.create({
          sender: senderid,
          reciever: recieverid,
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


module.exports = {
    sendRequest,
    acceptRequest,
    rejectRequest,
    suggestedNetwork,
    userNetwork,
  };