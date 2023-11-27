import { Router } from "express";
import start from "./start";

const routes = Router();
routes.use("/", start);
export default routes;
