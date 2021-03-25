import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import GlobalErrorHandler from './controllers/error.controllers.js';
import productRouters from './routers/product.routers.js';
import userRouters from './routers/user.routers.js';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
class App {
  constructor() {
    config({ path: './config.env' });
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
    // this.app.use(cors());
    this.app.use(cookieParser());
  }
  routes() {
    this.app.use('/api/v1/products', productRouters);
    this.app.use('/api/v1/users', userRouters);
  }
  async connectDB() {
    try {
      const DB_URL =
        process.env.NODE_ENV === 'test'
          ? process.env.DB_TEST_URL
          : process.env.DB_DEV_URL;
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
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
    const PORT =
      process.env.NODE_ENV === 'test'
        ? process.env.PORT_TEST
        : process.env.PORT;
    let ann = this.app.listen(PORT, () =>
      console.log(
        `server started on ${PORT} in ${process.env.NODE_ENV} mood ...`
      )
    );
    return ann;
  }
}

const app = new App();
const server = app.listen();
export default server;
