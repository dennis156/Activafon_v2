"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { agregarProducto } from "../../../../../lib/api/products";
import productSchema from "../../../../../lib/validaciones/productValidation";
import styles from "../../../page.module.css"; // Asegúrate de tener el archivo de estilos

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Manejar estado del formulario y error
  const [form, setForm] = useState({
    part_name: "",
    brand: { name: "", logo: "" },
    model: { name: "", year: "" },
    part_number: "",
    price: "",
    stock: "",
    category: "",
  });
  const [error, setError] = useState("");

  // Efecto para redirigir si no hay sesión o si no es administrador
  // useEffect(() => {
  //   if (status === "loading") return; // Si está cargando, no hacer nada
  //   if (!session || session.user.role !== "Administrador") {
  //     router.push("/login"); // Redirigir a la página de login si no hay sesión o no es admin
  //   }
  // }, [session, status, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validar datos
      await productSchema.validate(form);

      // Agregar producto
      await agregarProducto(form);
      alert("Producto agregado con éxito");
    } catch (err) {
      setError(err.message || "Error al agregar producto");
    }
  };

  // Mientras se cargan los datos o se redirige, mostrar mensaje de carga
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Alta de Producto</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Nombre de la parte:
            <input
              type="text"
              name="part_name"
              className={styles.input}
              value={form.part_name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className={styles.label}>
            Nombre de la marca:
            <input
              type="text"
              name="brand.name"
              className={styles.input}
              value={form.brand.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  brand: { ...form.brand, name: e.target.value },
                })
              }
              required
            />
          </label>

          <label className={styles.label}>
            Logo de la marca (URL):
            <input
              type="url"
              name="brand.logo"
              className={styles.input}
              value={form.brand.logo}
              onChange={(e) =>
                setForm({
                  ...form,
                  brand: { ...form.brand, logo: e.target.value },
                })
              }
            />
          </label>

          <label className={styles.label}>
            Precio:
            <input
              type="number"
              name="price"
              className={styles.input}
              value={form.price}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className={styles.label}>
            Stock:
            <input
              type="number"
              name="stock"
              className={styles.input}
              value={form.stock}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className={styles.label}>
            Categoría:
            <input
              type="text"
              name="category"
              className={styles.input}
              value={form.category}
              onChange={handleInputChange}
              required
            />
          </label>

          <button type="submit" className={styles.submitBtn}>
            Agregar Producto
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </main>
    </div>
  );
}
