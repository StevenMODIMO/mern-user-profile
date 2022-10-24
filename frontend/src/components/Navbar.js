import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuth()
  const handleClick = () => {
    logout();
  };
  return (
    <div className="navi">
      <div className="home-link">
        {user && (<Link to="/">Home</Link>)}
      </div>
      <nav>
        {!user && (<Link to="/register">Register</Link>)}
        {user && (<button onClick={handleClick} className="button">
          Log Out {<BsFillArrowRightSquareFill className="icon" />}
        </button>)}
      </nav>
    </div>
  );
};

export default Navbar;
