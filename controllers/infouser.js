const infouserRouter = require('express').Router();
const User = require('../models/user');

infouserRouter.get('/', async(request, response) => {
    const user = request.user.id
    const userExist = await User.findOne({ _id: user });
    if (!userExist) {
        return response.status(400).json({ error: 'error al encontrar al usuario' });
      }
    return response.status(200).json(userExist)
  })

module.exports = infouserRouter;