import express from "express";
import Transaction from "../models/Transaction.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(express.Router());

router.get("/", authMiddleware, async (req, res) => {
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

router.get("/:id", authMiddleware, async (req, res) => {
    try{
        const transaction = await Transaction.findByPk(req.params.id, {
            include: [
                { model: Order, attributes: ["id", "status", "totalamount" ] },
                { model: User, attributes: ["id", "email"] }                
            ]
        });

        if(!transaction) return res.status(404).json({ error: "Transação não encontrada" });

        if(req.user.role !== "admin" && transaction.userId !== req.user.id) return res.status(403).json({ error: "Acesso negado" });        

        res.json(transaction);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar transação" });
    }
});

export default router;