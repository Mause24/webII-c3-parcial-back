import { CannotCreateException, RoomNotFoundException } from "../errors"
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

    return room.toJSON()
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

    return roomCreated.toJSON()
}

// PATCH ROOM BY CODE
export const patchRoomByCodeService = async (
    code: number,
    body: Partial<RoomsModelInterface>
) => {
    const roomToUpdate = await Rooms.findOne({
        where: { code: code },
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
    })

    if (!roomToUpdate) {
        throw new RoomNotFoundException()
    }

    await roomToUpdate.update(body, {
        where: { code: code },
    })

    return roomToUpdate.toJSON()
}

//DELETE ROOM BY CODE
export const deleteRoomByCodeService = async (code: number) => {
    const deletedRoom = await Rooms.destroy({ where: { code: code } })
    if (deletedRoom <= 0) {
        throw new RoomNotFoundException()
    }
}
