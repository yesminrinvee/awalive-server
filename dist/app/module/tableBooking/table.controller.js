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
exports.TableBookingController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const table_service_1 = require("./table.service");
const createTableBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //saving to db
    const result = yield table_service_1.tableBookingService.createTableBooking(req.body);
    if (!result) {
        return res
            .status(404)
            .json({
            success: false,
            message: 'Booking failed Please try again !',
            data: res
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: 'Request send successfully',
            data: result,
        });
    }
}));
exports.TableBookingController = {
    createTableBookingController
};
