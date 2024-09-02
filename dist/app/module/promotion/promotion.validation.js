"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const PromotionRoomSchema = zod_1.z.object({
    "body": zod_1.z.object({
        roomName: zod_1.z.object({
            en: zod_1.z.string(),
            ar: zod_1.z.string(),
        }),
        roomImage: zod_1.z.string().url(),
        price: zod_1.z.number(),
        priceHistory: zod_1.z.number().optional(),
        saleTag: zod_1.z.object({
            en: zod_1.z.string(),
            ar: zod_1.z.string(),
        }),
        numberOfGuests: zod_1.z.array(zod_1.z.number()),
        breakfastAvailable: zod_1.z.object({
            en: zod_1.z.string(),
            ar: zod_1.z.string(),
        }),
        description: zod_1.z.object({
            en: zod_1.z.string(),
            ar: zod_1.z.string(),
        }),
        fullDetails: zod_1.z.object({
            en: zod_1.z.string(),
            ar: zod_1.z.string(),
        }),
        quantity: zod_1.z.number(),
    })
});
// Export the schema if you're using modules
exports.default = PromotionRoomSchema;
