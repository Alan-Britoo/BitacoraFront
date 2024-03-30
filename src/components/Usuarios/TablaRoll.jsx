import React, { useState, useEffect } from "react";

export const TablaRoll = () => {
  const [rolls, setRolls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const fetchRoles = () => {
    fetch(`https://bitacoraback-production.up.railway.app/api/rolls`)
      .then((response) => response.json())
      .then((data) => setRolls(data))
      .catch((error) => console.error("Error fetching rolls:", error));
  };

  const handleStatusChange = (id, newStatus) => {
    fetch(
      `https://bitacoraback-production.up.railway.app/api/rolls/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchRoles();
        } else {
          throw new Error("Error changing roll status");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id) => {
    fetch(`https://bitacoraback-production.up.railway.app/api/rolls/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchRoles();
        } else {
          throw new Error("Error deleting roll");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString();
  };

  const filteredUsers = rolls.filter((roll) => {
    return (
      (roll.name &&
        roll.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (roll.status &&
        roll.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (roll.created_at && roll.created_at.includes(searchTerm)) ||
      (roll.updated_at && roll.updated_at.includes(searchTerm))
    );
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto  py-8">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <p className="text-gray-600">
          Paginas {currentPage} de {totalPages}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto  w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border">ID</td>
              <td className="px-4 py-2 border">Nombre</td>
              <td className="px-4 py-2 border">Estado</td>
              <td className="px-4 py-2 border">Creado</td>
              <td className="px-4 py-2 border">Actualizado</td>
              <td className="px-4 py-2 border">Accion</td>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((roll) => (
              <tr key={roll.id} className="bg-white">
                <td className="px-4 py-2 border">{roll.id}</td>
                <td className="px-4 py-2 border">{roll.name}</td>
                <td className="px-4 py-2 border ">
                  <div
                    className={`rounded-md flex justify-center ${
                      roll.status === "active" ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {roll.status}
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  {formatDateTime(roll.created_at)}
                </td>
                <td className="px-4 py-2 border">
                  {formatDateTime(roll.updated_at)}
                </td>

                <td className="px-4 py-2 border flex justify-center">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        roll.id,
                        roll.status === "active" ? "inactive" : "active"
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
                  >
                    Cambiar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`  px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Atras
        </button>
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-4 px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
