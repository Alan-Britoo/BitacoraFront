import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom"; // Importa BrowserRouter y Link desde react-router-dom
// Icons
import {
  RiLayoutGridLine,
  RiEarthLine,
  RiCustomerService2Line,
  RiCalendarTodoLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };
  return (
    <>
      <div
        className={`xl:h-[100vh]  fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-screen top-0 bg-[#0A0A0A] p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <h1 className="mb-10 text-2xl font-bold text-center text-white">
            Tablero<span className="text-4xl text-[#4791ff]">.</span>
          </h1>
          <ul>
            <li>
              <Link
                to="/LayoutAdmin/Roll"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:transform hover:scale-105"
              >
                <LuLayoutDashboard className="text-[#4791ff]" />
                Roles
              </Link>
            </li>
            <li>
              <Link
                to="/LayoutAdmin/usuarios"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:transform hover:scale-105"
              >
                <RiLayoutGridLine className="text-[#4791ff]" /> Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/LayoutAdmin/logs"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:transform hover:scale-105"
              >
                <RiCustomerService2Line className="text-[#4791ff]" /> Bitacora
              </Link>
            </li>
            <li>
              <Link
                to="/LayoutAdmin/page"
                className="flex items-center gap-4 px-4 py-2 text-white transition-colors rounded-lg hover:transform hover:scale-105"
              >
                <RiCalendarTodoLine className="text-[#4791ff]" /> Paginas
              </Link>
            </li>
          </ul>
        </div>
        <nav className="m-0 p-0 ">
          <Link
            to="#"
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white transition-colors rounded-lg hover:transform hover:scale-105"
          >
            <RiLogoutCircleRLine className="text-[#4791ff] text-xl " />

            <span className="ml-2">Cerrar sesión</span>
          </Link>
        </nav>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-50 p-3 text-black rounded-full xl:hidden bottom-4 right-4 bg-[#4791ff]"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
