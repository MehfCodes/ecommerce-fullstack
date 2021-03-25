import mongoose from 'mongoose';
const { model, Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter the name of the product.'],
  },
  price: {
    type: Number,
    required: [true, 'please enter the price of the product.'],
  },
  imageUrl: {
    type: String,
    required: [true, 'please enter the image url of the product.'],
  },
  category: {
    type: String,
    required: [true, 'please enter the category name of the product.'],
  },
  quantity: {
    type: String,
    required: [true, 'please enter the quantity of the product.'],
  },
  description: {
    type: String,
    required: [true, 'please enter the image url of the product.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const productModel = model('Products', productSchema);
export default productModel;
