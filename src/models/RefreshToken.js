import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";

export const RefreshToken = sequelize.define("RefreshToken", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: { type: DataTypes.STRING, allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
});

User.hasMany(RefreshToken, { foreignKey: "userId"});
RefreshToken.belongsTo(User, { foreignKey: "userId"});

