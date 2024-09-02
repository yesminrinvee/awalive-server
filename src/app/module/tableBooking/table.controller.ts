import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { tableBookingService } from "./table.service";



const createTableBookingController = catchAsync(async(req: Request, res: Response) =>{
  
    //saving to db
    const result = await tableBookingService.createTableBooking(req.body)

    if (!result) {
        return res
        .status(404)
        .json({
            success: false,
            message: 'Booking failed Please try again !',
            data: res
        })
    } else {
        res.status(200).json({
            success: true,
            message: 'Request send successfully',
            data: result,
          });
    }    

})

export const TableBookingController = {
    createTableBookingController
}