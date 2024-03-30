import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TablaRoll } from "./TablaRoll";

const Roll = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");

  const [rolls, setRolls] = useState([]);

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
      name: name,
    };

    fetch("https://bitacoraback-production.up.railway.app/api/rolls", {
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
        <h2>Roles</h2>
        <button
          onClick={abrirModal}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
        >
          Agregar Nuevo Roll
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
        <div className="w-[410px] h-[40%] bg-[#d2e8ff] my-10 py-[10px] px-[20px] rounded absolute top-0 left-[480px] z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-black font-semibold pl-1">Agregar Roll</h1>
            <button
              onClick={cerrarModal}
              className="bg-gray-100 hover:bg-red-300  rounded p-[7px]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="my-2 ">
              <label htmlFor="name" className="text-gray-600 pl-2 ">
                Nombre
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre del Rol"
                className="focus:outline-none w-full h-10 px-3 border rounded-lg border-gray-300 mt-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="my-2 flex justify-center ">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="absolute w-[79%] top-36 ">
        <TablaRoll />
      </div>
    </div>
  );
};

export default Roll;
