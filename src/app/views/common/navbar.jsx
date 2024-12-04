import Link from "next/link";  // Asegúrate de importar Link
import { useState, useEffect } from "react";
import Logout from "@/components/Logout";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("userSession"); 
    setIsAuthenticated(!!session);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg fw-bold status-badge status-bar ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="container-fluid px-5">
          <a className="navbar-brand color-white" href="#">
            Activafon
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link active color-white"
                  aria-current="page"
                  href="/#"
                >
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link color-white" href="/#Marcas">
                  Marcas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link color-white" href="/#mision">
                  Mision
                </a>
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <Logout />
                ) : (
                  <Link href="/login">
                    <button className="nav-link color-white">
                      LOGIN
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
