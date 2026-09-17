import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { router } from "./graph/router.js";



dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use("/",router)
app.get("/", (req, res) => {
    res.json({ message: "hello from agent" })
})



app.listen(port, () => {
    console.log(`chat started at ${port}`);
    connectDB()
});