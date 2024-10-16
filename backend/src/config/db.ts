
import mongoose from 'mongoose';


const connectDB = async () => {

  const DB: string = process.env.MONGODB_URI as string;

  try {

    const dbConnection = await mongoose.connect(DB);
    console.log(`Connected to MongoDB: ${dbConnection.connection.host}`);

  } catch (err) {
    const error = err as Error;
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);

  } 
}


export default connectDB