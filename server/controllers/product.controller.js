const Product = require("../models/Product");

/* CREATE PRODUCT */
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

/* GET ALL PRODUCTS */
exports.getAllProducts = async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
};

/* GET PRODUCT BY ID */
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

/* UPDATE PRODUCT */
exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

/* SOFT DELETE PRODUCT */
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "Product removed" });
};
