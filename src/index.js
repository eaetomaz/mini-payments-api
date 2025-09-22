import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { sequelize, testConnection } from "./config/db.js";
import authRoutes from "./routes/auth.js"

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100}));

// Rever
testConnection();

app.use("/auth", authRoutes);

sequelize.sync({ alter: true});

app.get("/", (req, res) => {
    res.json({ message: "Mini payments API"});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));