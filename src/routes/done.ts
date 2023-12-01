import { Router } from "express";

const done = Router();
done.get("/", (req, res) => {
  const { quiz } = req.session;
  if (!quiz) {
    res.redirect("/error");
    return;
  }
  const correct = quiz.questions.filter(({ answers }) =>
    answers.every(({ selected, correct }) => selected === correct)
  ).length;
  res.render("done", { correct, num: quiz.questions.length });
});

export default done;
