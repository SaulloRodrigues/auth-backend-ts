import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://api:Saullo2004!@cluster0.0ppk6kb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
