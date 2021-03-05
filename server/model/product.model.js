import mongoose from "mongoose";
const { model, Schema } = mongoose;
const productSchema = new Schema({
  title: String,
  price: Number,
  quantity: Number,
});

const productModel = model("Products", productSchema);
export default productModel;
