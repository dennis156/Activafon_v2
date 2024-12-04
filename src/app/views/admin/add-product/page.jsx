"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { agregarProducto } from "../../../../../lib/api/products";
import productSchema from "../../../../../lib/validaciones/productValidation";
import styles from "../../../page.module.css"; // Asegúrate de tener el archivo de estilos

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Estado para el formulario y el error
  const [form, setForm] = useState({
    part_name: "",
    brand: { name: "", logo: "" },
    model: { name: "", year: "" },
    description: "",
    part_number: "",
    price: "",
    stock: "",
    category: "",
    part_image: "",
    warranty: "", // Campo de garantía agregado
  });
  const [error, setError] = useState("");

  // Estado para la visibilidad de la modal
  const [isModalOpen, setIsModalOpen] = useState(true); // La modal está abierta por defecto

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleBrandChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      brand: { ...prevForm.brand, [name]: value },
    }));
  };

  const handleModelChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      model: { ...prevForm.model, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Validar datos
      await productSchema.validate(form);

      // Convertir `part_image` a un array de imágenes
      const formData = {
        ...form,
        images: [form.part_image], // Convertir la URL de la imagen a un array
      };

      // Agregar producto
      await agregarProducto(formData); // Enviar el nuevo formato con 'images' como array
      alert("Producto agregado con éxito");

      // Cerrar la modal después de agregar el producto
      setIsModalOpen(false); // Cambiar el estado para cerrar la modal
    } catch (err) {
      setError(err.message || "Error al agregar producto");
    }
  };

  // Mientras se cargan los datos o se redirige, mostrar mensaje de carga
  if (status === "loading") {
    return <p className={styles.loading}>Cargando...</p>;
  }

  return (
    <div className={[styles.page, styles.modal]}>
      {isModalOpen && (
        <main className={styles.main}>
          <h1 className={styles.pageTitle}>Alta de Producto</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="brand_name" className={styles.label}>
                Nombre de la marca
              </label>
              <input
                type="text"
                id="brand_name"
                name="name"
                className={styles.input}
                value={form.brand.name}
                onChange={handleBrandChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="brand_logo" className={styles.label}>
                Logo de la marca (URL)
              </label>
              <input
                type="url"
                id="brand_logo"
                name="logo"
                className={styles.input}
                value={form.brand.logo}
                onChange={handleBrandChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="part_image" className={styles.label}>
                Imagen de la parte (URL)
              </label>
              <input
                type="text"
                id="part_image"
                name="part_image"
                className={styles.input}
                value={form.part_image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="part_name" className={styles.label}>
                Nombre de la parte
              </label>
              <input
                type="text"
                id="part_name"
                name="part_name"
                className={styles.input}
                value={form.part_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="model_name" className={styles.label}>
                Nombre del modelo
              </label>
              <input
                type="text"
                id="model_name"
                name="name"
                className={styles.input}
                value={form.model.name}
                onChange={handleModelChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="model_year" className={styles.label}>
                Año del modelo
              </label>
              <input
                type="number"
                id="model_year"
                name="year"
                className={styles.input}
                value={form.model.year}
                onChange={handleModelChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>
                Precio
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className={styles.input}
                value={form.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="stock" className={styles.label}>
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className={styles.input}
                value={form.stock}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                Categoría
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className={styles.input}
                value={form.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Descripción
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className={styles.input}
                value={form.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Nuevo campo de entrada para la garantía */}
            <div className={styles.formGroup}>
              <label htmlFor="warranty" className={styles.label}>
                Garantía (en años)
              </label>
              <input
                type="number"
                id="warranty"
                name="warranty"
                className={styles.input}
                value={form.warranty}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Agregar Producto
            </button>
          </form>

          {error && <p className={styles.error}>{error}</p>}
        </main>
      )}
    </div>
  );
}
