// pages/user/Subscriptions.jsx
import { useState } from "react";
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import { toast } from 'react-hot-toast';

export default function Subscriptions() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(null);

  // Updated plans array with your provided Stripe Price IDs
  const plans = [
    { 
      name: "Basic", 
      price: "0", 
      tier: "Basic", 
      priceId: null, // No Stripe ID needed for free tier
      features: ["Leaderboard Access", "Rolling 5 Engine", "Community News"] 
    },
    { 
      name: "Premium", 
      price: "599", 
      tier: "Premium", 
      priceId: "price_1TU4JhHyQX1LOxSnxqIw7aj0", // 599 Plan
      highlight: true, 
      features: ["Monthly Draw Entry", "Handicap Verification", "Wallet Access", "50% Charity Split"] 
    },
    { 
      name: "Elite", 
      price: "1499", 
      tier: "Elite", 
      priceId: "price_1TU4K8HyQX1LOxSnpKj8N1rw", // 1499 Plan
      features: ["2x Draw Probability", "Impact Reports", "Exclusive Tournaments", "Dedicated Support"] 
    }
  ];

  const handleSubscribe = async (plan) => {
    // Basic tier is handled locally or via a different route; Stripe is for paid tiers
    if (plan.tier === "Basic") return;

    setLoading(plan.tier);
    try {
      // Sending both planType and priceId to match stripeController_5.js
      const { data } = await API.post('/stripe/create-checkout-session', { 
        planType: plan.tier,
        priceId: plan.priceId 
      });

      if (data.url) {
        window.location.href = data.url; // Official Stripe Hosted Checkout
      }
    } catch (err) {
      // Using toast as it's now imported
      toast.error(err.response?.data?.msg || "Stripe engine failed to initialize.");
      setLoading(null);
    }
  };

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="text-center mb-20">
        <h1 className="text-4xl font-black mb-4">Choose Your <span className="text-[#84cc16]">Impact.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto">Elevate your game and support underprivileged youth with every round.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className={`p-10 rounded-[48px] border flex flex-col transition-all ${
            plan.highlight ? "bg-[#161B22] border-[#84cc16] shadow-2xl shadow-[#84cc16]/5" : "bg-[#161B22]/50 border-white/5"
          }`}>
            <h3 className="text-xl font-black mb-2 uppercase italic tracking-widest">{plan.name}</h3>
            <div className="mb-10">
              <span className="text-5xl font-black">₹{plan.price}</span><span className="text-gray-500 text-xs font-bold">/mo</span>
            </div>
            <div className="space-y-4 mb-12 flex-1">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                  <Check size={16} className="text-[#84cc16]" /> {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={user?.subscriptionPlan === plan.tier || loading === plan.tier}
              className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                user?.subscriptionPlan === plan.tier ? "bg-white/5 text-gray-500" : "bg-[#84cc16] text-black hover:scale-105"
              }`}
            >
              {loading === plan.tier ? <Loader2 className="animate-spin mx-auto"/> : (user?.subscriptionPlan === plan.tier ? "Active Plan" : "Upgrade")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}