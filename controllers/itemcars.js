const itemcarsRouter = require('express').Router();
const Itemcar = require('../models/itemcar');

// Ruta para obtener todos los items
itemcarsRouter.get('/', async (request, response) => {
  const userID = request.user
  const car = await Itemcar.find({ user: userID });
  // console.log('el usuario fue:', userID);
  // console.log('car me dio', car);
  return response.status(200).json(car);
});

// Ruta para agregar un producto al carrito del usuario
itemcarsRouter.post('/', async (req, res) => {
    try {
      const requestingUserId = req.user
      const user = requestingUserId._id
      // Obtén los datos del producto que se va a agregar al carrito desde el cuerpo de la solicitud
      const { item, itemid } = req.body;
      // Crea una nueva instancia de Itemcar con los datos del producto y el usuario
      const newItemcar = new Itemcar({
        item,
        itemid,
        status: 'pendiente', // estado pendiente por defecto
        user,
      });
  
      // Guarda el nuevo producto en el carrito del usuario
      const savedItemcar = await newItemcar.save();
  
      // Respuesta con el producto agregado al carrito
      res.status(201).json(savedItemcar);
    } catch (error) {
      // Manejo de errores si es necesario
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al agregar el producto al carrito' });
    }
  });

// Ruta para eliminar un producto al carrito del usuario
itemcarsRouter.delete('/:id', async (req, res) => {
  try {
    const requestingUserId = req.user
    const user = requestingUserId._id
    // Obtén los datos del producto que se va a eliminar del carrito desde el cuerpo de la solicitud
    const productId = req.params.id

    // Verificar si el producto existe en la base de datos
    const existingProduct = await Itemcar.findById(productId);
    if (!existingProduct) {
        return response.status(404).json({ error: 'El producto no existe en la base de datos' });
    }

    // Respuesta con el producto agregado al carrito
    await Itemcar.findByIdAndRemove(productId);

    // Envía la respuesta con éxito
    return res.sendStatus(200);
  } catch (error) {
    // Manejo de errores si es necesario
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al agregar el producto al carrito' });
  }
});

module.exports = itemcarsRouter;