"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
// import { TBooking } from './booking.interface';
// import { RoomModel } from '../room/room.model';
// const mongoose = require('mongoose');
// Define the GuestData Schema
const GuestDataSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, },
    city: { type: String, },
    arrivalTime: { type: String, },
    message: { type: String, },
    // Add other guest fields here
});
// Define the BookingData Schema
const BookingDataSchema = new mongoose_1.default.Schema({
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guestData: { type: GuestDataSchema, required: true },
    numberOfGuests: { type: Number, required: true },
    paymentType: { type: String, required: true },
    roomId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'Room' },
    userId: { type: String, required: true }, // Assuming the userId could be a string like an email
    bookingNumber: { type: String, required: true, unique: true },
    bookingStatus: {
        type: String,
        enum: ['Booked', 'Cancelled', 'Completed'],
        default: 'Booked'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    }
    // Add other booking fields here
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});
// Create the model from the schema and export it
exports.BookingModel = mongoose_1.default.model('Booking', BookingDataSchema);
