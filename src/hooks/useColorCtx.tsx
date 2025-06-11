import { useContext } from "react";
import { colorContext } from "@/context/themeContext";

const useColorCtx = () => {
  const context = useContext(colorContext);
  if (!context) {   
    throw new Error("useColor must be used within a ColorContext.Provider");
  }
  return context;
};

export default useColorCtx;