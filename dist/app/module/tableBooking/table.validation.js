"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define Zod Schema based on TTable interface
const TableZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Name is required' }),
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email address' })
            .max(100, { message: 'Email must be 100 characters or less' }),
        phone: zod_1.z
            .string()
            .min(9, { message: 'Phone Number must be at least 9 characters' }),
        message: zod_1.z.string().optional(),
        bookingDate: zod_1.z.string(),
        time: zod_1.z.string(),
        guest: zod_1.z.number(),
        restaurantName: zod_1.z.string(),
        createBookDate: zod_1.z.date().optional(),
    }),
});
exports.default = TableZodSchema;
