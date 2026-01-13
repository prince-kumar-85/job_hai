import { useState } from "react";
import { createProduct } from "../../services/productService";

export default function AdminProducts() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await createProduct(form);
    alert("Product Created Successfully");
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={submitHandler} className="space-y-3">
        <input
          placeholder="Name"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Category"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
