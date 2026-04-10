import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser(null);
      localStorage.removeItem("Users");
      toast.success("You have been signed out.");
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 2000);
    }
  };
  return (
    <button
      className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer whitespace-nowrap"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
}

export default Logout;
