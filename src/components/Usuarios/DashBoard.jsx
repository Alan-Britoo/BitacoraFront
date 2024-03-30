import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userDataString = localStorage.getItem("InfoUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (typeof userData === "object" && !Array.isArray(userData)) {
        setUserData([userData]);
      } else {
        setUserData(userData);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="w-[100%] bg-white text-gray-600 items-center h-[20%] rounded-[10px] pt-2 px-8 my-12">
        <h2 className="pt-[1%] text-xl font-semibold mb-1 flex items-center">
          Bienvenido{" "}
          {userData &&
            userData.map((user, index) => (
              <span key={index} className="text-md ml-2">
                {user.names ? user.names : user.email}
              </span>
            ))}
        </h2>
        <p>Seleccione la acción que quiera realizar en la línea izquierda</p>
      </div>
    </>
  );
};

export default Dashboard;
