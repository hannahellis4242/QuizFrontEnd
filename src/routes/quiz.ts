import { Router } from "express";

const quiz = Router();
quiz.get("/:num", (req, res) => {
  const { quiz } = req.session;
  if (!quiz) {
    res.redirect("/error");
    return;
  }
  const index = parseInt(req.params.num);
  const question = quiz.questions.at(index);
  res.render("quiz", { question, index });
});
quiz.post("/:num", (req, res) => {
  const { quiz } = req.session;
  if (!quiz) {
    res.redirect("/error");
    return;
  }
  //collect selected here and update quiz
  const next = parseInt(req.params.num) + 1;
  if (next === quiz.questions.length) {
    res.redirect("/done");
    return;
  }
  res.redirect(`/quiz/${next}`);
});
export default quiz;
