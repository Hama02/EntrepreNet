import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const initialCurrentUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return true;
    }
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = tokenData.exp * 1000;
    if (Date.now() >= expiryTime) {
      setCurrentUser({});
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isTokenExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
};
