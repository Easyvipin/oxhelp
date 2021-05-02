import path from "path";
import express from "express";
import dotenv from "dotenv";
import router from "./Routes/Suppliersoute.js";
import connectDb from "./connectDb.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", router);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

connectDb();

app.listen(process.env.PORT || 5000, function (err) {
  console.log(`Server Started...`);
});
