const itemsRouter = require('express').Router();
const Item = require('../models/item');

// Ruta para obtener todos los items
itemsRouter.get('/', async (request, response) => {
  try {
    // Utiliza el modelo de Item para buscar todos los elementos en la base de datos
    const productos = await Item.find();
    
    // Envía la respuesta como un arreglo JSON con todos los productos encontrados
    response.json(productos);
  } catch (error) {
    // Manejo de errores si es necesario
    console.error(error);
    response.status(500).json({ error: 'Hubo un error al obtener los productos' });
  }
});

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
      return response.status(201).json('Producto agregado exitosamente');
  });

itemsRouter.patch('/', async (request, response) => {
  const { producto, atributo, nuevoValor } = request.body
  if (atributo === 'nombre') {
    await Item.findByIdAndUpdate(producto, { name: nuevoValor });
    }
  
  if (atributo === 'descripcion') {
    await Item.findByIdAndUpdate(producto, { description: nuevoValor });
    }
  
  if (atributo === 'valor') {
    await Item.findByIdAndUpdate(producto, { value: nuevoValor });
    }
  
  if (atributo === 'existencia') {
    await Item.findByIdAndUpdate(producto, { exist: nuevoValor });
    }

  if (atributo === 'imagen') {
    await Item.findByIdAndUpdate(producto, { image: nuevoValor });
    }
  
  return response.status(201).json('Producto actualizado exitosamente');
  });

itemsRouter.delete('/:id', async (request, response) => {
  const productId = request.params.id;

  if (productId) {
    await Item.findByIdAndDelete(productId);
  } else {
    return response.status(400).json
  }

  return response.status(201).json('Producto eliminado exitosamente');
  });
module.exports = itemsRouter;