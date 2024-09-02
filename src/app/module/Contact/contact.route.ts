import express from 'express'
import { validateRequest } from '../../midleware/validateRequest'
import MessageZodSchema from './contact.validation'
import { createContactMassageController } from './contact.controller'





const router = express.Router()

router.post('/create', validateRequest(MessageZodSchema), createContactMassageController.createMessageController )
// router.get('/', createCategoryController.getCategoryController )


export const ContactMessageRoute = router