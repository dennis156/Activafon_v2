"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Importamos Link de Next.js

function PartSearch() {
  const [searchTerm, setSearchTerm] = useState(""); // El término de búsqueda
  const [parts, setParts] = useState([]); // Los datos filtrados
  const [allParts, setAllParts] = useState([]); // Todos los datos originales
  const [loading, setLoading] = useState(true); // Indicador de carga

  // Carga inicial de los datos desde el endpoint
  useEffect(() => {
    setLoading(true);
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data); // Verifica qué datos estás recibiendo
        setAllParts(data); // Guardamos todos los datos
        setParts(data); // Inicializamos parts con todos los datos
        setLoading(false);
      })
      .catch((err) => console.error("Error al cargar los datos:", err));
  }, []);

  // Filtra los datos cada vez que cambia el término de búsqueda
  useEffect(() => {
    const filteredParts = allParts.filter((part) => {
      const partName = part.part_name ? part.part_name.toLowerCase() : '';
      return partName.includes(searchTerm.toLowerCase());
    });
    setParts(filteredParts); // Actualizamos 'parts' con los datos filtrados
  }, [searchTerm, allParts]);

  return (
    <div>
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Buscar pieza..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          className="form-control"
        />
      </div>
      {loading && <p>Cargando datos...</p>}
      {!loading && parts.length === 0 && <p>No se encontraron resultados.</p>}
      <ul className="list-group">
        {parts.map((part) => (
          <li key={part._id} className="list-group-item">
            <Link href={`/part-search/${part._id}`}> {/* Usamos Link para hacer clickeable */}
              <strong>{part.part_name || "Sin nombre"}</strong> - 
              {part.category || "Sin categoría"} - 
              {part.model ? JSON.stringify(part.model) : "Sin modelo"} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PartSearch;
