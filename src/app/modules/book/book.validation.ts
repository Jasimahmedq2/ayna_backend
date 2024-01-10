import { z } from "zod";

const CreateBook = z.object({
  body: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    likes: z.array(z.string()).optional(),
  }),
});

export const BookValidation = {
  CreateBook,
};
