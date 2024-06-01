import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../database"
import Rooms from "./Rooms"
import User from "./User"

class Booking extends Model<
    InferAttributes<Booking>,
    InferCreationAttributes<Booking>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare cellphone: string
    declare bookingDate: Date
    declare checkInDate: CreationOptional<Date>
    declare checkOutDate: CreationOptional<Date>
    declare roomNumber: ForeignKey<Rooms["code"]>
    declare clientId: ForeignKey<User["id"]>
}

Booking.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        cellphone: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        bookingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkInDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        checkOutDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: sequelize,
        paranoid: true,
    }
)

Booking.belongsTo(Rooms, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "roomNumber",
        allowNull: false,
    },
})

Booking.belongsTo(User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "clientId",
        allowNull: false,
    },
})

export default Booking
