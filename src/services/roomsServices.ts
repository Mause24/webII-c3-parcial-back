import {
    CannotCreateException,
    RoomNotFoundException,
    RoomNotUpdatedException,
} from "../errors"
import { RoomsModelInterface } from "../interfaces"
import Rooms from "../models/Rooms"

//GET ALL ROOMS
export const getAllRoomsService = async () => {
    const rooms = await Rooms.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
    })

    return rooms.map(room => room.toJSON())
}

//GET ROOM BY CODE
export const getRoomByCodeService = async (code: number) => {
    const room = await Rooms.findOne({
        where: { code: code },
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
    })

    if (!room) {
        throw new RoomNotFoundException()
    }

    return room
}

//POST ROOM
export const postRoomService = async (body: RoomsModelInterface) => {
    const [roomCreated, created] = await Rooms.findOrCreate({
        where: { ...body },
        defaults: { ...body },
    })

    if (!created) {
        throw new CannotCreateException()
    }
    return roomCreated
}

// PATCH ROOM BY CODE
export const patchRoomByCodeService = async (
    code: number,
    body: Partial<RoomsModelInterface>
) => {
    const [rows, roomsUpdated] = await Rooms.update(body, {
        where: { code: code },
        returning: true,
    })

    if (rows <= 0) {
        throw new RoomNotUpdatedException()
    }

    return roomsUpdated[0]
}

//DELETE ROOM BY CODE
export const deleteRoomByCodeService = async (code: number) => {
    const deletedRoom = await Rooms.destroy({ where: { code: code } })
    if (deletedRoom <= 0) {
        throw new RoomNotFoundException()
    }
}
