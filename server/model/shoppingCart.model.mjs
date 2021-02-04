import mongoose from "mongoose";
const { model, Schema, Types } = mongoose;
const shoppingCartSchema = new Schema({
  products: [
    {
      type: Types.ObjectId,
      quantity: Number,
    },
  ],
  userId: Types.ObjectId,
  totalPrice: Number,
});

const shoppingCartModel = model("Products", shoppingCartSchema);
export default shoppingCartModel;
