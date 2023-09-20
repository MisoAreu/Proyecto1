const adminRouter = require('express').Router();
const User = require('../models/user');

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

adminRouter.post('/', async (request, response) => {
    const user = request.user.id
    console.log('user que da', user);
    const userExist = await User.findOne({ _id: user });
    if (!userExist) {
        return response.status(400).json({ error: 'error al encontrar al usuario' });
      }
})

module.exports = adminRouter;