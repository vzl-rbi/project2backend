import express from "express";
import type { Application, Request, Response } from "express";
import db from "./model/index.js";

const app: Application = express();
const PORT = 8000;
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Testing!!" });
});

app.get("/about", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to About Page" });
});

app.get("/contact", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to contact Page" });
});
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});