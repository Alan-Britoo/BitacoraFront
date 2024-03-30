import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tablepage } from "./TablePage";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [URL, setURL] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
      URL: URL,
      name: name,
      description: description,
    };

    fetch("https://bitacoraback-production.up.railway.app/api/pages", {
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
        <h2>Paginas</h2>
        <button
          onClick={abrirModal}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
        >
          Agregar nueva pagina
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
        <div className="w-[410px] h-[60%] bg-[#d2e8ff] py-[10px] px-[20px] rounded absolute top-0 left-[480px] z-40 mt-10">
          <div className="flex items-center justify-between">
            <h1 className="text-black font-semibold ">Agregar Nueva Pagina</h1>
            <button
              onClick={cerrarModal}
              className="bg-gray-100 hover:bg-red-200  rounded p-[7px]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="my-2 px-1">
              <label htmlFor="URL" className="text-gray-600 pl-2">
                URL
              </label>
              <br />
              <input
                type="text"
                id="URL"
                name="URL"
                placeholder="Ingrese la url de la pagina"
                className="focus:outline-none w-full h-10 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setURL(e.target.value)}
              />
            </div>

            <div className="my-2 px-1">
              <label htmlFor="name" className="text-gray-600 pl-2">
                Nombre
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ingrese el nombre de la pagina"
                className="focus:outline-none w-full h-10 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="my-4 px-1">
              <label htmlFor="description" className="text-gray-600 pl-2">
                Descripcíon
              </label>
              <br />
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Ingrese la descripcion de la pagina"
                className="focus:outline-none w-full h-10 px-3 border rounded-lg border-gray-300"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
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
        <Tablepage />
      </div>
    </div>
  );
};

export default Page;
