import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.APP_URI_DB as string;
    await mongoose.connect(uri);
    console.log('Database conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao fazer a conexão com o Database:', error);
    process.exit(1);
  }
};

export default connectDB;
