"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const LocalizedStringValidationSchema = zod_1.z.object({
    en: zod_1.z.string({ required_error: 'English text is required' }),
    ar: zod_1.z.string({ required_error: 'Arabic text is required' }),
    // icon: z.string({ required_error: 'icon is required' }).optional(),
});
const PriceOptionValidationSchema = zod_1.z.object({
    price: zod_1.z.number({ required_error: 'Price is required' }),
    currency: LocalizedStringValidationSchema.optional(),
    taxesAndCharges: zod_1.z.string({ required_error: 'Taxes and charges are required' }).optional(),
    breakfast: LocalizedStringValidationSchema.optional(),
    cancellation: LocalizedStringValidationSchema.optional(),
    prepayment: LocalizedStringValidationSchema.optional(),
    refundable: zod_1.z.boolean({ required_error: 'Refundable status is required' }).optional(),
});
const SubTitleValidationSchema = zod_1.z.object({
    roomOne: LocalizedStringValidationSchema,
    roomTwo: LocalizedStringValidationSchema.optional(),
});
// const RoomServiceSchema = z.object({
//   name: LocalizedStringValidationSchema,
//   image: z.string(),
// });
// const RoomTag = z.string({ required_error: 'Room Type Tag is required' });
// const RoomTag = z.enum(["regular", "promotion"]);
const RoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: LocalizedStringValidationSchema,
        subTitle: SubTitleValidationSchema,
        // type: z.string({ required_error: 'Room category is required' }),
        description: LocalizedStringValidationSchema,
        maxGuests: zod_1.z.number({ required_error: 'Maximum number of guests is required' }),
        roomQTY: zod_1.z.number({ required_error: 'Room quantity is required' }),
        size: zod_1.z.number({ required_error: 'Size is required' }),
        // features: z.array(LocalizedStringValidationSchema),
        // services: z.array(RoomServiceSchema),
        images: zod_1.z.array(zod_1.z.string({ required_error: 'At least one image URL must be specified' })),
        priceOptions: zod_1.z.array(PriceOptionValidationSchema).nonempty({ message: 'At least one price option is required' }),
        // tags: z.array(RoomTag).nonempty("At least one tag is required"),
        tags: zod_1.z.string({ required_error: 'Room Type Tag is required' }),
        priceHistory: zod_1.z.number().optional(),
    }),
});
exports.default = RoomValidationSchema;
