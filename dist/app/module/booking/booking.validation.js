"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDataZodSchema = void 0;
const zod_1 = require("zod");
// Define the GuestData Zod schema
const GuestDataZodSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    phone: zod_1.z.string().min(1, { message: "Phone is required" }),
    address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    arrivalTime: zod_1.z.string().optional(),
    message: zod_1.z.string().optional(),
    // Add other guest fields here as needed
});
// Define the BookingData Zod schema
exports.BookingDataZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        checkIn: zod_1.z.string().min(1, { message: "Check-in date is required" }), // You may want to add more specific validation for dates
        checkOut: zod_1.z.string().min(1, { message: "Check-out date is required" }), // Ditto for check-out date
        guestData: GuestDataZodSchema,
        numberOfGuests: zod_1.z.number().min(1, { message: "At least one guest is required" }),
        paymentType: zod_1.z.enum(['Payment on Arrival', 'Booking Request']),
        roomId: zod_1.z.string().min(1, { message: "Room ID is required" }), // If you're expecting an ObjectId, make sure the format matches MongoDB's ObjectIds
        userId: zod_1.z.string().min(1, { message: "User ID is required" }), // Adjust validation as needed, especially if integrating with an auth system
        bookingStatus: zod_1.z.enum(['Booked', 'Cancelled', 'Completed']).optional(),
        paymentStatus: zod_1.z.enum(['Pending', 'Paid']).optional(),
    })
    // Add other booking fields here as needed
});
