// backend/controllers/stripeController.js
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * CREATE CHECKOUT SESSION
 * PRD Section 04: Subscription Lifecycle Management
 */
export const createCheckoutSession = async (req, res) => {
  try {
    const { planType, priceId } = req.body; // Expecting 'Premium' or 'Elite' and Stripe Price ID

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // The Stripe Price ID for the chosen tier
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: req.user.email,
      client_reference_id: req.user.id,
      // PRD Section 04: Mandatory Redirect URLs
      success_url: `${process.env.CLIENT_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/membership`,
      metadata: {
        userId: req.user.id,
        planType: planType,
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe Session Error:", err.message);
    res.status(500).json({ msg: "Failed to create checkout session", error: err.message });
  }
};

// Confirm payment + update user tier (Keep for manual wallet updates if needed)
export const confirmPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);

    user.balance += amount;
    await user.save();

    await Transaction.create({
      user: user._id,
      amount,
      type: "deposit",
    });

    res.json({ msg: "Wallet updated", balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};