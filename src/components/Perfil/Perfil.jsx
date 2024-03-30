import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import Info from "./Info";

export const Perfil = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [names, setNames] = useState("");
  const [first_LastName, setFirst_LastName] = useState("");
  const [second_LastName, setSecond_LastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const userDataString = localStorage.getItem("InfoUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      names: names,
      first_LastName: first_LastName,
      second_LastName: second_LastName,
      birthday: birthday,
    };

    fetch(
      `https://bitacoraback-production.up.railway.app/api/users/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("InfoUser", JSON.stringify(data));

        setEmail("");
        setPassword("");
        setNames("");
        setFirst_LastName("");
        setSecond_LastName("");
        setBirthday("");

        navigate(`/LayoutAdmin/Perfil/${userData.id}`);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    <div className="hidden">
      <Info userData1={data} />
    </div>;
  };

  return (
    <>
      <div className=" w-[90%] m-auto my-3 relative ">
        <a
          href="/LayoutAdmin/Info"
          className="text-sky-500 absolute right-[10px] top-[-20px] "
        >
          Atrás
        </a>

        <section className="w-[60%] m-auto rounded-[12px] border-gray-400 border-[1px] mt-[10px] bg-white mb-[20px]">
          <h2 className="text-[22px] mt-[20px]">Cambiar Informacion</h2>
          <div className="w-[80%]">
            <form onSubmit={handleSubmit}>
              <div className="mt-[5px] w-full">
                <label htmlFor="email" className="text-gray-800 text-sm">
                  Usuario/Correo
                </label>

                <div className="w-[100%] h-[33px] rounded-[12px] border-[1px] border-gray-400 mt-[5px] items-center flex bg ">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Escriba su correo.."
                    className="focus:outline-none w-[90%] px-2 bg-transparent  text-xs"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="my-[8px]">
                <label htmlFor="names" className="text-gray-800 text-sm">
                  Nombres
                </label>

                <div className="w-[100%] h-[33px] rounded-[12px] border-[1px] border-gray-400 mt-[5px] items-center flex ">
                  <input
                    type="text"
                    id="names"
                    name="names"
                    placeholder="Escriba sus nombres.."
                    className=" focus:outline-none w-[90%]  px-2 bg-transparent text-xs"
                    autoComplete="off"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                  />
                </div>
              </div>
              <div className="my-[8px]">
                <label
                  htmlFor="first_LastName"
                  className="text-gray-800 text-sm"
                >
                  Primer Apellido
                </label>
                <div className="w-[100%] h-[33px] rounded-[12px] border-[1px] border-gray-400 mt-[5px] items-center flex ">
                  <input
                    type="text"
                    id="first_LastName"
                    name="first_LastName"
                    placeholder="Escriba su primer apellido.."
                    className=" focus:outline-none w-[90%]  px-2 bg-transparent text-xs"
                    autoComplete="off"
                    value={first_LastName}
                    onChange={(e) => setFirst_LastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="my-[8px]">
                <label
                  htmlFor="second_LastName	"
                  className="text-gray-800 text-sm"
                >
                  Segundo Apellido
                </label>

                <div className="w-[100%] h-[33px] rounded-[12px] border-[1px] border-gray-400 mt-[5px] items-center flex ">
                  <input
                    type="text"
                    id="second_LastName	"
                    name="second_LastName	"
                    placeholder="Escriba su segundo apellido.."
                    className=" focus:outline-none w-[90%]  px-2 bg-transparent text-xs"
                    autoComplete="off"
                    value={second_LastName}
                    onChange={(e) => setSecond_LastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="my-[8px]">
                <label htmlFor="birthday" className="text-gray-800 text-sm">
                  Fecha de Nacimiento
                </label>

                <div className="w-[100%] h-[33px] rounded-[12px] border-[1px] border-gray-400 mt-[5px] items-center flex ">
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    placeholder="Escriba su fecha de nacimiento.."
                    className=" focus:outline-none w-[90%]  px-3 bg-transparent text-xs"
                    autoComplete="off"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
              </div>

              <div className="my-[8px]">
                <label htmlFor="password" className="text-gray-800 text-sm">
                  Contraseña
                </label>

                <div className="w-[100%] h-[33px] rounded-[12px] border-[1px] border-gray-400 mt-[5px] items-center flex ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Escriba su contraseña.."
                    className=" focus:outline-none w-[90%] px-3 bg-transparent text-xs"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" w-[82px] h-[38px] rounded-[8px] bg-sky-500 text-white text-[16px] mt-[15px] hover:bg-sky-400 mb-[20px]"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
