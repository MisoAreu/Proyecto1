const adminRouter = require('express').Router();
const User = require('../models/user');
const Itemcar = require('../models/itemcar')

adminRouter.get('/', async(request, response) => {
    const user = request.user.id
    const userExist = await User.findOne({ _id: user });
    if (!userExist) {
        return response.status(400).json({ error: 'error al encontrar al usuario' });
      }
      // console.log('en si que dice admin', userExist.admin);
    if (!userExist.admin) {
        // console.log('que es el if', !userExist.admin);
        return response.status(400).json({ error: 'este usuario no es admin' });
      }
  })

adminRouter.put('/users', async (request, response) => {
    const userId = request.user.id; // ID del usuario que hace la solicitud
    const userExist = await User.findOne({ _id: userId });
  
    if (!userExist) {
      return response.status(400).json({ error: 'Error al encontrar al usuario' });
    }
  
    if (!userExist.admin) {
      return response.status(400).json({ error: 'Este usuario no es admin' });
    }
  
    try {
      // Obtener todos los usuarios
      const allUsers = await User.find();
  
      // Filtrar al usuario que hace la solicitud
      const users = allUsers.filter(user => user._id != userId);
  
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener usuarios' });
    }
  });

adminRouter.put('/itemcars', async (request, response) => {
    const userId = request.user.id; // ID del usuario que hace la solicitud
    const userExist = await User.findOne({ _id: userId });
    const data = request.body
    console.log(data);

    if (!userExist) {
      return response.status(400).json({ error: 'Error al encontrar al usuario' });
    }
  
    if (!userExist.admin) {
      return response.status(400).json({ error: 'Este usuario no es admin' });
    }

    try {
      // Obtener todos los usuarios
      const allItemCars = await Itemcar.find({ user: data.userId });
      console.log('que da requestUser', allItemCars);
      return response.status(200).json(allItemCars);
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener itemCars' });
    }
  });

adminRouter.post('/', async (request, response) => {
    const user = request.user.id
    console.log('user que da', user);
    const userExist = await User.findOne({ _id: user });
    if (!userExist) {
        return response.status(400).json({ error: 'error al encontrar al usuario' });
      }
})

module.exports = adminRouter;