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

const parseInputs = (inputs: string | object): Set<number> => {
  if (typeof inputs === "string") {
    return new Set([parseInt(inputs)]);
  }
  return new Set(
    Object.entries(inputs)
      .map(([_, v]) => v)
      .map((x) => parseInt(x))
  );
};

quiz.post("/:num", (req, res) => {
  const { quiz } = req.session;
  if (!quiz) {
    res.redirect("/error");
    return;
  }
  const current = parseInt(req.params.num);
  //collect selected here and update quiz
  const selectedSet = parseInputs(req.body.inputs);
  const currentQuestion = quiz.questions[current];
  currentQuestion.answers = currentQuestion.answers.map((x, index) => ({
    ...x,
    selected: selectedSet.has(index),
  }));
  const next = current + 1;
  if (next === quiz.questions.length) {
    res.redirect("/done");
    return;
  }
  res.redirect(`/quiz/${next}`);
});
export default quiz;
