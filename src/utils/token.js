import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/RefreshToken.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

export const generateTokens = async (user) => {
    const acessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await RefreshToken.create({ token: refreshToken, userId: user.id, expiresAt: expiresAt});

    return { acessToken, refreshToken};
}

