import React, { useState, useEffect } from "react";
import { Icons } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import dev from "/public/devchallenges.svg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/LayoutAdmin/DashBoard");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      user: user,
    };

    console.log("Datos del formulario:", data);

    fetch("https://bitacoraback-production.up.railway.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.user);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("InfoUser", JSON.stringify(data.user));
        console.log(data.user);
        navigate("/LayoutAdmin/DashBoard");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={dev} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Correo Electronico
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Por favor, ingrese una dirección de correo electrónico válida."
                    )
                  }
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Correo Electronico"
                />
              </div>
              <div className="relative flex justify-between">
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10 border-r-0"
                  placeholder="Contraseña"
                />

                <div className="flex justify-center items-center border-l-0 border-r border-b rounded-md border-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 14l9-5-9-5-9 5 9 5z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    )}
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesion
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              No tienes una cuenta aun?{" "}
              <a
                href="https://bitacoraback-production.up.railway.app/api/auth/Register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Registrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
