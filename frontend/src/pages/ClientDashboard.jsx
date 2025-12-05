import React from "react";
import { Link } from "react-router-dom";

export default function ClientDashboard() {
  return (
    <div className="container mt-4">
      <h2>Mi Cuenta</h2>
      <ul>
        <li>
          <Link to="/client/orders">Mis pedidos</Link>
        </li>
      </ul>
    </div>
  );
}
