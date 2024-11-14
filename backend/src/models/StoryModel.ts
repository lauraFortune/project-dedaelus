
import mongoose, { Document, Schema, model } from 'mongoose';

export interface IStory extends Document {
  title: string;
  synopsis: string;
  author: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  publish: boolean;
  chapters: IChapter[];
  createdAt: Date; // Automatically added by Mongoose timestamps
  updatedAt: Date;
}

export interface IChapter {
  scenes: IScene[];
}

export interface IScene {
  title: string;
  image?: string;
  description: string;
  prompt?: string;
  choices: IChoice[];
}

export interface IChoice {
  text: string;
  targetChapter: number;
  targetScene: number;
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
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
              targetChapter: {
                type: Number,
                default: 0,
                required: true,
              },
              targetScene: {
                type: Number,
                default: 0,
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


const Story = model<IStory>('Story', storySchema);

export default Story;
