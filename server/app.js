import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./db/mongoConnect.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoConnect();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});