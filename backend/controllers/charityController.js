import Charity from "../models/Charity.js";

export const getCharity = async (req, res) => {
  const list = await Charity.find(); // Support PRD search/filter on frontend[cite: 52]
  res.json(list);
};