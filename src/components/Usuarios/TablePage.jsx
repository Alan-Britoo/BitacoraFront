import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Tablepage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://bitacoraback-production.up.railway.app/api/pages")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (user.URL && user.URL.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.description &&
        user.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.created_at && user.created_at.includes(searchTerm)) ||
      (user.roll_id && user.roll_id.toString().includes(searchTerm)) ||
      (user.updated_at && user.updated_at.includes(searchTerm))
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
          Pagina {currentPage} de {totalPages}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto  w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border">ID</td>
              <td className="px-4 py-2 border">URL</td>
              <td className="px-4 py-2 border">Nombre</td>
              <td className="px-4 py-2 border">Descripcíon</td>
              <td className="px-4 py-2 border">Creado</td>
              <td className="px-4 py-2 border">Actualizado</td>
              <td className="px-4 py-2 border">Accíon </td>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="bg-white">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.URL}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.description}</td>
                <td className="px-4 py-2 border">{user.created_at}</td>
                <td className="px-4 py-2 border">{user.updated_at}</td>

                <td className="px-4 py-2 border">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Borrar
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
          Atras
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
