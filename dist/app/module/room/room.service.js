"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const room_model_1 = require("./room.model");
const AppError_1 = __importDefault(require("../../Error/errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// import { CategoryModel } from '../category/category.model';
// const createRoomInDb = async (roomData: TRoom) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         // Check if the category exists
//         const findCategory = await CategoryModel.findById(roomData.type);
//         if (!findCategory) {
//             throw new AppError(httpStatus.NOT_FOUND, "Invalid category");
//         }
//         // Create the room
//         const room = await RoomModel.create([roomData], { session });
//         if (!room) {
//             throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create room');
//         }
//         // Fetch the newly created room with populated type
//         const populatedRoom = await RoomModel.findById(room[0]._id)
//                                       .populate('type')
//                                       .session(session);
//         await session.commitTransaction();
//         await session.endSession();
//         return populatedRoom;
//     } catch (err: any) {
//         await session.abortTransaction();
//         await session.endSession();
//         if (err instanceof AppError) {
//             throw err;
//         }
//         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create room due to an unexpected error. Try again with valid room type.');
//     }
// };
const createRoomInDb = (roomData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if the category exists
        // const findCategory = await CategoryModel.findById(roomData.type);
        // if (!findCategory) {
        //   throw new AppError(httpStatus.NOT_FOUND, 'Invalid category');
        // }
        // Ensure that roomData contains multilingual fields
        // (You might want to add more validation based on your requirements)
        if (!roomData.title.en || !roomData.title.ar) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Both English and Arabic room titles are required');
        }
        // Create the room
        const room = yield room_model_1.RoomModel.create([roomData], { session });
        if (!room) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create room');
        }
        // Fetch the newly created room with populated type
        const populatedRoom = yield room_model_1.RoomModel.findById(room[0]._id)
            .session(session);
        yield session.commitTransaction();
        yield session.endSession();
        return populatedRoom;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        // console.error('Error in createRoomInDb:', err);
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create room due to an unexpected error. Try again with valid room type. ${err.message}`);
    }
});
// const findAllRoomsFromDb = async () => {
//     try {
//         const rooms = await RoomModel.find().populate('type');
//         return rooms;
//     } catch (err) {
//         throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve rooms.');
//     }
// };
const findAllRoomsFromDb = (language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield room_model_1.RoomModel.find({ isDeleted: false }).lean();
        // Map over each room and construct a new object with the desired structure
        const localizedRooms = rooms.map((room) => (Object.assign(Object.assign({}, room), { id: room._id, title: room.title[language], subTitle: room.subTitle ? {
                roomOne: room.subTitle.roomOne[language],
                roomTwo: room.subTitle.roomTwo ? room.subTitle.roomTwo[language] : undefined,
            } : undefined, description: room.description[language], maxGuests: room.maxGuests, roomQTY: room.roomQTY, size: room.size, 
            // features: room.features.map((feature) => feature.name[language]),
            // services: room.services.map((service) => service.name[language]),
            // services: room.services.map((service) => ({
            //   name: service.name ? service.name[language] || service.name.en : "Service name unavailable",
            //   image: service.image || "Default service image path",
            // })),
            images: room.images, priceOptions: room.priceOptions.map((priceOption) => ({
                price: priceOption.price,
                // currency: priceOption.currency[language], // Localize the currency here
                // taxesAndCharges: priceOption.taxesAndCharges,
                // breakfast: priceOption.breakfast[language],
                // cancellation: priceOption.cancellation[language],
                // prepayment: priceOption.prepayment[language],
                // refundable: priceOption.refundable,
            })) })));
        return localizedRooms;
    }
    catch (err) {
        // console.error('Error in findAllRoomsFromDb:', err);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to retrieve the room.${err.message} `);
    }
});
const findAllRoomsForAdmin = (language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield room_model_1.RoomModel.find().lean();
        // Map over each room and construct a new object with the desired structure
        const localizedRooms = rooms.map((room) => (Object.assign(Object.assign({}, room), { id: room._id, title: room.title[language], subTitle: room.subTitle ? {
                roomOne: room.subTitle.roomOne[language],
                roomTwo: room.subTitle.roomTwo ? room.subTitle.roomTwo[language] : undefined,
            } : undefined, description: room.description[language], maxGuests: room.maxGuests, roomQTY: room.roomQTY, size: room.size, 
            // features: room.features.map((feature) => feature.name[language]),
            // services: room.services.map((service) => service.name[language]),
            // services: room.services.map((service) => ({
            //   name: service.name ? service.name[language] || service.name.en : "Service name unavailable",
            //   image: service.image || "Default service image path",
            // })),
            images: room.images, priceOptions: room.priceOptions.map((priceOption) => ({
                price: priceOption.price,
                // currency: priceOption.currency[language], // Localize the currency here
                // taxesAndCharges: priceOption.taxesAndCharges,
                // breakfast: priceOption.breakfast[language],
                // cancellation: priceOption.cancellation[language],
                // prepayment: priceOption.prepayment[language],
                // refundable: priceOption.refundable,
            })) })));
        return localizedRooms;
    }
    catch (err) {
        // console.error('Error in findAllRoomsFromDb:', err);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to retrieve the room.${err.message} `);
    }
});
const findRegularFromDb = (language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regularRooms = yield room_model_1.RoomModel.find({ tags: { $ne: 'promotion' }, isDeleted: false }).lean();
        if (regularRooms.length === 0) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `No promotion Room available now `);
        }
        // Map over each room and construct a new object with the desired structure
        const localizedRooms = regularRooms.map((room) => (Object.assign(Object.assign({}, room), { id: room._id, title: room.title[language], subTitle: room.subTitle ? {
                roomOne: room.subTitle.roomOne[language],
                roomTwo: room.subTitle.roomTwo ? room.subTitle.roomTwo[language] : undefined,
            } : undefined, description: room.description[language], maxGuests: room.maxGuests, roomQTY: room.roomQTY, size: room.size, 
            // features: room.features.map((feature) => feature.name[language]),
            // services: room.services.map((service) => service.name[language]),
            // services: room.services.map((service) => ({
            //   name: service.name ? service.name[language] || service.name.en : "Service name unavailable",
            //   image: service.image || "Default service image path",
            // })),
            images: room.images, priceOptions: room.priceOptions.map((priceOption) => ({
                price: priceOption.price,
                // currency: priceOption.currency[language], // Localize the currency here
                // taxesAndCharges: priceOption.taxesAndCharges,
                // breakfast: priceOption.breakfast[language],
                // cancellation: priceOption.cancellation[language],
                // prepayment: priceOption.prepayment[language],
                // refundable: priceOption.refundable,
            })) })));
        return localizedRooms;
    }
    catch (err) {
        // console.error('Error in findAllRoomsFromDb:', err);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to retrieve the room.${err.message} `);
    }
});
const findPromotionFromDb = (language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regularRooms = yield room_model_1.RoomModel.find({ tags: 'promotion', isDeleted: false }).lean();
        if (!regularRooms.length) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `No promotion Room available now `);
        }
        // Map over each room and construct a new object with the desired structure
        const localizedRooms = regularRooms.map((room) => (Object.assign(Object.assign({}, room), { id: room._id, title: room.title[language], subTitle: room.subTitle ? {
                roomOne: room.subTitle.roomOne[language],
                roomTwo: room.subTitle.roomTwo ? room.subTitle.roomTwo[language] : undefined,
            } : undefined, description: room.description[language], maxGuests: room.maxGuests, roomQTY: room.roomQTY, size: room.size, 
            // features: room.features.map((feature) => feature.name[language]),
            // services: room.services.map((service) => service.name[language]),
            // services: room.services.map((service) => ({
            //   name: service.name ? service.name[language] || service.name.en : "Service name unavailable",
            //   image: service.image || "Default service image path",
            // })),
            images: room.images, priceOptions: room.priceOptions.map((priceOption) => ({
                price: priceOption.price,
                // currency: priceOption?.currency[language], // Localize the currency here
                // taxesAndCharges: priceOption.taxesAndCharges,
                // breakfast: priceOption.breakfast[language],
                // cancellation: priceOption.cancellation[language],
                // prepayment: priceOption.prepayment[language],
                // refundable: priceOption.refundable,
            })) })));
        return localizedRooms;
    }
    catch (err) {
        // console.error('Error in findAllRoomsFromDb:', err);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to retrieve the room.${err.message} `);
    }
});
const findSingleRoomFromDb = (roomId, language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield room_model_1.RoomModel.findById(roomId).lean();
        if (!room) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
        }
        const localizedRooms = Object.assign(Object.assign({}, room), { id: room._id, title: room.title[language], subTitle: room.subTitle ? {
                roomOne: room.subTitle.roomOne[language],
                roomTwo: room.subTitle.roomTwo ? room.subTitle.roomTwo[language] : undefined,
            } : undefined, description: room.description[language], maxGuests: room.maxGuests, roomQTY: room.roomQTY, size: room.size, 
            // features: room.features.map((feature) => feature[language]),
            // services: room.services.map((service) => service.name[language]),
            // services: room.services.map((service) => ({
            //   name: service.name ? service.name[language] || service.name.en : "Service name unavailable",
            //   image: service.image || "Default service image path",
            // })),
            images: room.images, priceOptions: room.priceOptions.map((priceOption) => ({
                price: priceOption.price,
                // currency: priceOption.currency[language], // Localize the currency here
                // taxesAndCharges: priceOption.taxesAndCharges,
                // breakfast: priceOption.breakfast[language],
                // cancellation: priceOption.cancellation[language],
                // prepayment: priceOption.prepayment[language],
                // refundable: priceOption.refundable,
            })) });
        return localizedRooms;
    }
    catch (err) {
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to retrieve the room.${err.message} `);
    }
});
const findSingleRoomForUpdate = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield room_model_1.RoomModel.findById(roomId).lean();
        if (!room) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
        }
        return room;
    }
    catch (err) {
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to retrieve the room.${err.message} `);
    }
});
const updateRoomById = (roomId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if the room exists
        const existingRoom = yield room_model_1.RoomModel.findById(roomId).session(session);
        if (!existingRoom) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
        }
        // Update the room
        const updatedRoom = yield room_model_1.RoomModel.findByIdAndUpdate(roomId, { $set: updateData }, { new: true, session: session } // 'new: true' returns the updated document
        );
        yield session.commitTransaction();
        yield session.endSession();
        return updatedRoom;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update the room.');
    }
});
const deleteRoomById = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if the room exists
        const existingRoom = yield room_model_1.RoomModel.findById(roomId).session(session);
        if (!existingRoom) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
        }
        // Soft delete the room by updating isDeleted and isActive
        const updatedRoom = yield room_model_1.RoomModel.findByIdAndUpdate(roomId, { isDeleted: true, isActive: false }, { new: true, session: session });
        yield session.commitTransaction();
        yield session.endSession();
        return updatedRoom; // Return the updated room for confirmation
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to delete the room.');
    }
});
const reactivateRoomById = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if the room exists and is currently soft deleted
        const existingRoom = yield room_model_1.RoomModel.findOne({ _id: roomId, isDeleted: true }).session(session);
        if (!existingRoom) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found or not active');
        }
        // Reactivate the room by updating isDeleted and isActive
        const updatedRoom = yield room_model_1.RoomModel.findByIdAndUpdate(roomId, { isDeleted: false, isActive: true }, { new: true, session: session });
        yield session.commitTransaction();
        yield session.endSession();
        return updatedRoom; // Return the updated room for confirmation
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to reactivate the room.');
    }
});
// delete permannet room 
const deleteRoomPermanently = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if the room exists
        const existingRoom = yield room_model_1.RoomModel.findById(roomId).session(session);
        if (!existingRoom) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
        }
        // Permanently delete the room
        yield room_model_1.RoomModel.findByIdAndDelete(roomId).session(session);
        yield session.commitTransaction();
        yield session.endSession();
        return { message: 'Room deleted permanently' };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to delete the room permanently.');
    }
});
// const searchService = async (
//   categoryId: string,
//   // maxGuests: MaxGuestsType,
//   sortOrder: SortOrder = 'asc',
//   language: LanguageKey,
//   //   checkInDate: Date,
//   //   checkOutDate: Date,
// ) => {
//   const queryConditions = [];
//   if (categoryId) {
//     queryConditions.push({ type: new mongoose.Types.ObjectId(categoryId) });
//   }
//   // if (maxGuests) {
//   //   queryConditions.push({ maxGuests: { $gte: maxGuests } });
//   // }
//   const query = queryConditions.length > 0 ? { $or: queryConditions } : {};
//   const rooms = await RoomModel.find(query)
//     .sort({ 'priceOptions.price': sortOrder === 'asc' ? 1 : -1 })
//     .lean()
//     .exec();
//   const localizedRooms = rooms.map((room) => ({
//     id: room._id,
//     title: room.title[language],
//     description: room.description[language],
//     maxGuests: room.maxGuests,
//     roomQTY: room.roomQTY,
//     size: room.size[language],
//     features: room.features.map((feature) => feature[language]),
//     images: room.images,
//     priceOptions: room.priceOptions.map((priceOption) => ({
//       price: priceOption.price,
//       currency: priceOption.currency[language], // Localize the currency here
//       taxesAndCharges: priceOption.taxesAndCharges,
//       breakfast: priceOption.breakfast[language],
//       cancellation: priceOption.cancellation[language],
//       prepayment: priceOption.prepayment[language],
//       refundable: priceOption.refundable,
//     })),
//     type: room.type, // Assuming this is already in the desired format
//   }));
//   return localizedRooms;
//   // return rooms;
// };
const checkAllRoomAvailability = (checkInDateStr, checkOutDateStr, sortOrder, language, maxGuests, sizeOrder // Added this parameter
// categoryId: string
) => __awaiter(void 0, void 0, void 0, function* () {
    // Build a condition object for category
    //  const categoryCondition = categoryId ? { type: new mongoose.Types.ObjectId(categoryId) } : {};
    const availableRooms = yield room_model_1.RoomModel.aggregate([
        {
            $match: { isDeleted: false } // Ensure we only consider rooms that are not deleted
        },
        {
            $lookup: {
                from: 'bookings',
                let: { roomId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$roomId', '$$roomId'] },
                                    {
                                        $or: [
                                            {
                                                $and: [
                                                    { $lte: ['$checkIn', checkInDateStr] },
                                                    { $gt: ['$checkOut', checkInDateStr] },
                                                ],
                                            },
                                            {
                                                $and: [
                                                    { $lt: ['$checkIn', checkOutDateStr] },
                                                    { $gte: ['$checkOut', checkInDateStr] },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                    { $group: { _id: '$roomId', bookingCount: { $sum: 1 } } },
                ],
                as: 'bookings',
            },
        },
        {
            $project: {
                // title: 1,
                // roomQTY: 1,
                _id: 1,
                bookings: 1,
                maxGuests: 1,
                // type:1,
                availableQty: {
                    $subtract: [
                        '$roomQTY',
                        { $ifNull: [{ $arrayElemAt: ['$bookings.bookingCount', 0] }, 0] },
                    ],
                },
            },
        },
        { $match: { availableQty: { $gt: 0 }, maxGuests: { $gte: maxGuests } } },
    ]);
    // Extract IDs for fetching room details
    const roomIds = availableRooms.map(room => room._id);
    const sortOrderCondition = {};
    if (sortOrder === 'asc' || sortOrder === 'desc') {
        sortOrderCondition['priceOptions.0.price'] = sortOrder === 'asc' ? 1 : -1;
    }
    if (sizeOrder === 'lowToHigh' || sizeOrder === 'highToLow') {
        sortOrderCondition['size'] = sizeOrder === 'lowToHigh' ? 1 : -1;
    }
    const roomsDetails = yield room_model_1.RoomModel
        .find({ _id: { $in: roomIds }, maxGuests: { $gte: maxGuests }, isDeleted: false })
        .sort(sortOrderCondition)
        .lean();
    // Step 2: Retrieve full room details for the available rooms
    // const roomsDetails = await RoomModel.find({ _id: { $in: roomIds },maxGuests: { $gte: maxGuests }}).sort({'size.en': sizeOrder === 'lowToHigh' ? 1 : -1, 'priceOptions.0.price': sortOrder === 'asc' ? 1 : -1 }).lean();
    // Step 3: Combine the available quantities with localized room details
    const localizedRooms = roomsDetails.map(room => {
        // Find the corresponding availableQty for this room
        const roomAvailability = availableRooms.find(ar => ar._id.equals(room._id));
        const availableQty = roomAvailability ? roomAvailability.availableQty : 0;
        return Object.assign(Object.assign({}, room), { id: room._id, title: room.title[language], description: room.description[language], maxGuests: room.maxGuests, roomQTY: room.roomQTY, availableQty, size: room.size, 
            // features: room.features.map(feature => feature[language]),
            // services: room.services.map((service) => service.name[language]),
            images: room.images, priceOptions: room.priceOptions.map(priceOption => ({
                price: priceOption.price,
                // currency: priceOption.currency[language],
                // taxesAndCharges: priceOption.taxesAndCharges,
                // breakfast: priceOption.breakfast[language],
                // cancellation: priceOption.cancellation[language],
                // prepayment: priceOption.prepayment[language],
                // refundable: priceOption.refundable,
            })) });
    });
    return localizedRooms;
    // return availableRooms;
});
exports.roomService = {
    createRoomInDb,
    findAllRoomsFromDb,
    findSingleRoomFromDb,
    findRegularFromDb,
    findPromotionFromDb,
    updateRoomById,
    deleteRoomById,
    reactivateRoomById,
    findAllRoomsForAdmin,
    deleteRoomPermanently,
    findSingleRoomForUpdate,
    // searchService,
    checkAllRoomAvailability,
};
