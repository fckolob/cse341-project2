const mongodb = require('../routes/datax/database');
const ObjectId = require('mongodb').ObjectId;


const getAllProducts = async (req, res) => {
  const db = mongodb.getDb();
  try {
    const products = await db.collection('products').find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getSingleProduct = async (req, res) => {
  const _productId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb();
    const product = await db.collection('products').findOne({ _id: _productId });
    res.setHeader('Content-Type', 'application/json');
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Product' });
  }
};

const createProduct = async (req, res) => {
  const product = {
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    color: req.body.color,
    inStock: req.body.inStock,
    size: req.body.size

  };
  const response = await mongodb.getDb().collection('products').insertOne(product);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while creating the product');
  }
};

const updateProduct = async (req, res) => {
  const _productId = new ObjectId(req.params.id);
  const product = {
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    color: req.body.color,
    inStock: req.body.inStock,
    size: req.body.size
  };
  const response = await mongodb
    .getDb()
    .collection('product')
    .replaceOne({ _id: _productId }, product);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the product');
  }
};

const deleteProduct = async (req, res) => {
  const _productId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('products').deleteOne({ _id: _productId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while deleting the product');
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
