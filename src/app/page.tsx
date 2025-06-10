import Footer from "@/components/Footer";
import Homepage from "./pages/Homepage";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    // have to control the bg and the text color stuff according to the image change animation by using hook
    <div className="">
      {/* <Navbar/> */}
      <Homepage/>
    </div>
  );
}
