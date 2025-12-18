import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Logs from "./pages/Logs";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setToken(null);
      localStorage.removeItem("token");
    }
  }, []);

  // 🔐 Login function (token set karta hai)

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // 🚪 Logout function
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <Routes>

        {/* Default route -> login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login route */}
        <Route
          path="/login"
          element={
            !token ? (
              <Login setToken={handleLogin} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard logout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Logs page */}
        <Route
          path="/logs"
          element={token ? <Logs /> : <Navigate to="/login" />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </>
  );
}

export default App;
