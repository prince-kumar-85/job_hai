import api from "../api/axios";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};
