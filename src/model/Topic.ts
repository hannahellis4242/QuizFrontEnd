import { z } from "zod";
import { QuestionSchema } from "./Question";

export const TopicSchema = z.object({
  topic: z.string().min(1),
  questions: z.array(QuestionSchema),
});

type Topic = z.infer<typeof TopicSchema>;
export default Topic;
