import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logs = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://bitacoraback-production.up.railway.app/api/bitacora")
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
      (user.id && user.id.toString().includes(searchTerm)) ||
      (user.description &&
        user.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.date &&
        user.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.hour && user.hour.includes(searchTerm))
    );
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="w-full mx-auto mb-8">
        <div className=" w-[100%] bg-black text-white late-300 items-center h-[70px] rounded-[10px] px-10 my-2 ">
          <h2 className="text-white font-semibold py-6">Bitacora</h2>
        </div>
      </div>

      <div className="container mx-auto  py-2">
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md w-64"
          />
          <p className="text-gray-600">
            Pigina {currentPage} de {totalPages}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto  w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <td className="px-4 py-2 border">ID</td>
                <td className="px-4 py-2 border">Descripción</td>
                <td className="px-4 py-2 border">Fecha</td>
                <td className="px-4 py-2 border">Hora</td>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.description}</td>
                  <td className="px-4 py-2 border">{user.date}</td>
                  <td className="px-4 py-2 border">{user.hour}</td>
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
    </>
  );
};
