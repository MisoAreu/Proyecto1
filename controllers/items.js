const itemsRouter = require('express').Router();
const Item = require('../models/item');

itemsRouter.post('/', async (request, response) => {
    const { name, description, value, exist, image } = request.body;
    const newItem = new Item({
        name,
        description,
        value,
        exist,
        image
      });
      const savedItem = await newItem.save();
      console.log(savedItem);
      return response.status(201).json('Producto agregado exitosamente');
  });
    
module.exports = itemsRouter;