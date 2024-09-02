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
exports.PromotionRoomController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const promotion_service_1 = require("./promotion.service");
const AppError_1 = __importDefault(require("../../Error/errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createPromotionRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //saving to db
    const result = yield promotion_service_1.PromotionRoomService.createPromotion(req.body);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'room not created',
            data: res,
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: 'room is created successfully',
            data: result,
        });
    }
}));
const findAllPromotionRooms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.query.lang || 'en';
    const result = yield promotion_service_1.PromotionRoomService.getAllPromotionRooms(language);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'rooms not found',
            data: res,
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: 'room is retrieved successfully',
            data: result,
        });
    }
}));
const singlePromotionRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.query.lang || 'en'; // Defaulting language to 'en' if not specified
    const { roomId } = req.params; // Assuming you're passing the room ID as a URL parameter
    const room = yield promotion_service_1.PromotionRoomService.singlePromoRoom(roomId, language);
    if (!room) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found'); // Using AppError for consistent error handling
    }
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Room retrieved successfully',
        data: { room },
    });
}));
exports.PromotionRoomController = {
    createPromotionRoom,
    findAllPromotionRooms,
    singlePromotionRoom
};
