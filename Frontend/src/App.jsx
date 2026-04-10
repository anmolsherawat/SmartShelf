import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import About from "./about/About";
import AdminAddBook from "./components/AdminAddBook";
import LoginPage from "./components/LoginPage";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/explore"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/add-book" element={
            <>
              {/* Optional simple navbar to go back home */}
              <div className="p-4 bg-base-300">
                <a href="/" className="btn btn-ghost text-xl">Home</a>
              </div>
              <AdminAddBook />
            </>
          } />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
