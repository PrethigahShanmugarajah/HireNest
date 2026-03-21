// Client / src / context / AppContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const value = { navigate };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
