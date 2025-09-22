import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

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

        const token = jwt.sign({ id: user.id, role: user.role}, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES});

        res.json({ token, refreshToken });        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};