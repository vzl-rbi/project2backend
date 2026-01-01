import express from "express";
import authRouter from "./routes/globals/auth/auth.route.js";
import adminSeeder from "./seeders/adminSeeder.js";
import { initDB } from "./database/connection.js";
import productRouter from "./routes/products/product.route.js";
// import seedCategory from "./controllers/categories/category.controller.js";
import categoryRouter from "./routes/categories/category.route.js";
const app = express()
app.use(express.json())
app.use("/api", authRouter)
app.use("/admin", productRouter)
app.use("/category", categoryRouter)
// seedCategory()
//adminSeeder
const startApp = async () => {
  await initDB();        // Ensure DB is ready
  await adminSeeder();   // Run seeder only after DB is ready
};
startApp().catch(err => console.error("App startup failed:", err));
export default app