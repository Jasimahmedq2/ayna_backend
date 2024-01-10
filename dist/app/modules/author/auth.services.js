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
exports.AuthUserServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const jwtHelpers_1 = require("../../../shared/jwtHelpers");
const auth_models_1 = require("./auth.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const book_model_1 = require("../book/book.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const createSecret = yield jwtHelpers_1.JwtHelpers.createToken({ email: payload.email }, config_1.default.jwt.verify_secret, config_1.default.jwt.verify_email_expire);
    const isExistUser = yield auth_models_1.User.findOne({
        email: payload.email,
        phoneNo: payload.phone_no,
    });
    if (isExistUser) {
        throw new apiError_1.default(401, "the user already exist");
    }
    const user = new auth_models_1.User(payload);
    const result = yield user.save();
    return result;
});
const LogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield auth_models_1.User.findOne({ email: payload.email });
    if (!isUserExist) {
        throw new apiError_1.default(404, "user doesn't exist");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(401, "something went wrong");
    }
    const accessToken = yield jwtHelpers_1.JwtHelpers.createToken({
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expire);
    return {
        accessToken,
    };
});
const retrieveAuthorsWithBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const authorsWithBooks = yield auth_models_1.User.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "author",
                as: "books",
            },
        },
    ]);
    return authorsWithBooks;
});
const retrieveSingleAuthorWithBooks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const authorsWithBooks = yield book_model_1.Book.find({ author: userId }).populate("author", "name email phone_no");
    return authorsWithBooks;
});
const retrieveAuthorInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_models_1.User.findById(userId);
    return result;
});
exports.AuthUserServices = {
    createUser,
    LogIn,
    retrieveAuthorsWithBooks,
    retrieveSingleAuthorWithBooks,
    retrieveAuthorInfo,
};
