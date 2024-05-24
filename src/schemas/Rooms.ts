import Joi from "joi"
import { RoomByCodeParams, RoomsModelInterface } from "../interfaces"

export const RoomsBodyScheme = Joi.object<RoomsModelInterface>({
    code: Joi.number().required(),
    roomNumber: Joi.number().required(),
    price: Joi.number().required(),
    type: Joi.string().required(),
})

export const RoomsPartialBodyScheme = Joi.object<Partial<RoomsModelInterface>>({
    code: Joi.number(),
    roomNumber: Joi.number(),
    price: Joi.number(),
    type: Joi.string(),
})

export const RoomByCodeParamsScheme = Joi.object<RoomByCodeParams>({
    code: Joi.number().required(),
})
