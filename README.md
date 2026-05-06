⛳ GolfForGood: Digital Sports Management Platform
GolfForGood is a high-performance MERN stack application that turns golf performance into charitable impact. By integrating a competitive "Rolling 5" scoring system with tiered subscriptions, the platform fuels education for underprivileged youth through every Stableford point scored.

🚀 Core Features
1. The "Rolling 5" Engine
Dynamic Eligibility: Automatically tracks a player's last 5 verified rounds to calculate their championship average.

Verification Workflow: Secure scorecard image uploads via Cloudinary ensure all submitted Stableford points (1-45) are authentic.

Anti-Fraud: Admins must audit and approve scores before they impact the leaderboard or draw eligibility.

2. Tiered Subscription Model (INR)
Integrated with Stripe India, the platform offers three distinct membership levels:

Basic (₹0): Entry-level access to the global leaderboard and community news.

Premium (₹599): Unlocks the "Rolling 5" engine, monthly prize draw entry, and wallet access.

Elite (₹1499): The ultimate tier, granting 2x Draw Probability and exclusive impact reports.

3. Championship Draw & Wallet
Automated Draws: A monthly selection process that distributes a prize pool funded by subscriptions (40%/35%/25% split).

Digital Wallet: Real-time balance tracking for payouts and tournament winnings.

Impact Tracking: Transparent reporting on how subscription fees fund educational initiatives.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS (Glassmorphism UI), Lucide Icons.

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose).

Payments: Stripe API (Subscription Lifecycle Management).

Storage: Cloudinary (Scorecard Verification).

📂 Project Structure
Plaintext
├── backend/
│   ├── controllers/    # Stripe, Draw, and Score logic
│   ├── models/         # User, Score, and Transaction schemas
│   ├── routes/         # API endpoints
│   └── seed.js         # 1000-user 6-month simulation script
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI elements
│   │   ├── pages/      # Subscriptions, MyScores, Dashboard
│   │   └── context/    # Auth and Subscription state
└── README.md
⚙️ Setup & Installation
Clone the Repo:

Bash
git clone https://github.com/your-username/golf-for-good.git
Environment Variables:
Create a .env in the backend with:

MONGO_URI

STRIPE_SECRET_KEY

CLOUDINARY_URL

CLIENT_URL (e.g., http://localhost:5173)

Seed the Database:
Run the 1,000-user simulation to test the 6-month historical data:

Bash
npm run seed
Start the Engines:

Bash
# Backend
npm run dev
# Frontend
npm run dev
GolfForGood — Turning passion into purpose.
