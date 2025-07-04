import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Needed here to access env vars in this file

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
