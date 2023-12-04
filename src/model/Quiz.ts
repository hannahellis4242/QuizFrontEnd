import { Engine, shuffle } from "random-js";
import Question, { QuestionSchema } from "./Question";
import { z } from "zod";

export const QuizSchema = z.object({
  questions: z.array(QuestionSchema, {
    description: "the questions in the quiz",
    required_error: "a list of questions must exist",
    invalid_type_error: "questions must be an array",
  }),
  correct: z.boolean().optional(),
});

type Quiz = z.infer<typeof QuizSchema>;
export default Quiz;

export const createQuiz =
  (engine: Engine) =>
  (questions: Question[]) =>
  (size: number): Quiz => {
    const cp = [...questions];
    shuffle(engine, cp);
    return { questions: cp.slice(0, size) };
  };
