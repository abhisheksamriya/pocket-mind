import { useState } from "react";
import Display from "../components/Display";
import NavBar from "../components/NavBar";
import Profile from "../components/Profile";
import Footer from "../components/Footer";

const DashBoard = () => {
  const [dark, setDark] = useState(false);
  const handleToggle = () => {
    setDark((t) => !t);
  };
  return (
    <div
      className={`w-screen h-screen overflow-x-hidden ${
        dark ? "bg-black" : "bg-white"
      }`}
    >
      <div>
        <NavBar />
      </div>
      <div className="md:ml-75  ">
        <Profile dark={dark} handleToggle={handleToggle} />
        <div className="bg-screen min-h-[84vh] md:w-[82vw] ml-5 mr-5 mb-5 rounded-2xl">
          <Display />
        </div>
        <div className="mb-5">
          <Footer />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DashBoard;
