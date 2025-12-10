
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


const Story = model<IStory>('Story', storySchema);

export default Story;
