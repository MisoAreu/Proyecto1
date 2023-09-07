const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async(request, response) => {
    const { name, email, password } = request.body
    console.log(name, email, password);
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
    passwordHash,
  });

  const savedUser = await newUser.save();

  console.log(savedUser);
});

module.exports = usersRouter;