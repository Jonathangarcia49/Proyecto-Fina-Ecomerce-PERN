import React from "react";
import useCart from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card shadow-sm">
      <img
        src={product.imageUrl || "https://via.placeholder.com/300x180?text=Repuesto"}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text text-muted">
          {product.description ? product.description.slice(0, 50) + "..." : ""}
        </p>
        <p className="card-text text-danger fw-bold">
          US$ {Number(product.price).toFixed(2)}
        </p>
        <button
          className="btn btn-outline-danger w-100 mb-2"
          onClick={() => addToCart(product)}
        >
          Añadir al carrito
        </button>
        <button className="btn btn-danger w-100">Enviar Consulta</button>
      </div>
    </div>
  );
}
