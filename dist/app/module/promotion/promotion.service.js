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
exports.PromotionRoomService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const promotion_model_1 = require("./promotion.model");
const AppError_1 = __importDefault(require("../../Error/errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createPromotion = (promotionData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let newRoom;
    try {
        session.startTransaction();
        // Check if a room with the same name already exists
        const existingRoom = yield promotion_model_1.promotionModel.findOne({ roomName: promotionData.roomName }).session(session);
        if (existingRoom) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room with this name already exists');
        }
        // If no existing room, proceed to create a new room
        newRoom = new promotion_model_1.promotionModel(promotionData);
        yield newRoom.save({ session });
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        // console.error('Error in createRoomInDb:', err);
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create promotion room due to an unexpected error. Try again with valid room type. ${error.message}  `);
    }
    finally {
        session.endSession();
    }
    return newRoom;
});
const getAllPromotionRooms = (language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all rooms. Assuming 'lean' is used for better performance.
        const rooms = yield promotion_model_1.promotionModel.find().lean();
        // Check if there are any rooms available
        if (!rooms || rooms.length === 0) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No rooms available');
        }
        // Translate all relevant fields based on the selected language.
        const translatedRooms = rooms.map(room => (Object.assign(Object.assign({}, room), { roomName: room.roomName[language] || room.roomName.en, roomImage: room.roomImage, price: room.price, priceHistory: room.priceHistory, saleTag: room.saleTag[language] || room.saleTag.en, numberOfGuests: room.numberOfGuests, breakfastAvailable: room.breakfastAvailable[language] || room.breakfastAvailable.en, description: room.description[language] || room.description.en, fullDetails: room.fullDetails[language] || room.fullDetails.en, quantity: room.quantity // Assuming this is just a number, no translation needed
         })));
        return translatedRooms;
    }
    catch (error) {
        // Handle specific known error types (e.g., database errors, no data found, etc.)
        if (error instanceof AppError_1.default) {
            throw error;
        }
        // For other unknown or unexpected errors
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to fetch rooms due to an unexpected error ${error.message} `);
    }
});
const singlePromoRoom = (roomId, language) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield promotion_model_1.promotionModel.findById(roomId).lean();
        if (!room) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
        }
        // Translate all relevant fields based on the selected language
        const translatedRoom = Object.assign(Object.assign({}, room), { roomName: room.roomName[language] || room.roomName.en, roomImage: room.roomImage, price: room.price, priceHistory: room.priceHistory, saleTag: room.saleTag[language] || room.saleTag.en, numberOfGuests: room.numberOfGuests, breakfastAvailable: room.breakfastAvailable[language] || room.breakfastAvailable.en, description: room.description[language] || room.description.en, fullDetails: room.fullDetails[language] || room.fullDetails.en, quantity: room.quantity // Assuming this is just a number, no translation needed
         });
        return translatedRoom;
    }
    catch (err) {
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to retrieve the room. ${err.message} `);
    }
});
exports.PromotionRoomService = {
    createPromotion,
    getAllPromotionRooms,
    singlePromoRoom
};
