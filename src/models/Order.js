import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";

export const Order = sequelize.define("Order", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.FLOAT, allowNull: false},
    status: {type: DataTypes.STRING, defaultValue: "pending"},
});

User.hasMany(Order, { foreignKey: "userId"});
Order.belongsTo(User, { foreignKey: "userId"});