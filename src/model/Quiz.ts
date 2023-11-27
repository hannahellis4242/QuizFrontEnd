import { Engine, shuffle } from "random-js";
import Question from "./Question";
import TopicList from "./TopicsList";

export default interface Quiz {
  questions: Question[];
}

export const createQuiz =
  (engine: Engine) =>
  (list: TopicList) =>
  (quizTopic: string, size: number): Quiz | undefined => {
    const topic = list.find(({ topic }) => topic === quizTopic);
    if (!topic) {
      return undefined;
    }
    const questions = [...topic.questions];
    shuffle(engine, questions);
    return { questions: questions.slice(0, size) };
  };
