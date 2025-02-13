import mongoose from 'mongoose';
import { config } from '../config/config.js';

const { DB_URL, PORT } = config;

export const dbConnection = (app) => {
  mongoose.connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to the database on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to the database: ', error);
  });
}