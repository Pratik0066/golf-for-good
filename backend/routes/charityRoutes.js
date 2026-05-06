import express from "express";
import { getCharity } from "../controllers/charityController.js";

const router = express.Router();

router.get("/", getCharity);

export default router;