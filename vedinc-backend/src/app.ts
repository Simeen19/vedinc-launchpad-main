import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// all routes go here
app.use("/api", routes);
app.use(errorHandler);


export default app;
