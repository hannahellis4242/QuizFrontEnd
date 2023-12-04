import express, { json, urlencoded } from "express";
import { join } from "path";
import morgan from "morgan";
import session from "express-session";
import routes from "./routes/routes";
import Quiz, { QuizSchema } from "./model/Quiz";
import { readFile } from "fs/promises";
import { error } from "console";
import { ZodError } from "zod";

declare module "express-session" {
  interface SessionData {
    quiz?: Quiz;
  }
}

const app = express();
app.use(morgan("combined"));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "..", "views"));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "..", "public")));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

const start = (quiz: Quiz) => {
  app.use("/", routes(quiz));

  const port = 8080;
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

const showErrors = (error: unknown) => {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join("\n");
  }
  if (error instanceof Error) {
    return error.message;
  }
  return `${error}`;
};

readFile(join(__dirname, "..", "questions.json"))
  .then((data) => data.toString())
  .then((str) => JSON.parse(str))
  .then(QuizSchema.parseAsync)
  .then(start)
  .catch((error) => console.error(showErrors(error)));
