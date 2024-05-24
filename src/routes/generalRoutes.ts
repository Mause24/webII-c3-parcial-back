import { Router } from "express"
import { RESPONSES } from "../utils"
import { authRoutes } from "./authRoutes"
import { bookingRoutes } from "./bookingRoutes"
import { roomsRoutes } from "./roomRoutes"
import { userRoutes } from "./userRoutes"

export const generalRoutes = Router()
// ROUTES
generalRoutes.use("/auth", authRoutes)
generalRoutes.use("/user", userRoutes)
generalRoutes.use("/booking", bookingRoutes)
generalRoutes.use("/rooms", roomsRoutes)

//DEFAULT
generalRoutes.use("/", async (_, res) => {
    res.status(RESPONSES.OK.status).send("Succesfully connected to the server!")
})
