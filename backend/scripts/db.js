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

const deviceSchema = new mongoose.Schema({
  code: String,
  id_main_session: String,
});

const Contact = mongoose.model('Contact', contactSchema);
const Device = mongoose.model('Device', deviceSchema);
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
    console.log(error);
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(402).json({ message: error.message });
    console.log(error);
  }
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});


/*******/
//Device
/*******/

app.get('/devices', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

app.post('/devices', async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    res.json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

app.put('/devices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findByIdAndUpdate(id, req.body, { new: true });
    res.json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

app.delete('/devices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Device.findByIdAndDelete(id);
    res.json({ message: 'Device deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
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
    console.log(error);
  }
});

app.post('/sessions', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(403).json({ message: error.message });
    console.log(error);
  }
});

app.put('/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, req.body, { new: true });
    res.json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

app.delete('/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Session.findByIdAndDelete(id);
    res.json({ message: 'Session deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
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
    console.log(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(403).json({ message: error.message });
    console.log(error);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});