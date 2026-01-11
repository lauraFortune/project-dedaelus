
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import User, { IUser } from "../models/UserModel";
import { RegisterRequestBody, LoginRequestBody, UpdateProfileRequestBody } from "../types";
import CustomError from "../utils/CustomError";


/**
 * Create a New User - Register
 * router.post('/users', registerUser);
 */
const registerUser = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const { username, email, password } = req.body as RegisterRequestBody;

    // All fields are required
    if (!username || !email || !password) throw new CustomError('All fields are required', 400);
    
    // Check username and email are unique ( do not already exist in the DB )
    const userExists = await User.findOne({
      $or: [
        {username: {$regex: new RegExp(username, 'i')}}, // regex - ignore case sensitivity
        {email: email}
      ],
    });
    // Handle User Exists
    if (userExists) {
      throw new CustomError('Username or Email already exists', 409);
    } 
  
    // bcrypt hash password
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    // Create a new user
    const newUser: IUser = new User({ username, email, password: hashedPassword });
    // Save new user to mongoDB
    const savedUser = await newUser.save();

    // Exclude password from response object
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse); // Sanitised user

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
    if (!userFound) throw new CustomError('Invalid email or password', 401);  

    const passwordMatch = await bcrypt.compare(password, userFound.password as string);
    if (!passwordMatch) throw new CustomError('Invalid email or password', 401);
      
     
    const userId = userFound._id.toString();
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
    
    if (!user) throw new CustomError('User not found', 404);
    
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
    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, { 
      new: true,
      runValidators: true, // Ensures updated fields are validated
    }).select('-password');

    if (!user) throw new CustomError('User not found', 404);

    res.status(200).json(user);

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

    if (!user) throw new CustomError('User not found', 404);
    
    // res.status(204).send(); // For production: Don't send back anything with a 204
    res.status(200).json({ message: 'User successfully deleted' }); // User successfully deleted, 204 response should not contain a body

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