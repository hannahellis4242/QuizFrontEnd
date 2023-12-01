import { Router } from "express";
import start from "./start";
import TopicList from "../model/TopicsList";
import quiz from "./quiz";
import done from "./done";

const routes = (list: TopicList) => {
  const router = Router();
  router.use("/", start(list));
  router.use("/quiz", quiz);
  router.use("/done", done);
  return router;
};
export default routes;
