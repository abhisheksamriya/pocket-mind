import { useEffect, useState } from "react";
import Display from "../components/Display";
import NavBar from "../components/NavBar";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import axios from "axios";
import API_URL from "../config";

const DashBoard = () => {
  const [activeType, setActiveType] = useState("All");
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
  });
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    const user = await axios.get(`${API_URL}/api/v1/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(user.data);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("unauthorised");
      return;
    }

    fetchUser();
  }, []);
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
        <NavBar
          id={user.id}
          activeType={activeType}
          setActiveType={setActiveType}
        />
      </div>
      <div className="md:ml-75  ">
        <Profile
          username={user.username}
          dark={dark}
          handleToggle={handleToggle}
        />
        <div className="bg-screen min-h-[84vh] md:max-w-[82vw] ml-5 mr-5 mb-5 rounded-2xl">
          <Display activeType={activeType} />
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
