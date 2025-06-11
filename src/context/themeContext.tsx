'use client'

import { createContext, SetStateAction, useState } from "react";


export type colorProviderType = {
  color: string;
  setColor: React.Dispatch<SetStateAction<string>>;
};

export const colorContext = createContext<colorProviderType>({
  color: "black",
  setColor: () => {},  
});

const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState("black");
  

  return (
    <colorContext.Provider
      value={{
        color, setColor
      }}
    >
      {children}
    </colorContext.Provider>
  );
};

export default ColorProvider;