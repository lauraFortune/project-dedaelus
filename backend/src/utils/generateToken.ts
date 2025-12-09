import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

if (!JWT_SECRET) { throw new Error('JWT_SECRET is undefined')};
if (!JWT_EXPIRE) { throw new Error('JWT_EXPIRE is undefined')};


const generateToken = (id: string): string => {  
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};


export default generateToken;