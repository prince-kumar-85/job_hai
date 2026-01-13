const Product = require("../models/Product");

/* CREATE */
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

/* GET ALL */
exports.getAllProducts = async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
};

/* GET ONE */
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

/* UPDATE */
exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

/* SOFT DELETE */
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "Product removed" });
};
