// middlewares/validation.js
const { z } = require('zod');
const ApiError = require('../utils/ApiError');

const validateRegister = (req, res, next) => {
  const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid Email address'),
    password: z.string().min(6, "Password's minimum length is 6"),
  });

  try {
    req.body = registerSchema.parse(req.body); // Parse and validate request body
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(
        new ApiError(400, error.errors.map((err) => err.message).join(', '))
      );
    }
    next(error);
  }
};

const validateLogin = (req, res, next) => {
  const loginSchema = z.object({
    email: z.string().email('Invalid Email address'),
    password: z.string().min(6, "Password's minimum length is 6"),
  });

  try {
    req.body = loginSchema.parse(req.body); // Parse and validate request body
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(
        new ApiError(400, error.errors.map((err) => err.message).join(', '))
      );
    }
    next(error);
  }
};

const validatePost = (req, res, next) => {
  const postSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    media: z
      .array(
        z.object({
          fileType: z.string().min(1, 'File type is required'),
          fileName: z.string().min(1, 'File name is required'),
        })
      )
      .optional(), // Optional media array
    tag: z.array(z.string()).optional(),
  });

  try {
    req.body = postSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(
        new ApiError(400, error.errors.map((err) => err.message).join(', '))
      );
    }
    next(error);
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  validatePost,
};
