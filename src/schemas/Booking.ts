import Joi from "joi"
import { BookingByIdParams, BookingModelInterface } from "../interfaces"

export const BookingBodyScheme = Joi.object({
    name: Joi.string().required(),
    cellphone: Joi.string().required(),
    bookingDate: Joi.date().required(),
    checkInDate: Joi.date().allow(null),
    checkOutDate: Joi.date().allow(null),
    roomNumber: Joi.number().required(),
})

export const BookingPartialBodyScheme = Joi.object<
    Partial<BookingModelInterface>
>({
    name: Joi.string(),
    cellphone: Joi.string(),
    bookingDate: Joi.date(),
    checkInDate: Joi.date().allow(null),
    checkOutDate: Joi.date().allow(null),
    roomNumber: Joi.number(),
})

export const BookingByIdParamsScheme = Joi.object<BookingByIdParams>({
    id: Joi.number().required(),
})
