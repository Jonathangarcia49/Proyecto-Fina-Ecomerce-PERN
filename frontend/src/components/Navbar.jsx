import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link className="navbar-brand fw-bold text-danger" to="/">
        JG-Autopartes
      </Link>

      <form
        className="d-flex mx-auto w-50"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input className="form-control" placeholder="Buscar repuestos..." />
        <button className="btn btn-danger ms-1">Buscar</button>
      </form>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-outline-secondary position-relative"
          onClick={() => navigate("/cart")}
        >
          Carrito
          {cartCount > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {cartCount}
            </span>
          )}
        </button>

        {!user ? (
          <>
            <Link className="btn btn-outline-danger" to="/login">
              Login
            </Link>
            <Link className="btn btn-danger" to="/register">
              Registrarse
            </Link>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <Link className="btn btn-warning" to="/admin">
                Panel Admin
              </Link>
            )}
            {user.role === "vendedor" && (
              <Link className="btn btn-success" to="/vendor">
                Panel Vendedor
              </Link>
            )}
            {user.role === "cliente" && (
              <Link className="btn btn-primary" to="/client">
                Mi Cuenta
              </Link>
            )}
            <button className="btn btn-dark" onClick={logout}>
              Salir
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
