"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const promotionRoomSchema = new Schema({
    roomName: {
        en: { type: String, required: true, unique: true },
        ar: { type: String, required: true, unique: true },
    },
    roomImage: { type: String, required: true },
    price: { type: Number, required: true },
    priceHistory: { type: Number, },
    saleTag: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
    },
    numberOfGuests: [{ type: Number }],
    breakfastAvailable: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
    },
    description: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
    },
    fullDetails: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
    },
    quantity: { type: Number, required: true },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});
exports.promotionModel = model('promotion', promotionRoomSchema);
