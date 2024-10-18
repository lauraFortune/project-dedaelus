
import { NextFunction, Request, Response } from 'express';
import Story, { IStory } from '../models/StoryModel';
import { CreateStoryRequestBody } from '../types';


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
    const story = await Story.findById(req.params.id);
    if (!story) {
      res.status(404).json({ error: 'Story not found' });
      return;
    }
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
    const { author } = req.body as CreateStoryRequestBody; // temporary for testing - pre auth setup

    const newStory = new Story({
      author: author,
      // Default values for other fields
    })

    const savedStory = await newStory.save();

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
    const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateStory) {
      res.status(404).json({ error: 'Story not found' });
    }

    res.status(200).json({ status: 'success', data: updatedStory });

  } catch (err) {
    console.error(`Stories.Update Error: ${err}`);
    next(err);
  }
}

// Delete Story by ID
// router.delete('/stories/:id', deleteStoryById);
const deleteStoryById = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      res.status(404).json({ error: `Story not found` });
      return;
    }
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