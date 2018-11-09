import mongoose from 'mongoose';
// project files
export default async () => {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  return mongoose.connection;
};
