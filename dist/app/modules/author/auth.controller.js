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
exports.AuthUserControllers = void 0;
const auth_services_1 = require("./auth.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_services_1.AuthUserServices.createUser(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully created a user",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const LogIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_services_1.AuthUserServices.LogIn(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully logged in a user",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const retrieveAuthorsWithBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_services_1.AuthUserServices.retrieveAuthorsWithBooks();
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully retrieve all authors with books",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const retrieveSingleAuthorWithBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield auth_services_1.AuthUserServices.retrieveSingleAuthorWithBooks(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully retrieve all authors with books",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const retrieveAuthorInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    try {
        const result = yield auth_services_1.AuthUserServices.retrieveAuthorInfo(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully retrieve all authors with books",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthUserControllers = {
    createUser,
    LogIn,
    retrieveAuthorsWithBooks,
    retrieveSingleAuthorWithBooks,
    retrieveAuthorInfo,
};
