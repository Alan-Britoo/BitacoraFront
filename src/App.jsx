import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./components/Navegacion/LayoutAdmin";
import "./App.css";
import { Register } from "./components/Authentication/Register";
import { Perfil } from "./components/Perfil/Perfil";

import Info from "./components/Perfil/Info";
import { Login } from "./components/Authentication/Login";
import Usuarios from "./components/Usuarios/Usuarios";
import DashBoard from "./components/Usuarios/DashBoard";
import Roll from "./components/Usuarios/Roll";
import { Logs } from "./components/Usuarios/Logs";

import Page from "./components/Usuarios/Page";
import { MyProvider } from "./components/Authentication/MyContex";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/LayoutAdmin" element={<LayoutAdmin />}>
            <Route path="Info" element={<Info />} />
            <Route path="Perfil/:id" element={<Perfil />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="roll" element={<Roll />} />
            <Route path="logs" element={<Logs />} />
            <Route path="page" element={<Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
