import express from "express";
import db from "./model/index.js";
const app = express();
const PORT = 8000;
app.get("/", (req, res) => {
    res.status(200).json({ message: "Testing!!" });
});
app.get("/about", (req, res) => {
    res.status(200).json({ message: "Welcome to About Page" });
});
app.get("/contact", (req, res) => {
    res.status(200).json({ message: "Welcome to contact Page" });
});
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map