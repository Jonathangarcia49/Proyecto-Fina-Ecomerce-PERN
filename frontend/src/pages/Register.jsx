import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h3>Crear cuenta</h3>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mt-2"
          placeholder="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="form-control mt-2"
          placeholder="Correo"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mt-2"
          placeholder="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn btn-danger mt-3 w-100">Registrarse</button>
      </form>
    </div>
  );
}
