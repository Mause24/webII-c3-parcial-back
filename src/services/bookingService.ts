import {
    BookingNotFoundException,
    BookingNotUpdatedException,
    CannotCreateException,
} from "../errors"
import { BookingModelInterface } from "../interfaces"
import Booking from "../models/Booking"
import Rooms from "../models/Rooms"

//GET ALL BOOKING
export const getAllBookingService = async () => {
    const booking = await Booking.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: {
            model: Rooms,
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        },
    })

    return booking.map(booking => booking.toJSON())
}

//GET BOOKING BY ID
export const getBookingByIdService = async (id: number) => {
    const booking = await Booking.findOne({
        where: { id: id },
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: {
            model: Rooms,
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        },
    })

    if (!booking) {
        throw new BookingNotFoundException()
    }

    return booking
}

//POST BOOKING
export const postBookingService = async (body: BookingModelInterface) => {
    const [bookingCreated, created] = await Booking.findOrCreate({
        where: { ...body },
        defaults: { ...body },
    })

    if (!created) {
        throw new CannotCreateException()
    }

    const currentBooking = await bookingCreated.reload({
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: {
            model: Rooms,
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        },
    })

    return currentBooking
}

// PATCH BOOKING BY ID
export const patchBookingByIdService = async (
    id: number,
    body: Partial<BookingModelInterface>
) => {
    const [rows, bookingsUpdated] = await Booking.update(body, {
        where: { id: id },
        returning: true,
    })

    if (rows <= 0) {
        throw new BookingNotUpdatedException()
    }

    const currentBooking = await bookingsUpdated[0].reload({
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: {
            model: Rooms,
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        },
    })

    return currentBooking
}

//DELETE BOOKING BY ID
export const deleteBookingByIdService = async (id: number) => {
    const deletedBooking = await Booking.destroy({ where: { id: id } })
    if (deletedBooking <= 0) {
        throw new BookingNotFoundException()
    }
}
