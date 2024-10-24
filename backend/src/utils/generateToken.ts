import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';


const generateToken = (id: String) => {
  return jwt.sign({ id:String }, JWT_SECRET as string), {
    expiresIn: JWT_EXPIRE,
  }
};


export default generateToken;