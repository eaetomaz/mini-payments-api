import { Order } from "../models/Order.js";

export const createOrder = async (req, res) => {
    const { amount, description } = req.body;
    try {
        const order = await Order.create({
            userId: req.user.id,
            amount, 
            description,
            status: "pending",            
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMyOrder = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { userId: req.user.id } });
        res.json(orders);        
    } catch (err) {
        res.status(500).json({ error: err.message });        
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);        
    } catch (err) {
        res.status(500).json({ error: err.message });        
    }
};

export const payOrder = async (req, res) => {
    if(req.user.role !== "admin") 
        return res.status(403).json({ error: "Acesso negado" });
    
    const { id } = req.params;
    const [ status ] = req.body;

    try {
        const order = await Order.findByPk(id);
        if(!order) return res.status(404).json({ error: "Pedido não encontrado" });

        order.status = status;
        await order.save();

        res.json({ message: `Pedido ${status}`, order });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};
