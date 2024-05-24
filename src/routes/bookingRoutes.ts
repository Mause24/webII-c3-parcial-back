import { Router } from "express"
import {
    deleteBookingById,
    getAllBookings,
    getBookingById,
    patchBookingById,
    postBooking,
} from "../controllers"
import {
    BookingByIdParams,
    BookingModelInterface,
    PROFILES,
} from "../interfaces"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    BookingBodyScheme,
    BookingByIdParamsScheme,
    BookingPartialBodyScheme,
} from "../schemas"

export const bookingRoutes = Router()

//GETS
bookingRoutes.get("/", authentication([PROFILES.ADMIN]), getAllBookings)
bookingRoutes.get<any, BookingByIdParams>(
    "/:id",
    authentication(),
    validatorParams(BookingByIdParamsScheme),
    getBookingById
)
//POSTS
bookingRoutes.post<any, BookingModelInterface>(
    "/",
    authentication(),
    validatorBody(BookingBodyScheme),
    postBooking
)
//PATCHS
bookingRoutes.patch<any, Partial<BookingModelInterface>>(
    "/:id",
    authentication(),
    validatorParams(BookingByIdParamsScheme),
    validatorBody(BookingPartialBodyScheme),
    patchBookingById
)
//DELETES
bookingRoutes.delete<any, BookingByIdParams>(
    "/:id",
    authentication(),
    validatorParams(BookingByIdParamsScheme),
    deleteBookingById
)
