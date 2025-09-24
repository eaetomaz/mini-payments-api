import express from "express";
import Transaction from "../models/Transaction.js";
import { where } from "sequelize";

const router = express.Router();

router.use(express.Router());

router.get("/", async (req, res) => {
    try{
        const transactions = await Transaction.findAll({
            where: { userId: req.user.id },
            order: [["processedAt", "DESC"]],
        });
        
        return res.json(transactions);
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor"});
    }
});

export default router;