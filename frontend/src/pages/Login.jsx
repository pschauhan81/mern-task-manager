import { useState } from "react";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Stop login if empty fields
    if (!email || !password) {
      setError("⚠ Please enter both email and password");
      return;
    }

    // Success Login
    localStorage.setItem("token", "abcd1234");
    localStorage.setItem("justLoggedIn", "true");

    setToken("abcd1234");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 border border-red-400 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-3 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // clear error when typing
              }}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 p-3 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // clear error when typing
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
