import { createContext, useState, useContext, useEffect, } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added to handle refresh states

  // Check for existing session on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Helper to check if user has a specific plan (PRD requirement)
  const isPremium = user?.subscriptionPlan === "Premium" || user?.subscriptionPlan === "Elite";

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isPremium }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);