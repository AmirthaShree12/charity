import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./components/EditEvent";
import { Calendar, Heart, Search, HomeIcon, Plus, User, LogOut, LogIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ProfileDropdown({ onLogout }) {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border p-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Guest User</h2>
        <p className="text-sm text-gray-500">guest@example.com</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <Link to="/" className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-500" />
              <Calendar className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Charity Event Hub
              </h1>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium flex items-center space-x-1">
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link to="/create" className="text-gray-600 hover:text-blue-600 font-medium flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </Link>
              <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium flex items-center space-x-1">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Link>

              {user ? (
                <>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition"
                    >
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                    </button>
                    {showDropdown && <ProfileDropdown onLogout={handleLogout} />}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setUser({ name: "Guest", email: "guest@example.com" })}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                  <Link
                    to="/register"
                    className="px-3 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Routes */}
      <main className="flex-1 bg-gradient-to-br from-purple-100 via-blue-200 to-pink-100 flex justify-center items-start">
        <div className="w-full bg-white shadow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<AddEvent />} />
            <Route path="/edit/:id" element={<EditEvent />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
