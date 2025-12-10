
import mongoose, { Document, Schema, Types, model } from 'mongoose';

export interface IStory extends Document {  // Document object has _id
  title: string;
  synopsis: string;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  publish: boolean;
  chapters: IChapter[];
  createdAt: Date; // Automatically added by Mongoose timestamps
  updatedAt: Date;

  // Methods
  isPublished(): boolean;
  addLike(userId: Types.ObjectId): void;
  removeLike(userId: Types.ObjectId): void;
  isLikedBy(userId: Types.ObjectId): boolean;
}

export interface IChapter {
  _id?: Types.ObjectId;
  scenes: IScene[];
}

export interface IScene {
  _id?: Types.ObjectId;
  title: string;
  image?: string;
  description: string;
  prompt?: string;
  choices: IChoice[];
}

export interface IChoice {
  _id?: Types.ObjectId;
  text: string;
  targetChapterId: Types.ObjectId;
  targetSceneId: Types.ObjectId;
}


const storySchema = new Schema <IStory> ({
  title: {
    type: String,
    default: 'Once Upon a Time....',
    trim: true,
  },
  synopsis: {
    type: String,
    default: 'Our story begins in ....',
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  publish: {
    type: Boolean,
    default: false, // Only true if user selects to publish
  },
  chapters: [
    {
      scenes: [
        {
          title: {
            type: String,
            default: 'Scene 1',
            required: [true, 'A scene must have a title'],
          },
          image: {
            type: String,
            default: '_defaultScene.png',
          },
          description: {
            type: String,
            default: 'Please enter a description....',
          },
          prompt: {
            type: String,
            default: 'Please enter a prompt....',
          },
          choices: [
            {
              text: {
                type: String,
                default: 'Choice',
                required: true,
              },
              targetChapterId: {
                type: Schema.Types.ObjectId,
                required: true,
              },
              targetSceneId: {
                type: Schema.Types.ObjectId,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
  
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});


/**
 * Story Model Methods
 */

// Check if story is published
storySchema.methods.isPublished = function(): boolean {
  return this.publish;
}

// Add a like from a User
storySchema.methods.addLike = function(userId: Types.ObjectId): void {
  if (!this.isLikedBy(userId)) {    // only allow like if not already liked by this user
    // Push userId into likes array
    this.likes.push(userId);
  } 
}

// Remove a like from a User
storySchema.methods.removeLike = function(userId: Types.ObjectId): void {
  if (this.isLikedBy(userId)) {   // only allow unlike if already liked by this user
    // filters out users Id from likes array
    this.likes = this.likes.filter((id: Types.ObjectId) => id.toString() !== userId.toString())
  }
}

// Check if user has liked this story
storySchema.methods.isLikedBy = function(userId: Types.ObjectId): boolean {
  // checks if any id matches userId - returns true or false
  return this.likes.some((id: Types.ObjectId) => id.toString() === userId.toString());
};


const Story = model<IStory>('Story', storySchema);

export default Story;
