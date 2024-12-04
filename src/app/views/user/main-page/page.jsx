"use client";
import { useState, useEffect } from "react";
import Add_element from "../../admin/add-product/page"; // Importa el componente del formulario
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/css/main-page.css";
import Navbar from "../../common/navbar";
import PartSearch from "@/app/views/user/search-input/page";

export default function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el buscador
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica si el usuario está autenticado y maneja el estado del scroll
  useEffect(() => {
    const session = localStorage.getItem("userSession");
    setIsAuthenticated(!!session);
  }, []);

  // Funciones para abrir y cerrar la modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <div className="main-image">
        <div className="container col-md-12 d-flex flex-column gap-5 pt-5 z-3">
          <div className="Title-Container col-md-12 color-white">
            <h1 className="fw-bold status-badge Title-Piezas">Activafon</h1>
          </div>
          {/* <div className="d-flex flex-wrap">
            <div className="col-md-12 col-sm-12 col-12">
              <p className="color-white">
                Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut.
                Carrot cake caramels pie sweet apple pie tiramisu carrot cake.
                ...
              </p>
            </div>
          </div> */}

          {/* Buscador para piezas */}
          <PartSearch />

          {/* Botón para abrir la modal, solo si el usuario está autenticado */}
          {isAuthenticated && (
            <div className="d-flex justify-content-center mt-5">
              <button className="btn-add" onClick={openModal}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}

          {/* Modal */}
          {showModal && isAuthenticated && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Alta de Producto</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* Renderiza el formulario solo si el usuario está autenticado */}
                    <Add_element />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
