import { mongoose } from "mongoose";
import "dotenv/config";
import { app } from "./src/app.js";

const { PORT, DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => console.log("☑️  Connected to DB"));
db.on("error", (error) => console.log("❌  DB Error", error));

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
