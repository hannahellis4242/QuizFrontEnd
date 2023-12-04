import { Router } from "express";
import start from "./start";
import quiz from "./quiz";
import done from "./done";
import Quiz from "../model/Quiz";

const routes = (q: Quiz) => {
  const router = Router();
  router.use("/", start(q.questions));
  router.use("/quiz", quiz);
  router.use("/done", done);
  return router;
};
export default routes;
