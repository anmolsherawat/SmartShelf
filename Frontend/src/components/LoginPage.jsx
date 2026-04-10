import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function LoginPage() {
  const [, setAuthUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("You are now signed in.");
          setAuthUser(res.data.user);
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message || "Something went wrong.");
        } else {
          toast.error("Cannot reach the server. Check that the API and database are running.");
        }
      });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2980&auto=format&fit=crop')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="z-10 w-full max-w-md p-8 bg-base-100 rounded-xl shadow-2xl backdrop-blur-md bg-opacity-95 dark:bg-slate-900 border border-blue-500/20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-8">
              <h3 className="font-bold text-3xl text-blue-500">Welcome Back</h3>
              <p className="text-gray-500 mt-2">Sign in to your bookstore account</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="label">
                  <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-sm text-red-500 mt-1 block">This field is required</span>}
            </div>
            
            <div>
              <label className="label">
                  <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-sm text-red-500 mt-1 block">This field is required</span>}
            </div>
          </div>

          <div className="mt-8">
            <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 border-none text-white text-lg rounded-lg shadow-lg">
              Log In
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
