import React, { useState, useEffect } from "react";

export const TablaUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rolls, setRolls] = useState([]);

  useEffect(() => {
    fetch("https://bitacoraback-production.up.railway.app/api/rolls")
      .then((response) => response.json())
      .then((dataRoll) => setRolls(dataRoll))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  useEffect(() => {
    fetch(
      `https://bitacoraback-production.up.railway.app/api/users?page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (id, newStatus) => {
    fetch(
      `https://bitacoraback-production.up.railway.app/api/users/${id}/status`,
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
          window.location.reload();
          setCurrentPage(1);
        } else {
          throw new Error("Error changing user status");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const getRollName = (rollId) => {
    const roll = rolls.find((roll) => roll.id === rollId);
    return roll ? roll.name : "";
  };

  const filteredUsers = users.filter((user) => {
    return (
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.status &&
        user.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.created_at && user.created_at.includes(searchTerm)) ||
      (user.roll_id && user.roll_id.toString().includes(searchTerm)) ||
      (user.updated_at && user.updated_at.includes(searchTerm))
    );
  });

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Formatea fecha y hora
  };

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
          Pagina {currentPage} de {totalPages}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto  w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border">ID</td>
              <td className="px-4 py-2 border">Correo</td>
              <td className="px-4 py-2 border">Estado</td>
              <td className="px-4 py-2 border">Creado</td>
              <td className="px-4 py-2 border">Actualizado</td>
              <td className="px-4 py-2 border">Rol</td>
              <td className="px-4 py-2 border">Accíon</td>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="bg-white">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <div
                    className={`rounded-md flex justify-center ${
                      user.status === "active" ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {user.status}
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  {formatDateTime(user.created_at)}
                </td>
                <td className="px-4 py-2 border">
                  {formatDateTime(user.updated_at)}
                </td>
                <td className="px-4 py-2 border">
                  {getRollName(user.roll_id)}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() =>
                      handleStatusChange(
                        user.id,
                        user.status === "active" ? "inactive" : "active"
                      )
                    }
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
          className={`  px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Atrás
        </button>
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-4 px-4 py-2 rounded ${
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
