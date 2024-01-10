import { Types } from "mongoose";

export type IBook = {
  name: string;
  title: string;
  author: Types.ObjectId;
  likes?: Types.ObjectId[];
};
