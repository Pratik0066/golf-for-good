import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// 1. Import your AuthProvider
import { AuthProvider } from "./context/AuthContext";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Ensure your .env file has VITE_STRIPE_PUBLISHABLE_KEY defined
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      {/* 2. Wrap App with AuthProvider so ProtectedRoute can access user state */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Elements>
  </React.StrictMode>
);