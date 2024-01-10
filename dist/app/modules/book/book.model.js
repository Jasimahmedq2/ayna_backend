"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "user" }],
});
exports.Book = (0, mongoose_1.model)("book", BookSchema);
