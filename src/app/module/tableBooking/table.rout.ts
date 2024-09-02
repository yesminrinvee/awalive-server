import express from 'express'
import TableZodSchema from './table.validation'
import { validateRequest } from '../../midleware/validateRequest'
import { TableBookingController } from './table.controller'





const router = express.Router()

router.post('/create', validateRequest( TableZodSchema), TableBookingController.createTableBookingController )
// router.get('/', createCategoryController.getCategoryController )


export const TableBookingRoute = router