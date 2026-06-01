import { createContext, useState } from "react";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [city, setCity] = useState([]);

  return (
    <CityContext value={{ city, setCity }}>
      {children}
    </CityContext>
  );
};