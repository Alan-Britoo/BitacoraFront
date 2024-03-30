import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TablaUsuarios } from "./TablaUsuarios";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  const [first_LastName, setFirst_LastName] = useState("");
  const [second_LastName, setSecond_LastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [rollId, setRollId] = useState("");
  const [rolls, setRolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    Modal.setAppElement("#root");

    fetch("https://bitacoraback-production.up.railway.app/api/rolls")
      .then((response) => response.json())
      .then((dataRoll) => setRolls(dataRoll))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const abrirModal = () => {
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      names: names,
      first_LastName: first_LastName,
      second_LastName: second_LastName,
      birthday: birthday,
      roll_id: rollId,
    };

    fetch("https://bitacoraback-production.up.railway.app/api/users", {
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
        console.log(data);
        cerrarModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between w-[79%] bg-black text-white late-300 items-center h-[70px]  rounded-[10px] px-10 my-12 absolute top-8">
        <h2>Informacion de Usuario</h2>
        <button
          onClick={abrirModal}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
        >
          Agregar Nuevo Usuario
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={cerrarModal}
        className="Modal"
        style={{
          content: {},
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-[35%] h-[92%] bg-[#d2e8ff] my-5 py-[10px] px-[20px] rounded absolute top-0 left-[480px] z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-black font-semibold">Agregar Usuario</h1>
            <button
              onClick={cerrarModal}
              className="bg-gray-100 hover:bg-red-300  rounded p-[7px]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="my-2 px-2">
              <label htmlFor="email" className="text-gray-600">
                Correo
              </label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                className="focus:outline-none w-full h-8 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-2 px-2">
              <label htmlFor="names" className="text-gray-600">
                Nombres
              </label>
              <br />
              <input
                type="text"
                id="names"
                name="names"
                placeholder="Nombres"
                className="focus:outline-none w-full h-8 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setNames(e.target.value)}
              />
            </div>

            <div className="my-2 px-2">
              <label htmlFor="first_LastName" className="text-gray-600">
                Primer Apellido
              </label>
              <br />
              <input
                type="text"
                id="first_LastName"
                name="first_LastName"
                placeholder="Primer apellido"
                className="focus:outline-none w-full h-8 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setFirst_LastName(e.target.value)}
              />
            </div>

            <div className="my-2 px-2">
              <label htmlFor="second_LastName" className="text-gray-600">
                Segundo Apellido
              </label>
              <br />
              <input
                type="text"
                id="second_LastName"
                name="second_LastName"
                placeholder="Segundo apellido"
                className="focus:outline-none w-full h-8 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setSecond_LastName(e.target.value)}
              />
            </div>

            <div className="my-2 px-2">
              <label htmlFor="birthday" className="text-gray-600">
                Fecha de Nacimiento
              </label>
              <br />
              <input
                type="date"
                id="birthday"
                name="birthday"
                className="focus:outline-none w-full h-8 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="my-2 px-2">
              <label htmlFor="rollId" className="text-gray-600">
                Rol
              </label>
              <br />
              <select
                id="rollId"
                name="rollId"
                value={rollId}
                className="focus:outline-none w-full h-8 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setRollId(e.target.value)}
              >
                <option value="">Seleccionar un roll</option>
                {rolls.map((roll) => (
                  <option key={roll.id} value={roll.id}>
                    {roll.name}
                  </option>
                ))}
              </select>
            </div>

            <p className="py-[8px] mx-2">
              La contraseña por defecto de cada usuario será su{" "}
              <strong>primer apellido</strong>, indicar que debe efectuar un
              cambio de contraseña individualmente en el apartado de{" "}
              <strong>Editar</strong> en <strong>My Profile</strong>
            </p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="absolute w-[79%] top-36 ">
        <TablaUsuarios />
      </div>
    </div>
  );
};

export default Usuarios;
