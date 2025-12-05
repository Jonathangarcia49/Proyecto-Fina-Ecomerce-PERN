import React from "react";
import { Link } from "react-router-dom";

export default function VendorDashboard() {
  return (
    <div className="container mt-4">
      <h2>Panel Vendedor</h2>
      <p>Gestiona tus productos y pedidos.</p>
      <Link to="/vendor/products">Gestionar productos</Link>
    </div>
  );
}
