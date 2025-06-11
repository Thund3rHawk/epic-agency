'use client'

import { createContext, SetStateAction, useState } from "react";


export type colorProviderType = {
  color: string;
  setColor: React.Dispatch<SetStateAction<string>>;
  textColor: string;
  setTextColor: React.Dispatch<SetStateAction<string>>;
};

export const colorContext = createContext<colorProviderType>({
  color: "",
  setColor: () => {},  
  textColor: "",
  setTextColor: () => {},  
});

const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("");
  

  return (
    <colorContext.Provider
      value={{
        color, setColor, textColor, setTextColor
      }}
    >
      {children}
    </colorContext.Provider>
  );
};

export default ColorProvider;