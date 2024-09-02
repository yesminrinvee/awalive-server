import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { contactService } from "./contact.service";



const createMessageController = catchAsync(async(req: Request, res: Response) =>{
   
    //saving to db
    const result = await contactService.createContactMessage(req.body)

    if (!result) {
        return res
        .status(404)
        .json({
            success: false,
            message: 'message  not send',
            data: res
        })
    } else {
        res.status(200).json({
            success: true,
            message: 'Message send successfully',
            data: result,
          });
    }    

})

export const createContactMassageController = {
    createMessageController
}