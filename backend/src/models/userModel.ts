
import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  admin: boolean;
  profileImage: string;
  bio: string;
  stories: mongoose.Types.ObjectId[];
  favouriteStories: mongoose.Types.ObjectId[];
  createdAt: Date; // Automatically added by Mongoose timestamps
  updatedAt: Date;
}


const userSchema = new Schema <IUser> ({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  admin: {
    type: Boolean,
    default: false, // User manually set to admin
  },
  profileImage: {
    type: String,
    default: 'defaultImage.png',
  },
  bio: {
    type: String,
    default: 'All about me....',
    maxlength: 500,
  },
  stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story',
    }
  ],
  favouriteStories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story',
    }
  ], 
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});


const User = model<IUser>('User', userSchema);

export default User;