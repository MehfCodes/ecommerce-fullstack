import productModel from '../model/product.model.js';

export async function createProduct(req, res) {
  try {
    const product = await productModel.create(req.body);
    if (!product) {
      res.json({ statusCode: 406, message: 'محصول ساخته نشد' });
    }
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await productModel.find();
    if (products.length === 0) {
      res.json({ statusCode: 404, message: 'محصولی یافت نشد' });
    }
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
}
