import { useRouter } from 'next/navigation';
import cookie from 'cookie';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Eliminar la cookie de sesión
    document.cookie = cookie.serialize('authToken', '', {
      maxAge: -1, // Esto elimina la cookie
      path: '/',  // Asegúrate de que sea para todo el dominio
    });

    // Limpiar el localStorage
    localStorage.removeItem('userSession');

    // Redirigir al usuario a la página de inicio o login
    router.push('/login'); // O la ruta a la que desees redirigir
  };

  return (
    <div>
      <button className='nav-link color-white' onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
