// src/pages/user/Subscriptions.jsx
import { useState } from "react";
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import { toast } from 'react-hot-toast';

export default function Subscriptions() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(null);
  const [isYearly, setIsYearly] = useState(false); // Toggle state for Monthly/Yearly

  // Plans array updated with both Monthly and Yearly Price IDs
  const plans = [
    { 
      name: "Basic", 
      tier: "Basic", 
      monthlyPrice: "0",
      yearlyPrice: "0",
      monthlyId: null, 
      yearlyId: null,
      features: ["Leaderboard Access", "Rolling 5 Engine", "Community News"] 
    },
    { 
      name: "Premium", 
      tier: "Premium", 
      monthlyPrice: "599",
      yearlyPrice: "5990", // Example: 2 months free discount
      monthlyId: "price_1TU4JhHyQX1LOxSnxqIw7aj0", // e.g., price_1TU4Jh...
      yearlyId: "price_1TUK75HyQX1LOxSnPyqq9xtf",   // e.g., price_1XYZ...
      highlight: true, 
      features: ["Monthly Draw Entry", "Handicap Verification", "Wallet Access", "50% Charity Split"] 
    },
    { 
      name: "Elite", 
      tier: "Elite", 
      monthlyPrice: "1499",
      yearlyPrice: "14990", // Example: 2 months free discount
      monthlyId: "price_1TU4K8HyQX1LOxSnpKj8N1rw",   // e.g., price_1TU4K8...
      yearlyId: "price_1TUK5SHyQX1LOxSnw53e1kMo",     // e.g., price_1ABC...
      features: ["2x Draw Probability", "Impact Reports", "Exclusive Tournaments", "Dedicated Support"] 
    }
  ];

  const handleSubscribe = async (plan) => {
    if (plan.tier === "Basic") return;

    setLoading(plan.tier);
    try {
      // Dynamically select the correct ID based on the toggle state
      const selectedPriceId = isYearly ? plan.yearlyId : plan.monthlyId;

      const { data } = await API.post('/stripe/create-checkout-session', { 
        planType: plan.tier,
        priceId: selectedPriceId,
        billingCycle: isYearly ? 'Yearly' : 'Monthly' // Optional: pass to backend if needed
      });

      if (data.url) {
        window.location.href = data.url; 
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Stripe engine failed to initialize.");
      setLoading(null);
    }
  };

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Choose Your <span className="text-[#84cc16]">Impact.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10">Elevate your game and support underprivileged youth with every round.</p>
        
        {/* --- MONTHLY / YEARLY TOGGLE UI --- */}
        <div className="flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest">
          <span className={!isYearly ? "text-white" : "text-gray-600"}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-8 bg-[#161B22] border border-white/10 rounded-full relative transition-colors hover:border-[#84cc16]/50"
          >
            <div className={`w-6 h-6 bg-[#84cc16] rounded-full absolute top-1 transition-all ${isYearly ? "left-9" : "left-1"}`} />
          </button>
          <span className={isYearly ? "text-white" : "text-gray-600"}>Yearly <span className="text-[#84cc16] ml-1">(Save 16%)</span></span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className={`p-10 rounded-[48px] border flex flex-col transition-all ${
            plan.highlight ? "bg-[#161B22] border-[#84cc16] shadow-2xl shadow-[#84cc16]/5" : "bg-[#161B22]/50 border-white/5"
          }`}>
            <h3 className="text-xl font-black mb-2 uppercase italic tracking-widest">{plan.name}</h3>
            
            {/* Dynamic Price Display */}
            <div className="mb-10">
              <span className="text-5xl font-black">
                ₹{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-gray-500 text-xs font-bold">
                /{isYearly ? 'yr' : 'mo'}
              </span>
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