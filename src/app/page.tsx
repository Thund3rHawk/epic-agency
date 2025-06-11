import ColorProvider from "@/context/themeContext";
import Homepage from "./pages/Homepage";

export default function Home() {
  return (
    // have to control the bg and the text color stuff according to the image change animation by using hook
    <ColorProvider>
      {/* <Navbar/> */}
      <Homepage/>
    </ColorProvider>
  );
}
