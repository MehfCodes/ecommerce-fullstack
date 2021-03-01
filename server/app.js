import express from 'express';
import mongoose from 'mongoose';
import { GlobalErrorHandler } from './controllers/error.controllers.mjs';
import productRouters from './routers/product.routers.mjs';
import userRouters from './routers/user.routers.mjs';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.connectDB();
    this.routes();
    this.errorsHandler();
  }

  async middlewares() {
    this.app.use(express.static('./public'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.app.use('/api/v1/products', productRouters);
    this.app.use('/api/v1/users', userRouters);
  }
  async connectDB() {
    try {
      await mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('database connected...');
    } catch (error) {
      console.log('database not connected', error);
    }
  }

  errorsHandler() {
    this.app.use((error, req, res, next) => {
      // res.json({ error, customMessage: error.message });
      new GlobalErrorHandler(error, res);
      next();
    });
  }
  listen() {
    this.app.listen(8000, () => console.log('server started on 8000 ...'));
  }
}

new App().listen();
