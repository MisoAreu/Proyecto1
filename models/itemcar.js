const mongoose = require('mongoose');

const itemcarSchema = new mongoose.Schema({
    item: String,
    itemid: String,
    status: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdat: {
        type: Date,
        default: Date.now
      }
}); 

itemcarSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Itemcar = mongoose.model('Itemcar', itemcarSchema);

module.exports = Itemcar;