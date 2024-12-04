import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import "../src/app/assets/css/login.css"; // Asegúrate de importar el archivo CSS
import { v4 as uuidv4 } from "uuid"; // Importar la función para generar UUID
import ErrorModalLogin from "../src/app/views/templates/ModalLogin";
import Link from "next/link";

function Login() {
  const signUpRef = useRef(null);
  const signInRef = useRef(null);
  const containerRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Envolver useSearchParams dentro de Suspense
  const SearchParamsComponent = () => {
    const searchParams = useSearchParams(); // Usar el hook dentro de un componente que está envuelto en Suspense
    return <div>{searchParams.get("query")}</div>; // Un ejemplo de cómo puedes usarlo
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      isClient &&
      signUpRef.current &&
      signInRef.current &&
      containerRef.current
    ) {
      const signUpNode = signUpRef.current;
      const signInNode = signInRef.current;

      const handleSignUp = () => {
        containerRef.current.classList.add("right-panel-active");
      };

      const handleSignIn = () => {
        containerRef.current.classList.remove("right-panel-active");
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
          // Generar un UUID único
          const sessionId = uuidv4();

          // Crear un objeto para almacenar la sesión
          const sessionData = {
            sessionId,
            user: data.user,
          };

          // Guardar la sesión en localStorage
          localStorage.setItem("userSession", JSON.stringify(sessionData));

          // Redirigir al usuario a la página correspondiente
          router.push("/views/user/layout");
        }
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError("Ocurrió un error inesperado, por favor intenta nuevamente.");
    }
  };

  return (
    <>
     {showErrorModal && <ErrorModalLogin onClose={closeModal} error={error} />}
      <div className="MainContainer">
        <div className="login-body">
          <div className="login-container" ref={containerRef}>
            <div className="form-container sign-up-container">
              <form action="#" className="login-form">
                <h1 className="login-h1">Create Account</h1>
                <span className="login-span">
                  or use your email for registration
                </span>
                <input
                  id="nameRegisterData"
                  className="login-input"
                  type="text"
                  placeholder="Name"
                />
                <input
                  id="emailRegisterData"
                  className="login-input"
                  type="email"
                  placeholder="Email"
                />
                <input
                  id="passwordRegisterData"
                  className="login-input"
                  type="password"
                  placeholder="Password"
                />
                <button ref={signUpRef} className="login-button" type="button">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form action="#" className="login-form">
                <h1 className="login-h1">Sign in</h1>
                <span className="login-span">or use your account</span>
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <a className="login-a" href="#">
                  Forgot your password?
                </a> */}
                <button
                  type="button"
                  className="login-button"
                  onClick={handleLogin}
                  ref={signInRef}
                >
                  Sign In
                </button>
                <Link className="login-a" href="/">Continuar como invitado</Link>
              </form>
              {error && <p className="login-p">{error}</p>}
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="login-h1">Hello, Friend!</h1>
                  <p className="login-p">
                    Enter your personal details and start journey with us
                  </p>
                  <button className="ghost login-button" ref={signInRef}>
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className="login-h1">Welcome Back!</h1>
                  <p className="login-p">
                    To keep connected with us please login with your personal
                    info
                  </p>
                  {/* <button className="ghost login-button" ref={signUpRef}>
                    Sign Up
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Aquí es donde envolvemos el uso de useSearchParams con Suspense */}
          <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsComponent />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Login;
