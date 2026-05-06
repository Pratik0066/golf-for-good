// src/pages/user/Rules.jsx
import { ShieldCheck, Info, HelpCircle } from 'lucide-react';

export default function Rules() {
  const steps = [
    { title: "Submission", text: "Submit your score & a clear photo of the official scorecard.", icon: <Info /> },
    { title: "Verification", text: "Our admins verify scores within 24-48 hours.", icon: <ShieldCheck /> },
    { title: "Eligibility", text: "Only your 5 most recent verified scores calculate your rank.", icon: <HelpCircle /> }
  ];

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <h1 className="text-3xl font-black italic mb-10 uppercase">Fair Play Guidelines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="bg-[#161B22] p-10 rounded-[40px] border border-white/5">
            <div className="p-4 bg-[#84cc16]/10 text-[#84cc16] w-fit rounded-2xl mb-6">{step.icon}</div>
            <h3 className="text-xl font-black mb-4 uppercase">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}