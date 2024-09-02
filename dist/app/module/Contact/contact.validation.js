"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define Zod Schema
const MessageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }).max(100, "Email must be 100 characters or less"),
        message: zod_1.z.string().min(1, "Message is required"),
        senderDate: zod_1.z.date().optional(),
    })
});
exports.default = MessageZodSchema;
