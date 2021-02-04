import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routers/product.routers.mjs";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.connectDB();
    this.routes();
  }

  async middlewares() {
    this.app.use(express.static("./public"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.app.use("/api/v1/products", productRoutes);
  }
  async connectDB() {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017/Shopping_cart_practice",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("database connected...");
    } catch (error) {
      console.log("database not connected", error);
    }
  }
  listen() {
    this.app.listen(8000, () => console.log("server started on 8000 ..."));
  }
}

new App().listen();
