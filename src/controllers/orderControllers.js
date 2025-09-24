import { DATE } from "sequelize";
import { Order } from "../models/Order.js";
import Transaction from "../models/Transaction.js";

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
    try {                
        const { id } = req.params;    
        const order = await Order.findByPk(id);

        if(!order) return res.status(404).json({ message: "Pedido não encontrado"});

        if( order.status !== "pending") return res.status(400).json({ message: "Somente pedidos pendentes podem ser pagos" });

        order.status = "paid";
        order.paidAt = new Date();
        await order.save();

        const transaction = await Transaction.create({
            orderId: order.id,
            userId,
            amount: order.amount,
            status: "success",
            processedAt: new Date(),
        });

        return res.status(200).json({ message: "Pagamento realizado com sucesso", order});
           
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};
