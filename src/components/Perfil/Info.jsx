import React, { useState, useEffect } from "react";
import "./info.css";
import { Link, useNavigate } from "react-router-dom";

export default function Info({ data }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const userDataString = localStorage.getItem("InfoUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }

    console.log(data);
  }, []);

  return (
    <>
      <section className="">
        <h2 className="personalInfo">Personal info</h2>
        <p className="basicInfo">Basic info, like your name and photo</p>
      </section>

      <section className="">
        {userData && (
          <table className="border bg-white">
            <thead className="border border-[#4791FF] ">
              <tr>
                <th>
                  <div>
                    <h3 className="thProfile">Profile</h3>
                    <p className="thSomeInfo">
                      Some info may be visible to other people
                    </p>
                  </div>

                  <div className="thBtnEdit">
                    <Link to={`/LayoutAdmin/Perfil/${userData.id}`}>
                      Editar
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <table>
                <thead className="">
                  <tr className="flex  flex-col border-b border-l border-r  border-[#4791FF] ">
                    <th className="justify-between border-b text-gray-500 border-[#4791FF] ">
                      USUARIO / CORREO
                      <div className="px-[40px] text-black">
                        {userData.email}
                      </div>
                    </th>

                    <th className="justify-between border-b text-gray-500 border-[#4791FF]">
                      NOMBRES
                      <div className="px-[40px] text-black">
                        {userData.names}
                      </div>
                    </th>
                    <th className="justify-between border-b text-gray-500 border-[#4791FF]">
                      APELLIDOS
                      <div className="px-[40px]  text-black">
                        {userData.first_LastName} {userData.second_LastName}
                      </div>
                    </th>

                    <th className="justify-between border-b text-gray-500 border-[#4791FF]">
                      FECHA NACIMIENTO
                      <div className="px-[40px]  text-black">
                        {userData.birthday}
                      </div>
                    </th>

                    <th className="justify-between border-b text-gray-500">
                      PASSWORD{" "}
                      <div className="px-[40px] text-black">*********</div>
                    </th>
                  </tr>
                </thead>
              </table>
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
