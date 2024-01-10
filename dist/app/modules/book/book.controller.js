"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookControllers = void 0;
const book_services_1 = require("./book.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const faker_1 = require("@faker-js/faker");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const bookInfo = {
        name: faker_1.faker.lorem.words(3),
        title: faker_1.faker.lorem.words(10),
        author: user.userId,
    };
    console.log({ bookInfo });
    try {
        const result = yield book_services_1.BookServices.createBook(bookInfo);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "a new book created",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const retrieveAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const sortBy = req.query.sortBy === "likes" ? "likes" : "-likes";
    try {
        const result = yield book_services_1.BookServices.retrieveAllBooks(page, pageSize, sortBy);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully get all books",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const retrieveAuthorBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const result = yield book_services_1.BookServices.retrieveAuthorBooks(user.userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully get all author books",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const retrieveSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const result = yield book_services_1.BookServices.retrieveSingleBook(bookId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully get a singel book",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteABook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const result = yield book_services_1.BookServices.deleteABook(bookId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully delete a book",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateABook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const bookInfo = __rest(req.body, []);
    try {
        const result = yield book_services_1.BookServices.updateABook(bookId, bookInfo);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully update a book",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const likeAndUnlikeABook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const { userId } = req.user;
    try {
        const result = yield book_services_1.BookServices.likeAndUnlikeABook(userId, bookId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "done",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookControllers = {
    createBook,
    retrieveAllBooks,
    retrieveAuthorBooks,
    retrieveSingleBook,
    deleteABook,
    updateABook,
    likeAndUnlikeABook,
};
