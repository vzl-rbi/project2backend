import express from "express";
import authRouter from "./routes/globals/auth/auth.route.js";
import adminSeeder from "./seeders/adminSeeder.js";
import { initDB } from "./database/connection.js";
const app = express()
app.use(express.json())
app.use("/api", authRouter)
//adminSeeder
const startApp = async () => {
  await initDB();        // Ensure DB is ready
  await adminSeeder();   // Run seeder only after DB is ready
};
startApp().catch(err => console.error("App startup failed:", err));
export default app