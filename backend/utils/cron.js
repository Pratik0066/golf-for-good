// utils/cron.js
import cron from "node-cron";
import { runDraw } from "../controllers/drawController.js";

export const startCronJobs = () => {
  // Run on 1st of every month at midnight
  cron.schedule("0 0 1 * *", async () => {
    console.log("Running monthly draw...");
    await runDraw({ user: { id: "system" } }, { json: console.log });
  });
};