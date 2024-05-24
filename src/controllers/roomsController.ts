import { Request, Response } from "express"
import {
    CannotCreateException,
    RoomNotFoundException,
    RoomNotUpdatedException,
} from "../errors"
import { RoomByCodeParams, RoomsModelInterface } from "../interfaces"
import {
    deleteRoomByCodeService,
    getAllRoomsService,
    getRoomByCodeService,
    patchRoomByCodeService,
    postRoomService,
} from "../services"
import { RESPONSES } from "../utils/Dictionary"

export const getAllRooms = async (_: Request, res: Response) => {
    try {
        const rooms = await getAllRoomsService()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: rooms,
        })
    } catch (error) {
        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

//GET ROOM BY CODE
export const getRoomByCode = async (
    req: Request<RoomByCodeParams>,
    res: Response
) => {
    try {
        const body = req.params
        const room = await getRoomByCodeService(body.code)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: room,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof RoomNotFoundException) {
            res.status(RESPONSES.ROOM_NOT_FOUND.status).json({
                message: RESPONSES.ROOM_NOT_FOUND.message,
            })
            return
        }
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

//POST ROOM
export const postRoom = async (
    req: Request<any, any, RoomsModelInterface>,
    res: Response
) => {
    try {
        const body = req.body
        const roomCreated = await postRoomService(body)
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: roomCreated,
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

//PATCH ROOM BY CODE
export const patchRoomByCode = async (
    req: Request<RoomByCodeParams, any, Partial<RoomsModelInterface>>,
    res: Response
) => {
    try {
        const params = req.params
        const body = req.body
        const patchedRoom = await patchRoomByCodeService(params.code, body)
        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: patchedRoom,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof RoomNotUpdatedException) {
            res.status(RESPONSES.ROOM_NOT_UPDATED.status).json({
                message: RESPONSES.ROOM_NOT_UPDATED.message,
            })
            return
        }
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

//DELETE ROOM BY CODE
export const deleteRoomByCode = async (
    req: Request<RoomByCodeParams>,
    res: Response
) => {
    try {
        const params = req.params

        await deleteRoomByCodeService(params.code)
        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        console.error(error)
        if (error instanceof RoomNotFoundException) {
            res.status(RESPONSES.ROOM_NOT_FOUND.status).json({
                message: RESPONSES.ROOM_NOT_FOUND.message,
            })
            return
        }
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}
