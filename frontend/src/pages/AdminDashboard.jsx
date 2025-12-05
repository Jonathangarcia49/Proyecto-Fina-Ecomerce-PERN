import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalProducts: 0
  });

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Panel Administrador</h2>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Total productos</h5>
              <h3>{stats.totalProducts}</h3>
              <Link to="/admin/products">Gestionar productos</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Pedidos totales</h5>
              <h3>{stats.totalOrders}</h3>
              <Link to="/admin/orders">Ver pedidos</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Ventas totales</h5>
              <h3>US$ {Number(stats.totalSales).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
