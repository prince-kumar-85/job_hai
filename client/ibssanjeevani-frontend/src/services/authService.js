import api from "../api/axios";

/* USER */
export const loginUser = async (data) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/users/register", data);
  return res.data;
};

/* ADMIN */
export const loginAdmin = async (data) => {
  const res = await api.post("/admin/login", data);
  return res.data;
};

export const registerAdmin = async (data) => {
  const res = await api.post("/admin/register", data);
  return res.data;
};
