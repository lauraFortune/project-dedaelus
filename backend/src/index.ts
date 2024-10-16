

import app from './app';
import connectDB from './config/db';


const PORT = process.env.PORT || 3001;


const startServer = async () => {
  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received - gracefully shutting down...');
      process.exit(1);
    })

  } catch (err) {
    console.error(`Failed to start server: ${err}`);
    process.exit(1);
  }

  

}

startServer();






