
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import User, { IUser } from "../models/UserModel";
import { RegisterRequestBody, LoginRequestBody, UpdateProfileRequestBody } from "../types";


/**
 * Create a New User - Register
 * router.post('/users', registerUser);
 */
const registerUser = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const { username, email, password } = req.body as RegisterRequestBody;
    // Check username and email are unique ( do not already exist in the DB )
    const userExists = await User.findOne({
      $or: [
        {username: {$regex: new RegExp(username, 'i')}}, // regex - ignore case sensitivity
        {email: email}
      ],
    });
    // Handle User Exists
    if (userExists) {
      res.status(409).json({ error: `Username or Email already exists.`});
      return;
    } 
  
    // bcrypt hash password
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    // Create a new user
    const newUser: IUser = new User({ username, email, password: hashedPassword });
    // Save new user to mongoDB
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Sanitise password!!

  } catch (err) {
    console.error(`User.Register error: ${err}`);
    next(err)
  }
};


// Authenticate a User - Login 
// router.post('/users/login');
const loginUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as LoginRequestBody;

    const userFound: IUser | null = await User.findOne({ email: { $regex: new RegExp(email, 'i') }, });
    // consider adding generic error message - 'Invalid email or password'
    if (!userFound) {
      res.status(401).json({ error: 'Email not found' });              // 401 - not authenticated
      return;
    } 
      
    const passwordMatch = await bcrypt.compare(password, userFound.password as string);
    if(!passwordMatch) {
      res.status(401).json({ error: 'Passwords do not match'});    // 401 - not authenticated
      return;
    } 
     
    const userId = userFound._id as string;
    const token = generateToken(userId);
  
    res.status(200).json({ token, email: userFound.email, userId });
    
  } catch (err) {
    console.error(`User.Login error: ${err}`)
    next(err);
  }
}

// Get all Users
// router.get('/users', );
const getAllUsers  = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password'); // Select all fields except password - sanitise output
    res.status(200).json(users);

  } catch (err) {
    console.error(`Users.GetAll Error: ${err}`);
    next(err);
  }
};

// Get User by ID
// router.get('/users/:id', );
const getUserById = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password'); // Select all fields except password - sanitise output
    if (!user) {
      res.status(404).json({ error: 'User not found'});
      return;
    } 
  
    res.status(200).json(user);
  } catch (err) {
    console.error(`User.GetById Error: ${err}`);
    next(err);
  }
}


// Update User by ID
// router.put('/users/:id', );
const updateUserProfile = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = req.body as UpdateProfileRequestBody;
    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true }).select('-password');

    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    } 

    res.status(200).send(user);

  } catch (err) {
    console.error(`User.UpdateProfile Error: ${err}`);
    next(err);
  }
}


// Delete User by ID
// router.delete('/users/:id', );
const deleteUserById = async(req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ error: `User not found` });
      return;
    }

    res.status(204).json({ message: `User successfully deleted` });

  } catch (err) {
    console.error(`User.Delete Error: ${err}`);
    next(err);
  }
}

export {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUserById,
}