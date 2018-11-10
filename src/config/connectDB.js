import mongoose from 'mongoose';
// project files
const DB_URL = `mongodb://fadiqua:fadi008390791@ds157843.mlab.com:57843/locations`;
export default async () => {
  await mongoose.connect(DB_URL, { useNewUrlParser: true });
  return mongoose.connection;
};
