import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { RefreshToken } from "../models/RefreshToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(400).json({ error: "Refresh token não fornecido" });

    try {
        const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken} });
        if(!tokenRecord) return res.status(403).json({ error: "Refresh token inválido" });    

        if (new Date(tokenRecord.expires_at) < new Date()) {
            await tokenRecord.destroy();
            return res.status(403).json({ error: "Refresh token expirado" });
        }

        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const acessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expires_at: "15m" });

        res.json({ acessToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;