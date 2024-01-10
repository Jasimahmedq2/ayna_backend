"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_role_1 = require("../../../enums/user.role");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchema.CreateUser), auth_controller_1.AuthUserControllers.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidationSchema.logInUser), auth_controller_1.AuthUserControllers.LogIn);
router.get("/authors", (0, auth_1.default)(user_role_1.UserRoles.USER), auth_controller_1.AuthUserControllers.retrieveAuthorsWithBooks);
router.get("/author/me", (0, auth_1.default)(user_role_1.UserRoles.USER), auth_controller_1.AuthUserControllers.retrieveAuthorInfo);
router.get("/author/:userId", (0, auth_1.default)(user_role_1.UserRoles.USER), auth_controller_1.AuthUserControllers.retrieveSingleAuthorWithBooks);
exports.AuthRoutes = router;
