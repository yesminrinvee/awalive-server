import { z } from 'zod';

// Define Zod Schema based on TTable interface
const TableZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .max(100, { message: 'Email must be 100 characters or less' }),
    phone: z
      .string()
      .min(9, { message: 'Phone Number must be at least 9 characters' }),
    message: z.string().optional(),
    bookingDate: z.string(),
    time: z.string(),
    guest: z.number(),
    restaurantName: z.string(),
    createBookDate: z.date().optional(),
  }),
});

export default TableZodSchema;
