import express from "express";
import authRouter from "./routes/globals/auth/auth.route.js";
import adminSeeder from "./seeders/adminSeeder.js";
import { initDB } from "./database/connection.js";
import productRouter from "./routes/products/product.route.js";
// import seedCategory from "./controllers/categories/category.controller.js";
import categoryRouter from "./routes/categories/category.route.js";
import cartRouter from "./routes/carts/cart.route.js";
import orderRouter from "./routes/orders/order.route.js";
const app = express()
app.use(express.json())
app.use(express.json());

// app.use((req, _res, next) => {
//   console.log("AFTER JSON PARSER:", req.body);
//   next();
// });

app.use("/api", authRouter)
app.use("/admin", productRouter)
app.use("/category", categoryRouter)
app.use("/customer", cartRouter)
app.use("/apis", orderRouter)
// seedCategory()
//adminSeeder
// app.use((req, _res, next) => {
//   console.log("RAW HEADERS:", req.headers["content-type"]);
//   next();
// });

const startApp = async () => {
  await initDB();        // Ensure DB is ready
  await adminSeeder();   // Run seeder only after DB is ready
};
startApp().catch(err => console.error("App startup failed:", err));
export default app