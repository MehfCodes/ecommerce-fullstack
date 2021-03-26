import Products from '../model/product.model.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Products.create(req.body);
  if (!product) {
    return next(new AppError('creation of the product failed', 406));
  }
  res.status(200).json({
    data: product,
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Products.find();
  if (products.length === 0) {
    return next(new AppError('there is no products', 404));
  }
  res.status(200).json({
    data: products,
  });
});

export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return next(new AppError('product not found', 404));
  }
  res.status(200).json({
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!product) {
    return next(new AppError('update the product failed', 406));
  }
  res.status(200).json({ data: product });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError('delete the product failed', 406));
  }

  res.status(200).json({ data: 'product deleted' });
});
