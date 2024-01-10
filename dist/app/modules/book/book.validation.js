"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const CreateBook = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        likes: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.BookValidation = {
    CreateBook,
};
