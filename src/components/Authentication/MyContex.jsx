import { useState } from "react";
import { useContext, createContext } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const userStorage = localStorage.getItem("token");
  const userData =
    userStorage === undefined || userStorage === null
      ? null
      : JSON.parse(userStorage);

  const [userT, setUserT] = useState(userData);

  const loginUser = (userData) => {
    localStorage.setItem("userT", JSON.stringify(userData));
    setUserT(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("userT");
    setUserT(null);
  };

  return (
    <MyContext.Provider value={{ userT, setUserT, loginUser, logoutUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
