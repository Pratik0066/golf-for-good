// middleware/subscriptionCheck.js
export const checkSubscription = async (req, res, next) => {
  // Accessing the user's subscription status from the auth-loaded user object
  if (!req.user.isSubscribed || req.user.subscriptionStatus === 'lapsed') {
    return res.status(403).json({ 
      message: "Access restricted. An active subscription is required to enter scores." 
    });
  }
  next();
};