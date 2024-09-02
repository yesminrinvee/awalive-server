import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { PromotionRoomService } from './promotion.service';
import AppError from '../../Error/errors/AppError';
import httpStatus from 'http-status';


const createPromotionRoom = catchAsync(async (req: Request, res: Response) => {
  //saving to db
  const result = await PromotionRoomService.createPromotion(req.body);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'room not created',
      data: res,
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'room is created successfully',
      data: result,
    });
  }
});


const findAllPromotionRooms = catchAsync(async (req: Request, res: Response) => {
    const language = req.query.lang as string || 'en';

  const result = await PromotionRoomService.getAllPromotionRooms(language);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'rooms not found',
      data: res,
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'room is retrieved successfully',
      data: result,
    });
  }
});


const singlePromotionRoom = catchAsync(async (req: Request, res: Response) => {
  const language = req.query.lang as string || 'en'; // Defaulting language to 'en' if not specified
  const {roomId} = req.params; // Assuming you're passing the room ID as a URL parameter

  const room = await PromotionRoomService.singlePromoRoom(roomId, language);

  if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room not found'); // Using AppError for consistent error handling
  }

  res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Room retrieved successfully',
      data: { room },
  });
});

export const PromotionRoomController = {
  createPromotionRoom,
  findAllPromotionRooms,
  singlePromotionRoom
};
