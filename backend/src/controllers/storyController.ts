
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Story, { IStory } from '../models/StoryModel';
import User, { IUser } from '../models/UserModel';
import CustomError from '../utils/CustomError';
import { UpdateStoryRequestBody } from '../types';


// Get all Stories
// router.get('/stories', getAllStories);
const getAllStories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);

  } catch (err) {
    console.error(`Stories.GetAll Error: ${err}`);
    next(err);
  }
}

// Get story by ID
// router.get('/stories/:id', getStoryById);
const getStoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const story = await Story.findById(id);

    if (!story) throw new CustomError('Story not found', 404);
    
    res.status(200).json(story);
  } catch (err) {
    console.error(`Story.GetById Error: ${err}`);
    next(err);
  }
}

// Create a new story
// router.post('/stories', createStory);
const createStory = async (req: Request, res: Response, next: NextFunction) => {
  
  try {

    if (!req.user) throw new CustomError("User not authenticated", 401);

    const userId = req.user._id;
    
    // Create and save the story within the transaction
    const newStory = new Story({ author: userId }); // Creates story template populated with schema default values 
    const savedStory = await newStory.save();

    // Update the user's stories array within the transaction
    const updatedUser = await User.findByIdAndUpdate( 
      userId, 
      { $push: { stories: savedStory._id } },
      { new: true }
    );

    // If user update fails, delete story to maintain data integrity
    if (!updatedUser) {
      try {
        await Story.findByIdAndDelete(savedStory._id);
      } catch (err) {
        console.error(`Failed to delete orphaned story: ${err}`)
      }
      throw new CustomError('User not found', 404);
    }

    res.status(201).json(savedStory);

  } catch (err) {
    console.error(`Stories.Create Error: ${err}`);
    next(err);
  }
}

// Update Story by ID - PATCH for partial update
// router.patch('/stories/:id', updateStory);
const updateStory = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const updatedStoryData = req.body as UpdateStoryRequestBody;

    const story = await Story.findByIdAndUpdate(req.params.id, updatedStoryData, {
      new: true,
      runValidators: true,  // Ensures updated fields are validated
    });

    if (!story) throw new CustomError('Story not found', 404);
    
    res.status(200).json({ status: 'success', data: story });

  } catch (err) {
    console.error(`Stories.Update Error: ${err}`);
    next(err);
  }
}

// Delete Story by ID
// router.delete('/stories/:id', deleteStoryById);
const deleteStoryById = async(req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const story = await Story.findByIdAndDelete(id);

    if (!story) throw new CustomError('Story not found', 404);
    
    res.status(200).json({ message: `Story successfully deleted` });
    
  } catch (err) {
    console.error(`Story.Delete Error: ${err}`);
    next(err);
  }
}

export {
  getAllStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStoryById,
}