//La tabla users debe estar previamente creada

export const config = {
  DB_URL: 'mongodb+srv://luisdavidbustosnunez:C7NfsuYGf42K8Sbv@cluster0.o7x9c.mongodb.net/',
  PORT: process.env.PORT || 3000,
  SERVER_IP: '192.168.0.108',
  PROTOCOL: 'http',

  SMTP: {
    USER: 'api',
    PASS: 'd19846efdc36d5dd436faee4ccbc8a3e',
    HOST: 'live.smtp.mailtrap.io',
    PORT: 587,

    SENDER_EMAIL: 'luisdavidbustosnunez@gmail.com',
    REPLY_TO: 'luisdavidbustosnunez@gmail.com',
  }
}

export const SERVER_URL = `${config.PROTOCOL}://${config.SERVER_IP}:${config.PORT}`;
//module.exports = config;

export const configFront = {
  logoSize: 300,
  activeOpacity: 0.7,
}