export default function CharityImpact() {
  return (
    <div className="bg-[#0B0E11] py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-white italic uppercase mb-4">50% Community Split</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Our unique economic model ensures that half of every tournament entry directly benefits our verified NGO partners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#161B22] p-12 rounded-[40px] border border-white/5">
            <h3 className="text-3xl font-black text-[#84cc16] mb-4">Rural Education</h3>
            <p className="text-gray-400 leading-relaxed">Funding digital literacy and school infrastructure for 5,000+ students across Rajasthan.</p>
          </div>
          <div className="bg-[#161B22] p-12 rounded-[40px] border border-white/5">
            <h3 className="text-3xl font-black text-[#84cc16] mb-4">Athlete Grants</h3>
            <p className="text-gray-400 leading-relaxed">Supporting talented junior golfers from low-income backgrounds with equipment and coaching[cite: 32].</p>
          </div>
        </div>
      </div>
    </div>
  );
}