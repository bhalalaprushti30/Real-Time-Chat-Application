import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authenticationSlice";
import login_img from "../assets/login.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const storedUsername = useSelector((state) => state.authentication?.username);
  const [username, setUsername] = useState(storedUsername || "");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      dispatch(login(savedUsername));
    }
  }, [dispatch]);

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
      localStorage.setItem("username", username);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    dispatch(login("")); // Clear Redux state
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-64 md:h-screen">
        <img 
          src={login_img}
          alt="Chat Illustration" 
          className="w-full h-full object-cover rounded-lg shadow-md" 
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-navy p-8 shadow-lg rounded-lg">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-3xl font-bold text-white">
            Start Your Chat Now
          </h2>
          <div className="space-y-6">
            {!storedUsername ? (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  className="w-full rounded-full border border-gray-300 px-5 py-3 text-lg focus:border-navy focus:outline-none shadow-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  onClick={handleLogin}
                  className="w-full rounded-full bg-navy px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-800 shadow-md"
                >
                  Submit
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full rounded-full bg-red-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700 shadow-md"
              >
                {storedUsername} (Logout)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
