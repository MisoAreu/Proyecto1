const infouserRouter = require('express').Router();
const User = require('../models/user');

infouserRouter.get('/', async(request, response) => {
  try {
    const user = request.user.id
    const userExist = await User.findOne({ _id: user });
    if (!userExist) {
        return response.status(400).json({ error: 'error al encontrar al usuario' });
      }
    return response.status(200).json(userExist)
  } catch (error) {
    console.log(error);
    return response.status(400)
  }
  })

infouserRouter.patch('/', async(request, response) => {
    const user = request.user.id
    const data = request.body
    console.log('data me dio b', data, user);

    await User.findByIdAndUpdate(user, { name: data.name, email: data.email });
    return response.status(201).json('Informacion actualizada exitosamente');
  })

module.exports = infouserRouter;