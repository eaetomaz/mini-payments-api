import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateTokens } from "../utils/token.js";
import { token } from "morgan";
import { RefreshToken } from "../models/RefreshToken.js";

const JWT_SECRET = process.env.JWT_Secret;
const JWT_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

export const register = async (req, res) => {
    const { email, password} = req.body;
    try {
        const exists = await User.findOne({ where: {email} });
        if(exists) return res.status(400).json({ error: "Email já cadastrado" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed });

        res.status(201).json({ message: "Usuário criado", userId: user.id });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if(!user) return res.status(400).json({ error: "Email ou senha inválidos" });

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(400).json({ error: "Email ou senha inválidos"});

        // const token = jwt.sign({ id: user.id, role: user.role}, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        // const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES});
        // res.json({ token, refreshToken });        

        const tokens = await generateTokens(user);
        res.json(tokens);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken} = req.body;

        if(!refreshToken) return res.status(400).json({ message: 'Refresh token é obrigatório' });

        const token = await RefreshToken.findOne({ where: { token: refreshToken } });

        if(!token)
            return res.status(404).json({ message: 'Token não encontrado' });

        await token.destroy();

        return res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch(error) {
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};