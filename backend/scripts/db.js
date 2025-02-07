//updating


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from '../../config/config.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { DB_URL, PORT } = config;


mongoose.connect(DB_URL)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Connected to the database on port ${PORT}`);
  });
})
.catch((error) => {
  console.log('Error connecting to the database: ', error);
});

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



const Contact = mongoose.model('Contact', contactSchema);
const Session = mongoose.model('Session', sessionSchema);
const User = mongoose.model('User', userSchema);

/********/
//Contact
/********/

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(402).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.put('/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.delete('/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});


/********/
//Session
/********/

app.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post('/session', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(403).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.put('/session/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, req.body, { new: true });
    res.json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.delete('/session/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Session.findByIdAndDelete(id);
    res.json({ message: 'Session deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});


/*****/
//User
/*****/

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(JSON.stringify(req.body, null, 2));
    console.log(JSON.stringify(user, null, 2));
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(403).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(JSON.stringify(error, null, 2));
  }
});




