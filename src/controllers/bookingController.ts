import { Request, Response } from "express"
import {
    BookingNotFoundException,
    BookingNotUpdatedException,
    CannotCreateException,
} from "../errors"
import {
    BookingByIdParams,
    BookingModelInterface,
    JWTInterface,
} from "../interfaces"
import {
    deleteBookingByIdService,
    getAllBookingService,
    getBookingByIdService,
    patchBookingByIdService,
    postBookingService,
} from "../services"
import { RESPONSES } from "../utils/Dictionary"

//GET ALL BOOKINGS
export const getAllBookings = async (_: Request, res: Response) => {
    try {
        const bookings = await getAllBookingService()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: bookings,
        })
    } catch (error) {
        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

//GET BOOKING BY ID
export const getBookingById = async (
    req: Request<BookingByIdParams>,
    res: Response
) => {
    try {
        const body = req.params
        const booking = await getBookingByIdService(body.id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: booking,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof BookingNotFoundException) {
            res.status(RESPONSES.BOOKING_NOT_FOUND.status).json({
                message: RESPONSES.BOOKING_NOT_FOUND.message,
            })
            return
        }
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

//POST BOOKING
export const postBooking = async (
    req: Request<any, any, BookingModelInterface>,
    res: Response
) => {
    try {
        const parsedUser = JSON.parse(
            (req.query["jwt"] as string) ?? ""
        ) as JWTInterface
        const body = req.body
        const bookingCreated = await postBookingService(body, parsedUser.id)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: bookingCreated,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof CannotCreateException) {
            res.status(RESPONSES.CANNOT_CREATE.status).json({
                message: RESPONSES.CANNOT_CREATE.message,
            })
            return
        }

        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

//PATCH BOOKING BY ID
export const patchBookingById = async (
    req: Request<BookingByIdParams, any, Partial<BookingModelInterface>>,
    res: Response
) => {
    try {
        const params = req.params
        const body = req.body
        const patchedBooking = await patchBookingByIdService(params.id, body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: patchedBooking,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof BookingNotUpdatedException) {
            res.status(RESPONSES.BOOKING_NOT_UPDATED.status).json({
                message: RESPONSES.BOOKING_NOT_UPDATED.message,
            })
            return
        }
        if (error instanceof BookingNotFoundException) {
            res.status(RESPONSES.BOOKING_NOT_FOUND.status).json({
                message: RESPONSES.BOOKING_NOT_FOUND.message,
            })
            return
        }
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

//DELETE BOOKING BY ID
export const deleteBookingById = async (
    req: Request<BookingByIdParams>,
    res: Response
) => {
    try {
        const params = req.params

        await deleteBookingByIdService(params.id)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof BookingNotFoundException) {
            res.status(RESPONSES.BOOKING_NOT_FOUND.status).json({
                message: RESPONSES.BOOKING_NOT_FOUND.message,
            })
            return
        }
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}
