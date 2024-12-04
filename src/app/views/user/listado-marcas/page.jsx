"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';

function ListadoMarcas() {
  const [Marcas, setMarcas] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleVerInventario = (brandName) => {
    setSelectedBrand(brandName);
  };

  const handleRegresarMarcas = () => {
    setSelectedBrand(null);
  };

  // Verificar sesión activa
  useEffect(() => {
    const session = localStorage.getItem("userSession");
    setIsAuthenticated(!!session);
  }, []);

  // Función para eliminar el producto
  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/delete-product/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Error al eliminar el producto');
      }
      // Actualizar el estado de listings para reflejar la eliminación
      setListings(listings.filter(item => item._id !== id)); // Filtrar el producto eliminado
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el producto');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/listings");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setListings(data);

        const uniqueBrands = new Set();
        const filteredBrands = data.reduce((acc, item) => {
          if (!uniqueBrands.has(item.brand.name)) {
            uniqueBrands.add(item.brand.name);
            acc.push(item);
          }
          return acc;
        }, []);
        setMarcas(filteredBrands);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-color-gray" id="Marcas">
      <div className="Container-Second-Image">
        {!selectedBrand ? (
          <div className="d-flex justify-content-center">
            <h1 className="fw-bold status-badge Title-Piezas">Marcas</h1>
          </div>
        ) : null}
        <div className="card-grid">
          {!selectedBrand ? (
            Marcas.map((Marca) => (
              <div className="card" key={Marca._id}>
                <Image
                  src={Marca.brand.logo || "https://via.placeholder.com/400x300"}
                  alt={Marca.brand.name}
                  className="card-image"
                  width={300}
                  height={300}
                />
                <div className="card-content">
                  <h2 className="card-title">{Marca.brand.name}</h2>
                  <div className="card-div-button">
                    <button
                      className="card-button"
                      onClick={() => handleVerInventario(Marca.brand.name)}
                    >
                      Ver Inventario
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="piezas-container">
              <h2 className="Title-Piezas">
                Piezas disponibles para {selectedBrand}
              </h2>
              <div className="piezas-grid">
                {listings
                  .filter((listing) => listing.brand.name === selectedBrand)
                  .map((listing) => (
                    <div className="card" key={listing._id}>
                      <Image
                        src={listing.images[0] || "https://via.placeholder.com/400x300"}
                        alt={listing.name}
                        className="card-image"
                        objectFit="cover"
                        width={300}
                        height={300}
                      />
                      <div className="card-content">
                        <h2 className="card-title">{listing.part_name}</h2>
                        <p className="card-summary">
                          <b>Marca: {listing.brand.name}</b>
                        </p>
                        <p className="card-summary">
                          <b>Modelo: {listing.model.name}</b>
                        </p>
                        <p className="card-summary">
                          <b>Categoria: {listing.category}</b>
                        </p>
                        <p className="card-summary">{listing.description}</p>
                        <p className="card-summary">
                          <b>Precio: {listing.price} USD</b>
                        </p>
                        <p className="card-summary">
                          <b>Garantía: {listing.warranty}</b>
                        </p>
                        <p className="card-summary">
                          <b>Stock: {listing.stock} piezas</b>
                        </p>
                        <div className="card-div-button">
                          <Link href={`/part-search/${listing._id}`}>
                            <button className="card-button">Ver más</button>
                          </Link>
                          {isAuthenticated && (
                            <button
                              className="card-button"
                              onClick={() => handleDeleteProduct(listing._id)}
                            >
                              Eliminar Producto
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="card-div-button">
                <button
                  className="card-button z-1"
                  onClick={handleRegresarMarcas}
                >
                  Regresar a Marcas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListadoMarcas;
