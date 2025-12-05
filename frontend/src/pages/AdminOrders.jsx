import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Todos los pedidos</h3>
      {orders.map((o) => (
        <div key={o.id} className="card mb-3">
          <div className="card-body">
            <h6>
              Pedido #{o.id} – {o.status}
            </h6>
            <p>
              Cliente ID: {o.userId} | Total: US$ {Number(o.totalAmount).toFixed(2)}
            </p>
            <ul>
              {o.items?.map((it) => (
                <li key={it.id}>
                  {it.Product?.name} x {it.quantity} – US${" "}
                  {Number(it.price).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
