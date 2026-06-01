import { createContext, useState } from "react";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);

  return (
    <CityContext value={{ cities, setCities }}>
      {children}
    </CityContext>
  );
};