import { z } from 'zod';

// Define the GuestData Zod schema
const GuestDataZodSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: z.string().optional(),
  city: z.string().optional(),
  arrivalTime: z.string().optional(),
  message: z.string().optional(),
  // Add other guest fields here as needed
});

// Define the BookingData Zod schema
export const BookingDataZodSchema = z.object({
  body: z.object({
    checkIn: z.string().min(1, { message: "Check-in date is required" }), // You may want to add more specific validation for dates
  checkOut: z.string().min(1, { message: "Check-out date is required" }), // Ditto for check-out date
  guestData: GuestDataZodSchema,
  numberOfGuests: z.number().min(1, { message: "At least one guest is required" }),
  paymentType: z.enum(['Payment on Arrival', 'Booking Request']),
  roomId: z.string().min(1, { message: "Room ID is required" }), // If you're expecting an ObjectId, make sure the format matches MongoDB's ObjectIds
  userId: z.string().min(1, { message: "User ID is required" }), // Adjust validation as needed, especially if integrating with an auth system
  bookingStatus: z.enum(['Booked', 'Cancelled', 'Completed']).optional(),
  paymentStatus: z.enum(['Pending', 'Paid']).optional(),
  })
  // Add other booking fields here as needed
});
