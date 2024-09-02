"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const table_validation_1 = __importDefault(require("./table.validation"));
const validateRequest_1 = require("../../midleware/validateRequest");
const table_controller_1 = require("./table.controller");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.validateRequest)(table_validation_1.default), table_controller_1.TableBookingController.createTableBookingController);
// router.get('/', createCategoryController.getCategoryController )
exports.TableBookingRoute = router;
