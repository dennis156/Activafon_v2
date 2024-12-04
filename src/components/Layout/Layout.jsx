"use client";
import Navbar from "../../app/views/common/navbar";
import Footer from "../../app/views/common/footer";
import MainPage from "@/app/views/user/main-page/page";
import ListadoMarcas from "@/app/views/user/listado-marcas/page"
import Details from "@/app/views/user/listado-marcas/page";
import MisionVision from "@/app/views/user/mision-vision/page";
import { usePathname } from "next/navigation"; // Para obtener la ruta actual

export default function Layout({ children }) {
  const pathname = usePathname(); // Usamos usePathname para obtener la ruta

  // Renderizar el layout con los componentes comunes
  return (
    <div>
      <Navbar />
      {/* Solo mostrar contenido adicional si no estamos en la página de detalles */}
      {pathname !== "/views/user/details" && !pathname.startsWith("/views/user/details") && (
        <>
          <MainPage />
          <Details/>
          {/* <ListadoMarcas/> */}
          <MisionVision/>

        </>
      )}
      {children} {/* Aquí se renderizan las vistas específicas según la ruta */}
      <Footer />
    </div>
  );
}
