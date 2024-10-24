

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import CustomError from "./CustomError";
import User, { IUser } from '../models/UserModel';


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');




const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  
  // 1. If auth header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // 2. extract token from auth header
    token = req.headers.authorization.split(' ')[1];

    let decoded: JwtPayload;
    // 3. Verify the tokey using jwt.verify and secret
    try{

      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    }catch (err) {
      
      throw new CustomError('Invalid token', 401);
    }
 
    // 4. Find user by Id embedded in the token (exclude password)
    const user = await User.findById(decoded.id).select('-password');

    // 5. If no user found in DB, return an error response
    if (!user) {
      throw new CustomError('Not authorised, user not found', 401);
    }

    req.user = user;

    // 6. If all okay - next middleware is called
    next();

  } else {
    throw new CustomError('Not authorised, no token provided', 401);
  }
});

export { auth };


