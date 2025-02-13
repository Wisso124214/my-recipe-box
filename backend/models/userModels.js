import mongoose from 'mongoose';

/***********/
/* Schemas */
/***********/

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  id_contact: String,
  id_data: String,
});

const sessionSchema = new mongoose.Schema({
  id_device: String,
  id_user: String,
  state: String,
  date: Date,
});

/* States session *//*
  - open
  - closed
*/

const contactSchema = new mongoose.Schema({
  email: String,
});


export const Contact = mongoose.model('Contact', contactSchema);
export const Session = mongoose.model('Session', sessionSchema);
export const User = mongoose.model('User', userSchema);