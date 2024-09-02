import { z } from 'zod';

const PromotionRoomSchema = z.object({
 "body": z.object({

     roomName: z.object({
         en: z.string(),
         ar: z.string(),
        }),
        roomImage: z.string().url(),
        price: z.number(),
        priceHistory: z.number().optional(),
  saleTag: z.object({
      en: z.string(),
    ar: z.string(),
  }),
  numberOfGuests: z.array(z.number()),
  breakfastAvailable: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  description: z.object({
      en: z.string(),
      ar: z.string(),
    }),
    fullDetails: z.object({
        en: z.string(),
        ar: z.string(),
    }),
    quantity: z.number(),
})
});

// Export the schema if you're using modules
export default PromotionRoomSchema;
