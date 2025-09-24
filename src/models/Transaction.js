import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Order } from "./Order.js";

const Transaction = sequelize.define("Transaction", {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key:"id"
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("success", "failed"),
        defaultValue: "success",
    },
    processedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Order.hasOne(Transaction, { foreignKey: "orderId" });
Transaction.belongsTo(Order, { foreignKey: "orderId" });

User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

export default Transaction;