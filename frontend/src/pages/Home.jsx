import { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import SidebarFilters from "../components/SidebarFilters";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error cargando productos", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Cargando repuestos...</p>;

  if (products.length === 0)
    return <p>No hay repuestos cargados en el sistema.</p>;

  return (
    <div className="catalog-container">
      <SidebarFilters />
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
