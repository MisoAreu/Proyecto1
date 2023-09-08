const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL} = require('../config')

usersRouter.post('/', async(request, response) => {
    const { name, email, password } = request.body
    if (!name || !email || !password) {
        return response.status(400).json({ error: 'Todos los espacios son requeridos.' });
      }
    const userExist = await User.findOne({ email });
    if (userExist) {
        return response.status(400).json({ error: 'El email ya se encuentra en uso.' });
      }
      // console.log(userExist);
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    passwordHash
  });
  const savedUser = await newUser.save();
  const token = jwt.sign({ id: savedUser.id}, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: '1d'
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: savedUser.email, // list of receivers
    subject: 'Verificacion de usuario', // Subject line
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, // html body
  });

  return response.status(201).json('Usuario creado. Por favor verifica tu correo');
});

module.exports = usersRouter;