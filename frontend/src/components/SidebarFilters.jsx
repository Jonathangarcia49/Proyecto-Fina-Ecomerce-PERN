import React from "react";

export default function SidebarFilters() {
  return (
    <div className="sidebar">
      <div className="filter-title">Filtrar</div>

      <p className="fw-bold">Categoría</p>
      <div>
        <div>
          <input type="radio" id="freno" name="cat" />{" "}
          <label htmlFor="freno">Freno</label>
        </div>
        <div>
          <input type="radio" id="cuerpo" name="cat" />{" "}
          <label htmlFor="cuerpo">Parte del cuerpo del camión</label>
        </div>
        <div>
          <input type="radio" id="filtro" name="cat" />{" "}
          <label htmlFor="filtro">Filtro de aire</label>
        </div>
        <button className="btn btn-link p-0 mt-1">Ver más</button>
      </div>

      <hr />

      <p className="fw-bold">Precio</p>
      <div className="d-flex">
        <input placeholder="Min" className="form-control me-1" />
        <input placeholder="Max" className="form-control me-1" />
        <button className="btn btn-danger">OK</button>
      </div>
    </div>
  );
}
