import express, { json, urlencoded } from "express";
import { join } from "path";
import morgan from "morgan";
import session from "express-session";
import routes from "./routes/routes";
import Quiz from "./model/Quiz";
import TopicList from "./model/TopicsList";

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
app.use(session({ secret: "secret", resave: false }));

const topicList: TopicList = [
  {
    topic: "",
    questions: [
      {
        text: "Question 1",
        answers: [
          { text: "true", correct: true },
          { text: "false", correct: false },
        ],
      },
      {
        text: "Question 2",
        answers: [
          { text: "true", correct: false },
          { text: "false", correct: true },
        ],
      },
    ],
  },
];

app.use("/", routes(topicList));

const port = 8080;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
