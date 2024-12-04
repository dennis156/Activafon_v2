"use client";
import React from 'react';
import '../../assets/css/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container container">
                <div className="footer-section">
                    <h2 className="footer-title">Activafon</h2>
                    <p>Proveemos soluciones de reparación y liberación de celulares con alta calidad, confianza y rapidez.</p>
                </div>
                <div className="footer-section">
                    <h2 className="footer-title">Contacto</h2>
                    <p>Ubicación: 480 Axriverall, Ensenada, Baja California</p>
                    <p>Email: contacto@activafon.com</p>
                    <p>Teléfono: +52 646 123 4567</p>
                </div>
                <div className="footer-section">
                    <h2 className="footer-title">Síguenos</h2>
                    <div className="footer-icons">
                        <a href="#" className="footer-icon">FB</a>
                        <a href="#" className="footer-icon">IG</a>
                        <a href="#" className="footer-icon">TW</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Activafon. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
