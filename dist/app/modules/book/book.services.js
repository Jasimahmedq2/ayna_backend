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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const book_model_1 = require("./book.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(payload);
    return result;
});
const retrieveAllBooks = (page, pageSize, sortBy) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({})
        .sort(sortBy)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
    return result;
});
const retrieveAuthorBooks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({ author: userId });
    return result;
});
const retrieveSingleBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(bookId);
    return result;
});
const deleteABook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndDelete(bookId);
    return result;
});
const updateABook = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: bookId }, payload, {
        new: true,
    });
    return result;
});
const likeAndUnlikeABook = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new apiError_1.default(400, "book doesn't exist");
    }
    const isUserLiked = (_a = book === null || book === void 0 ? void 0 : book.likes) === null || _a === void 0 ? void 0 : _a.includes(userId);
    let updatedBook;
    if (isUserLiked) {
        // If user liked the book, remove the like
        updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, { $pull: { likes: userId } }, { new: true });
    }
    else {
        // If user hasn't liked the book, add the like
        updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, { $addToSet: { likes: userId } }, { new: true });
    }
    return (_b = book === null || book === void 0 ? void 0 : book.likes) === null || _b === void 0 ? void 0 : _b.length;
});
exports.BookServices = {
    createBook,
    retrieveAllBooks,
    retrieveAuthorBooks,
    retrieveSingleBook,
    deleteABook,
    updateABook,
    likeAndUnlikeABook,
};
