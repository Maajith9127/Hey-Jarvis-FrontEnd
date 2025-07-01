import React, { useState, useEffect } from "react";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../../services/authService.js";

const SignInModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkAuth();
        if (data?.userId) {
          setIsLoggedIn(true);
          console.log("✅ Logged in as:", data.userId);
        }
      } catch {
        setIsLoggedIn(false);
        console.log("⛔ Not authenticated");
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      setIsLoggedIn(true);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(email, password, name);
      setError("✅ Registered! Please login.");
      setIsLoginMode(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLoggedIn ? "Welcome Back!" : isLoginMode ? "Sign In" : "Register"}
        </h2>

        {!isLoggedIn ? (
          <>
            {!isLoginMode && (
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 mb-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={isLoginMode ? handleLogin : handleRegister}
            >
              {isLoginMode ? "Login" : "Register"}
            </button>
            <p className="text-xs text-center mt-2 text-gray-600">
              {isLoginMode ? "New user?" : "Already have an account?"}{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? "Register here" : "Login here"}
              </button>
            </p>
          </>
        ) : (
          <button
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

        <button
          className="mt-4 text-sm text-gray-500 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
