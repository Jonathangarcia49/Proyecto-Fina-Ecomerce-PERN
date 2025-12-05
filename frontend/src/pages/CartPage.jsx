import React from "react";
import useCart from "../hooks/useCart";
import { api } from "../api/api";

export default function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    const body = {
      items: items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity
      }))
    };
    await api.post("/orders", body);
    alert("Pedido creado con éxito");
    clearCart();
  };

  return (
    <div className="container mt-4">
      <h3>Carrito de compras</h3>
      {items.length === 0 && <p>Tu carrito está vacío.</p>}
      {items.map((i) => (
        <div
          key={i.product.id}
          className="d-flex justify-content-between border-bottom py-2"
        >
          <div>
            <strong>{i.product.name}</strong>
            <div>Cant: {i.quantity}</div>
          </div>
          <div>
            US$ {(Number(i.product.price) * i.quantity).toFixed(2)}
            <button
              className="btn btn-link text-danger d-block"
              onClick={() => removeFromCart(i.product.id)}
            >
              Quitar
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h4 className="mt-3">Total: US$ {total.toFixed(2)}</h4>
          <button className="btn btn-danger mt-2" onClick={handleCheckout}>
            Confirmar pedido
          </button>
        </>
      )}
    </div>
  );
}
