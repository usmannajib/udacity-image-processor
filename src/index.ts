import express from "express";
import router from "./routes";

const app = express();
const port = 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listenting at http://localhost:${port}`);
});
