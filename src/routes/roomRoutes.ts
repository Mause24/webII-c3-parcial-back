import { Router } from "express"
import {
    deleteRoomByCode,
    getAllRooms,
    getRoomByCode,
    patchRoomByCode,
    postRoom,
} from "../controllers"
import { PROFILES, RoomByCodeParams, RoomsModelInterface } from "../interfaces"
import { authentication, validatorBody, validatorParams } from "../middlewares"
import {
    RoomByCodeParamsScheme,
    RoomsBodyScheme,
    RoomsPartialBodyScheme,
} from "../schemas"

export const roomsRoutes = Router()

//GETS
roomsRoutes.get("/", authentication([PROFILES.ADMIN]), getAllRooms)
roomsRoutes.get<any, RoomByCodeParams>(
    "/:code",
    authentication([PROFILES.ADMIN]),
    validatorParams(RoomByCodeParamsScheme),
    getRoomByCode
)
//POSTS
roomsRoutes.post<any, RoomsModelInterface>(
    "/",
    authentication([PROFILES.ADMIN]),
    validatorBody(RoomsBodyScheme),
    postRoom
)
//PATCHS
roomsRoutes.patch<any, Partial<RoomsModelInterface>>(
    "/:code",
    authentication([PROFILES.ADMIN]),
    validatorParams(RoomByCodeParamsScheme),
    validatorBody(RoomsPartialBodyScheme),
    patchRoomByCode
)
//DELETES
roomsRoutes.delete<any, RoomByCodeParams>(
    "/:code",
    authentication([PROFILES.ADMIN]),
    validatorParams(RoomByCodeParamsScheme),
    deleteRoomByCode
)
