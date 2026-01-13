const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", protect("admin"), createProduct);
router.put("/:id", protect("admin"), updateProduct);
router.delete("/:id", protect("admin"), deleteProduct);

module.exports = router;
