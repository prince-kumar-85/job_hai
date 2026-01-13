import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/productService";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="w-full h-80 object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-3">₹{product.price}</p>

      <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}
