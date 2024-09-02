
import { z } from 'zod';

const LocalizedStringValidationSchema = z.object({
  en: z.string({ required_error: 'English text is required' }),
  ar: z.string({ required_error: 'Arabic text is required' }),
  // icon: z.string({ required_error: 'icon is required' }).optional(),
});

const PriceOptionValidationSchema = z.object({
  price: z.number({ required_error: 'Price is required' }),
  currency: LocalizedStringValidationSchema.optional(),
  taxesAndCharges: z.string({ required_error: 'Taxes and charges are required' }).optional(),
  breakfast: LocalizedStringValidationSchema.optional(),
  cancellation: LocalizedStringValidationSchema.optional(),
  prepayment: LocalizedStringValidationSchema.optional(),
  refundable: z.boolean({ required_error: 'Refundable status is required' }).optional(),
});

const SubTitleValidationSchema = z.object({
  roomOne: LocalizedStringValidationSchema,
  roomTwo: LocalizedStringValidationSchema.optional(),
});

// const RoomServiceSchema = z.object({
//   name: LocalizedStringValidationSchema,
//   image: z.string(),
// });

// const RoomTag = z.string({ required_error: 'Room Type Tag is required' });
// const RoomTag = z.enum(["regular", "promotion"]);

const RoomValidationSchema = z.object({
  body: z.object({
    title: LocalizedStringValidationSchema,
    subTitle: SubTitleValidationSchema,
    // type: z.string({ required_error: 'Room category is required' }),
    description: LocalizedStringValidationSchema,
    maxGuests: z.number({ required_error: 'Maximum number of guests is required' }),
    roomQTY: z.number({ required_error: 'Room quantity is required' }),
    size: z.number({ required_error: 'Size is required' }),
    // features: z.array(LocalizedStringValidationSchema),
    // services: z.array(RoomServiceSchema),
    images: z.array(z.string({ required_error: 'At least one image URL must be specified' })),
    priceOptions: z.array(PriceOptionValidationSchema).nonempty({ message: 'At least one price option is required' }),
    // tags: z.array(RoomTag).nonempty("At least one tag is required"),
    tags: z.string({ required_error: 'Room Type Tag is required' }),
    priceHistory: z.number().optional(),
  }),
});

export default RoomValidationSchema;

