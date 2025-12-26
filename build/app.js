import "dotenv/config"; // ✅ load env FIRST
import express from "express";
import { initDB } from "./database/connection.js"; // Sequelize connection
const app = express();
const PORT = process.env.PORT || 8000;
// JSON middleware
app.use(express.json());
// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Testing!!" });
});
app.get("/about", (req, res) => {
    res.status(200).json({ message: "Welcome to About Page" });
});
app.get("/contact", (req, res) => {
    res.status(200).json({ message: "Welcome to Contact Page" });
});
// Start server after DB is ready
async function start() {
    try {
        await initDB(); // ensures DB connection and models are synced
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("Failed to start server due to DB error:", err);
        process.exit(1); // crash safely if DB fails
    }
}
start();
//# sourceMappingURL=app.js.map