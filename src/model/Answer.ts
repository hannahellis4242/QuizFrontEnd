import { z } from "zod";

export const AnswerSchema = z.object({
  text: z.string().min(1),
  correct: z.boolean(),
  selected: z.boolean().optional(),
});

type Answer = z.infer<typeof AnswerSchema>;
export default Answer;
