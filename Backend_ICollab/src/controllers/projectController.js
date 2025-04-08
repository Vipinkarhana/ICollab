const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const config = require('../../config/config');
const userModel = require('../models/user');
const projectModel = require('../models/project');
const { URL } = require('url');
const { generatePresignedUrl, deleteFromR2 } = require('../../config/s3');

const addProject = async (req, res, next) => {
    try{
       // const username = req.user.username;
        const {username, title, description, category, startDate, tags, collaborators, role, media, endDate, stillOngoing } = req.body;
        const user = await userModel.findOne({ username: username });
        if (!user) {
            return next(new ApiError(404, 'User not found'));
          }
        if(!title){
            return next(new ApiError(400, 'Title is required'));
        }
        if(!description){
            return next(new ApiError(400, 'Description is required'));
        }
        if(!category){
            return next(new ApiError(400, 'Category is required'));
        }
        if(!startDate){
            return next(new ApiError(400, 'Starting Date is required'));
        }
        if(!tags){
            return next(new ApiError(400, 'Minimum 1 tag is required'));
        }
        if(!role){
            return next(new ApiError(400, 'Role is required'));
        }
        const isOngoing = (stillOngoing === true || stillOngoing === 'true');
        const projectEndDate = isOngoing ? null : endDate;
        if (!isOngoing && !endDate) {
            return next(new ApiError(400, 'End Date is required for non-ongoing projects'));
        }
        const newProject = new projectModel({
              user: user._id,
              title,
              description,
              category,
              startDate,
              endDate: projectEndDate,
              isOngoing,
              tags,
              collaborators,
              role
            });
        await newProject.save();

        const mediaList = Array.isArray(media) ? media : [];

        const presignedUrls = await Promise.all(
              mediaList.map(async ({ fileType, fileName }) => {
                const key = `projects/${newProject._id}/${Date.now()}-${fileName}`;
                return await generatePresignedUrl(key, fileType);
              })
            );

        res.status(201).json({
            message: 'Project created successfully',
            data: { projectid: newProject._id, presignedUrls },
            status: 'success',
        });
    }
    catch(err){
        next(err);
    }
};

module.exports = {
  addProject
};