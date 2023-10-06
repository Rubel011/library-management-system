const express=require("express");
const { authenticateToken } = require("../middleware/authentication");
const { retriveAllUsers, addNewUser, loginUser, userProfile, retriveUsersById } = require("../controllers/userController");
const userRouter=express.Router()

/**
 * @route   GET /users
 * @desc    Get all users (protected route)
 * @access  Private
 */
userRouter.get("/",authenticateToken,retriveAllUsers);

/**
 * @route   GET /users
 * @desc    Get  users using Id (protected route)
 * @access  Private
 */
userRouter.get("/:id",retriveUsersById); 

/**
 * @route   POST /users/register
 * @desc    Register a new user
 * @access  Public
 */
userRouter.post("/register", addNewUser);

/**
 * @route   POST /users/login
 * @desc    Log in user
 * @access  Public
 */
userRouter.post("/login", loginUser);

/**
 * @route   GET /users/profile
 * @desc    Get user profile (protected route)
 * @access  Private
 */


module.exports = userRouter;