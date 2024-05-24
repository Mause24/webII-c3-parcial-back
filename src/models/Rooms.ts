import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize"
import { sequelize } from "../database"

class Rooms extends Model<
    InferAttributes<Rooms>,
    InferCreationAttributes<Rooms>
> {
    declare code: CreationOptional<number>
    declare roomNumber: number
    declare type: string
    declare price: number
}

Rooms.init(
    {
        code: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        roomNumber: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        paranoid: true,
    }
)

export default Rooms
