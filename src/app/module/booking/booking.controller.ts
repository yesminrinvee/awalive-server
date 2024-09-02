import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { bookingService } from './booking.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../Error/errors/AppError';

const bookingRoom = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const bookingData = req.body;
  //  console.log(req.user);
  const result = await bookingService.createBooking(bookingData);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'OPPS Room not booked');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booked successfully',
      data: result,
    });
  }
});

const getSingleBookedRoomController = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const {id} = req.params;
  //  console.log(id);
  const bookedRoom = await bookingService.getBookingById(id);

  if (!bookedRoom) {
    throw new AppError(httpStatus.NOT_FOUND, 'Oops, room not booked or booking not found');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booking retrieved successfully',
      data: bookedRoom, // Return the booking data
    });
  }
});

const postSingleBookedRoomCancel = catchAsync(async (req: Request, res: Response) => {
  // const languageParam = req.query.lang;
  // const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar')) 
  //                  ? languageParam 
  //                  : 'en';
  // console.log(req.body);
  const {id} = req.params;
  //  console.log(id);
  const bookedRoom = await bookingService.cancelBookingById(id);

  if (!bookedRoom) {
    throw new AppError(httpStatus.NOT_FOUND, 'Oops, room not booked or booking not found');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booking retrieved successfully',
      data: bookedRoom, // Return the booking data
    });
  }
});

// payment 

const postSingleBookingPayment = catchAsync(async (req: Request, res: Response) => {
  // const languageParam = req.query.lang;
  // const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar')) 
  //                  ? languageParam 
  //                  : 'en';
  // console.log(req.body);
  const {id} = req.params;
   console.log(id);
  const bookedRoom = await bookingService.PaymentUpdateById(id);

  if (!bookedRoom) {
    throw new AppError(httpStatus.NOT_FOUND, 'Oops, room not booked or booking not found');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booking retrieved successfully',
      data: bookedRoom, // Return the booking data
    });
  }
});

const getAllNewBookingRooms = catchAsync(async (req: Request, res: Response) => {
  const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar')) 
                     ? languageParam 
                     : 'en';
  // console.log(req.body);
  // const bookingData = req.body;
  //  console.log(req.user);
  const result = await bookingService.getNewBookings(language);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'OPPS No Room booked');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booked found successfully',
      data: result,
    });
  }
});

const getAllBookingRooms = catchAsync(async (req: Request, res: Response) => {
  const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar')) 
                     ? languageParam 
                     : 'en';
  // console.log(req.body);
  // const bookingData = req.body;
  //  console.log(req.user);
  const result = await bookingService.getAllBookings(language);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'OPPS No Room booked');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booked found successfully',
      data: result,
    });
  }
});

const getSingleBookedRoom = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.params.userEmail;
  // const currentLanguage = req.headers['accept-language'];
  //  console.log(req.user);
  const languageParam = req.query.lang;
    const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar')) 
                     ? languageParam 
                     : 'en';
  const result = await bookingService.getBookingsByEmail(userEmail, language );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'OPPS No Room found');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booked found successfully',
      data: result,
    });
  }
});

// delete booking by id 
const deleteBookingController  = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const result = await bookingService.deleteBookingById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booked found successfully',
      data: result,
    });
  
});

const invoice = catchAsync(async (req: Request, res: Response) => {
  const languageParam = req.query.lang;
  const language = (typeof languageParam === 'string' && (languageParam === 'en' || languageParam === 'ar')) 
                   ? languageParam 
                   : 'en';
  // console.log(req.body);
  const {id} = req.params;
   console.log(id);
  const bookedRoom = await bookingService.getInvoice(id, language);

  if (!bookedRoom) {
    throw new AppError(httpStatus.NOT_FOUND, 'Oops, room not booked or booking not found');
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room booking retrieved successfully',
      data: bookedRoom, // Return the booking data
    });
  }
});


export const createBookingController = {
  bookingRoom,
  getSingleBookedRoomController,
  getAllBookingRooms,
  getAllNewBookingRooms,
  postSingleBookedRoomCancel,
  postSingleBookingPayment,
  deleteBookingController,
  invoice,
  getSingleBookedRoom

};
