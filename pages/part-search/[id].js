// pages/part-search/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "../../src/app/assets/css/details.css";
import Image from 'next/image';

export default function PartDetails() {
  const { query } = useRouter(); // Obtener los parámetros de la URL (el id)
  const { id } = query; // El id es el parámetro dinámico en la URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // No hacer nada si el id no está disponible

    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${id}`); // Suponiendo que el backend está configurado para manejar esta solicitud
        if (!response.ok) {
          throw new Error('Error al obtener la información de la pieza');
        }
        const data = await response.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]); // Ejecutar cada vez que el id cambie

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!listing) return <p>No se encontró la información de la pieza.</p>;

  return (
    <div className="details-container">
      <div className="details-header">
        <Image src={listing.brand.logo} alt={listing.brand.name} className="brand-logo" width={400} height={400}/>
        <h1 className="part-name">{listing.part_name}</h1>
      </div>
      <div className="image-carousel">
        {listing.images.map((img, index) => (
          <Image src={img} key={index} alt={`Imagen ${index + 1}`} className="carousel-image" width={400} height={400}/>
        ))}
      </div>
      <div className="details-info">
        <div className="info-grid">
          <div><strong>Marca:</strong> {listing.brand.name}</div>
          <div><strong>Modelo:</strong> {listing.model.name} ({listing.model.year.year})</div>
          <div><strong>Número de parte:</strong> {listing.part_number}</div>
          <div><strong>Compatibilidad:</strong> {listing.compatibility.join(", ")}</div>
          <div><strong>Descripción:</strong> {listing.description}</div>
          <div><strong>Precio:</strong> {listing.price} USD</div>
          <div><strong>Garantía:</strong> {listing.warranty}</div>
          <div><strong>Stock disponible:</strong> {listing.stock}</div>
          <div><strong>Proveedor:</strong> {listing.supplier.name}</div>
          <div><strong>Contacto del proveedor:</strong> {listing.supplier.contact_info.phone}, {listing.supplier.contact_info.email}</div>
        </div>
        {/* <button className="buy-button">Comprar</button> */}
      </div>
    </div>
  );
}
