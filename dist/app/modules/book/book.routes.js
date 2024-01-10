"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_role_1 = require("../../../enums/user.role");
const router = express_1.default.Router();
router.post("/create-book", (0, auth_1.default)(user_role_1.UserRoles.USER), book_controller_1.BookControllers.createBook);
router.get("/", (0, auth_1.default)(user_role_1.UserRoles.USER), book_controller_1.BookControllers.retrieveAllBooks);
router.get("/author-books", (0, auth_1.default)(user_role_1.UserRoles.USER), book_controller_1.BookControllers.retrieveAuthorBooks);
router.get("/:bookId", (0, auth_1.default)(user_role_1.UserRoles.USER), book_controller_1.BookControllers.retrieveSingleBook);
router.put("/like-unlike/:bookId", (0, auth_1.default)(user_role_1.UserRoles.USER), book_controller_1.BookControllers.likeAndUnlikeABook);
router.delete("/:bookId", (0, auth_1.default)(user_role_1.UserRoles.USER), book_controller_1.BookControllers.deleteABook);
router.put("/:bookId", (0, auth_1.default)(user_role_1.UserRoles.USER), book_controller_1.BookControllers.updateABook);
exports.bookRoutes = router;
