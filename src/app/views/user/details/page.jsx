"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Reemplaza a next/router
import "../../../assets/css/details.css";
import Image from "next/image";

export default function Details() {
  const { id } = useParams(); // Obtiene el parámetro dinámico `id` de la URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para hacer scroll a la parte superior y buscar la información del artículo
  useEffect(() => {
    if (!id) return; // Verifica que el parámetro `id` exista

    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener la información de la pieza");
        }
        const data = await response.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0); // Hace scroll hacia arriba cuando cambia la página
    fetchListing();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!listing) return <p>No se encontró la información de la pieza.</p>;

  return (
    <div className="details-container">
      <div className="details-header">
        <Image
          src={listing.brand.logo}
          alt={listing.brand.name}
          className="brand-logo"
          width={100}
          height={50} // Asegúrate de especificar dimensiones
        />
        <h1 className="part-name">{listing.part_name}</h1>
      </div>
      <div className="image-carousel">
        {listing.images.map((img, index) => (
          <Image
            src={img}
            key={index}
            alt={`Imagen ${index + 1}`}
            className="carousel-image"
            width={300}
            height={200}
          />
        ))}
      </div>
      <div className="details-info">
        <div className="info-grid">
          <div>
            <strong>Marca:</strong> {listing.brand.name}
          </div>
          <div>
            <strong>Modelo:</strong> {listing.model.name} (
            {listing.model.year.year})
          </div>
          <div>
            <strong>Número de parte:</strong> {listing.part_number}
          </div>
          <div>
            <strong>Compatibilidad:</strong> {listing.compatibility.join(", ")}
          </div>
          <div>
            <strong>Descripción:</strong> {listing.description}
          </div>
          <div>
            <strong>Precio:</strong> {listing.price} USD
          </div>
          <div>
            <strong>Garantía:</strong> {listing.warranty}
          </div>
          <div>
            <strong>Stock disponible:</strong> {listing.stock}
          </div>
          <div>
            <strong>Proveedor:</strong> {listing.supplier.name}
          </div>
          <div>
            <strong>Contacto del proveedor:</strong>{" "}
            {listing.supplier.contact_info.phone},{" "}
            {listing.supplier.contact_info.email}
          </div>
        </div>
        {/* <button className="buy-button">Comprar</button> */}
      </div>
    </div>
  );
}
