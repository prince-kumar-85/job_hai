import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="h-40 w-full object-cover mb-2"
      />

      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <Link
        to={`/products/${product._id}`}
        className="text-blue-600 text-sm"
      >
        View Details
      </Link>
    </div>
  );
}
