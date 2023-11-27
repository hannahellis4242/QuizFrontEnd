import { z } from "zod";
import { AnswerSchema } from "./Answer";

export const QuestionSchema = z.object({
  text: z.string().min(1),
  answers: z.array(AnswerSchema),
});

type Question = z.infer<typeof QuestionSchema>;
export default Question;
