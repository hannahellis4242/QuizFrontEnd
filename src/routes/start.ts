import { Router } from "express";
import { MersenneTwister19937 } from "random-js";
import Quiz, { createQuiz } from "../model/Quiz";
import Question from "../model/Question";

const engine = MersenneTwister19937.seed(Date.now());
const createRandomQuiz = createQuiz(engine);

const start = (list: Question[]) => {
  const router = Router();
  router.get("/", (_, res) => res.render("start"));
  router.post("/", (req, res) => {
    req.session.quiz = createRandomQuiz(list)(2);
    res.redirect("/quiz/0");
  });
  return router;
};
export default start;
