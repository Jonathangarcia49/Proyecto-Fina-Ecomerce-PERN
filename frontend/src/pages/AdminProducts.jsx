import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: ""
  });

  const loadProducts = () => {
    api.get("/products").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await api.put(`/products/${form.id}`, form);
    } else {
      await api.post("/products", form);
    }
    setForm({ id: null, name: "", description: "", price: "", stock: "", imageUrl: "" });
    loadProducts();
  };

  const editProduct = (p) => {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description || "",
      price: p.price,
      stock: p.stock,
      imageUrl: p.imageUrl || ""
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    const res = await api.post("/uploads/product", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setForm((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
  };

  return (
    <div className="container mt-4">
      <h3>Gestionar productos</h3>
      <form className="row g-2 mt-2" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <input className="form-control" type="file" onChange={handleUpload} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger w-100">
            {form.id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>US$ {Number(p.price).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                {p.imageUrl && (
                  <img src={p.imageUrl} alt="" width="60" />
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => editProduct(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
