import express from "express";
import usersRoute from "./routes/user.route.js";

export const app = express();

app.use(express.json());
app.use("/api/v1", usersRoute);
