import { Router } from "express";

const done = Router();
done.get("/", (req, res) => {
  const { quiz } = req.session;
  if (!quiz) {
    res.redirect("/error");
    return;
  }
  //mark questions
  quiz.questions = quiz.questions.map((x) => ({
    ...x,
    correct: x.answers.every(({ selected, correct }) => selected === correct),
  }));
  res.render("done", { quiz });
});

export default done;
