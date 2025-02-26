const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');
const profileModel = require('../models/profile');
const requestModel = require('../models/connectionRequests');
const connectionModel = require('../models/connections');
const rejectedRequestModel = require('../models/rejectedRequests');




const suggestedNetwork = async (req, res, next) => {
  const {username} = req.body;
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
  //const username = req.body;
  const {recieverUsername, username} = req.body;
  const user = await userModel.findOne({ username: username });
  
  const reciever = await userModel.findOne({ username: recieverUsername });
  

  try {
      if(!reciever || !user){
        return next(new ApiError(400, 'Content is required'));
      }
      const rejected = await rejectedRequestModel.findOne({ sender: user._id, reciever: reciever._id });
  const alreadyConnected = await connectionModel.findOne({user: user._id, connectedusers: reciever._id});

      if(alreadyConnected){
        return next(new ApiError(400, 'You are already connected with this user! No need to send the request again.'));
      }

      if(rejected){
        return next(new ApiError(400, 'You have already sent a request that was rejected. Please wait before sending a new one.'));
      }

    const newRequest = new requestModel({
      sender: user._id,
      reciever: reciever._id,
      reqstatus: 'pending',
    });

    await newRequest.save();

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
    const { recieverusername, senderusername } = req.body;
    const senderid = await userModel.findOne({username: senderusername});
    const recieverid = await userModel.findOne({username: recieverusername});
    const request = await requestModel.findOne({ sender: senderid, reciever: recieverid });
    
  
    try {
        if(!request){
          return next(new ApiError(400, 'Request does not exist'));
        }
  
        const updatedSenderConnection = await connectionModel.findOneAndUpdate(
            { user: senderid }, // Find document by user ID
            { $addToSet: { connectedusers: recieverid } }, // Add new connection only if it's not already there
            { new: true, upsert: true } // Create if not exists, return updated doc
          );

          const updatedRecieverConnection = await connectionModel.findOneAndUpdate(
            { user: recieverid }, // Find document by user ID
            { $addToSet: { connectedusers: senderid } }, // Add new connection only if it's not already there
            { new: true, upsert: true } // Create if not exists, return updated doc
          );

          await requestModel.findOneAndDelete({ _id: connectionrequest });
  
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
    const { recieverusername, senderusername } = req.body;
    const senderid = await userModel.findOne({username: senderusername});
    const recieverid = await userModel.findOne({username: recieverusername});
    const request = await requestModel.findOne({ sender: senderid, reciever: recieverid });
    
  
    try {
        if(!request){
          return next(new ApiError(400, 'Request is no longer available.'));
        }

        const newReject = new rejectedRequestModel({
          sender: senderid,
          reciever: recieverid,
        });
    
        await newReject.save();

        await requestModel.findOneAndDelete({ _id: connectionrequest });
  
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