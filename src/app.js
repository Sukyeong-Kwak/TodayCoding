import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import history from "connect-history-api-fallback";

import { userRouter } from "./routers/user-router.js";
import { todoRouter } from "./routers/todo-router.js";
import { postRouter } from "./routers/post-router.js";
import { dayRouter } from "./routers/day-router.js";
import { allUserDeliverTodo } from "./modules/cron-modules.js";
import cron from "node-cron";

const app = express();

app.use(cors());

// 프론트에서 json 파일을 보내면, req.body에 자동으로 객체 형태로 데이터가 들어가도록 함.
app.use(express.json());
app.use(history());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../front/build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
});

app.use("/api", userRouter);
app.use("/api", todoRouter);
app.use("/api", postRouter);
app.use("/api", dayRouter);

export { app };

const task = cron.schedule(
  "1 0 0 * * *",
  function () {
    allUserDeliverTodo();
  },
  { scheduled: true }
);
