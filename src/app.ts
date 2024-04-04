import express from "express";
import exemple from "./routes/exemple";
import cors from "cors";

const app = express();

app.use(
  cors(),
  express.json({
    limit: "64mb",
  }),
);

// ------------------
// ----- Routes -----
// ------------------

// ---------------------------------
// (1) Subnet
// ---------------------------------
app.use("/exemple", exemple);

export default app;
