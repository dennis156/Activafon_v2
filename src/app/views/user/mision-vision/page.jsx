"use client";
import React from 'react';

export default function MisionVision() {
    return (
        <div className="container-fluid text-light p-5 rounded d-flex justify-content-center flex-column mision-container" id='mision'>
            <div className="text-center mb-4">
                <h1 className="fw-bold">Activafon</h1>
            </div>
            <div className="mb-4">
                <h2 className="fw-bold">¿Quiénes somos?</h2>
                <p>
                    Somos un grupo de liberadores y reparadores de celulares que optamos por hacer lo que mejor sabemos a un precio accesible para los clientes.
                </p>
            </div>
            <div className="mb-4">
                <h2 className="fw-bold">Misión</h2>
                <p>
                    Proveer soluciones de reparación y liberación de celulares con la más alta calidad y confianza, garantizando un servicio rápido, eficiente y accesible que satisfaga las necesidades tecnológicas de nuestros clientes.
                </p>
            </div>
            <div className="mb-4">
                <h2 className="fw-bold">Visión</h2>
                <p>
                    Ser reconocidos como el líder en reparaciones y liberación de celulares en la región, ofreciendo innovaciones tecnológicas y un servicio al cliente excepcional que inspire confianza y fidelidad a largo plazo.
                </p>
            </div>
            <div className="mb-4">
                <h2 className="fw-bold">Valores</h2>
                <ul>
                    <li><strong>Calidad:</strong> Nos comprometemos a ofrecer servicios de la más alta calidad, asegurando que cada reparación y liberación de celular cumpla con los estándares más exigentes.</li>
                    <li><strong>Confianza:</strong> Generamos confianza al brindar soluciones transparentes y efectivas, respetando la privacidad y seguridad de los datos de nuestros clientes.</li>
                    <li><strong>Rapidez:</strong> Valoramos el tiempo de nuestros clientes, por lo que ofrecemos un servicio rápido sin comprometer la calidad del trabajo.</li>
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="fw-bold">Ubicación</h2>
                <p>480 Axriverall, Ensenada, Baja California</p>
            </div>
        </div>
    );
}
