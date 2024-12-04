import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "../../assets/css/login.css"; // Importa el archivo CSS como módulo
import { v4 as uuidv4 } from "uuid";
import ErrorModalLogin from "../templates/ModalLogin";

function Login() {
  const signUpRef = useRef(null);
  const signInRef = useRef(null);
  const containerRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const SearchParamsComponent = () => {
    const searchParams = useSearchParams();
    return <div>{searchParams.get("query")}</div>;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && signUpRef.current && signInRef.current && containerRef.current) {
      const signUpNode = signUpRef.current;
      const signInNode = signInRef.current;

      const handleSignUp = () => {
        containerRef.current.classList.add(styles.rightPanelActive);
      };

      const handleSignIn = () => {
        containerRef.current.classList.remove(styles.rightPanelActive);
      };

      signUpNode.addEventListener("click", handleSignUp);
      signInNode.addEventListener("click", handleSignIn);

      return () => {
        signUpNode.removeEventListener("click", handleSignUp);
        signInNode.removeEventListener("click", handleSignIn);
      };
    }
  }, [isClient]);

  const handleLogin = async () => {
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          password: password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Usuario autenticado:", data.user);

        if (typeof window !== "undefined") {
          const sessionId = uuidv4();

          const sessionData = {
            sessionId,
            user: data.user,
          };

          localStorage.setItem("userSession", JSON.stringify(sessionData));
          router.push("/views/user/layout");
        }
      } else {
        const errorData = await res.json();
        setError(errorData.error);
        setShowErrorModal(true); 
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError("Ocurrió un error inesperado, por favor intenta nuevamente.");
      setShowErrorModal(true); 
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      {showErrorModal && <ErrorModalLogin onClose={closeModal} error={error} />}
      <div className={styles.container} ref={containerRef}>
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form onSubmit={handleLogin}>
            <h1>Iniciar sesión</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <button type="submit">Iniciar sesión</button>
            <span>¿No tienes cuenta? <a href="#" ref={signUpRef}>Regístrate</a></span>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form>
            <h1>Registrarse</h1>
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
            <span>¿Ya tienes cuenta? <a href="#" ref={signInRef}>Inicia sesión</a></span>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={`${styles.overlay} ${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1>Bienvenido de nuevo</h1>
            <p>Inicia sesión para continuar</p>
          </div>
          <div className={`${styles.overlay} ${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>¡Únete a nosotros!</h1>
            <p>Crea una cuenta para empezar</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
