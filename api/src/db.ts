import mongoose from 'mongoose';
export const connectDB = async (url: string) => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(url);
  console.log('✅ Mongo connected');
};
