import { Router } from "express";
import start from "./start";
import TopicList from "../model/TopicsList";
import quiz from "./quiz";

const routes = (list: TopicList) => {
  const router = Router();
  router.use("/", start(list));
  router.use("/quiz", quiz);
  return router;
};
export default routes;
