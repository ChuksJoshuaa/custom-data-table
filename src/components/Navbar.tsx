import toggleSvg from "@/assets/toggle.svg";
import NavProfile from "@/components/NavProfile";
import { useBlog } from "@/context/BlogContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useBlog();

  return (
    <div className="w-full h-[55px] relative bg-blue-600">
      <div className="main-container flex flex-row justify-between items-center w-full">
        <Link
          to="/"
          className="w-72 h-[55px]"
          style={{ fontFamily: "Lobster Two" }}
        >
          <h1
            className={`text-gray-50 text-3xl font-bold pt-2.5 ${
              !sidebarOpen ? "ml-5" : "ml-0"
            }`}
            data-testid="navbar-title"
          >
            Ubulu Africa
          </h1>
        </Link>

        <div className={`${!sidebarOpen ? "block" : "hidden"}`}>
          <NavProfile />
        </div>

        <div
          className={`cursor-pointer ${!sidebarOpen ? "hidden" : "block"}`}
          onClick={() => setSidebarOpen(true)}
        >
          <img src={toggleSvg} alt="search" className="h-8 w-8 text-[#222]" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
