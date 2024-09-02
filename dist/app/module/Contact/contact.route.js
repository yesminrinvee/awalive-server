"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessageRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../midleware/validateRequest");
const contact_validation_1 = __importDefault(require("./contact.validation"));
const contact_controller_1 = require("./contact.controller");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.validateRequest)(contact_validation_1.default), contact_controller_1.createContactMassageController.createMessageController);
// router.get('/', createCategoryController.getCategoryController )
exports.ContactMessageRoute = router;
