import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const BookSchema = new Schema<IBook>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

export const Book = model<IBook>("book", BookSchema);
