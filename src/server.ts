import express from "express";
import getEnv from "./Lib/GetEnv";
import cors from "cors"


const app = express();
const env = getEnv();


app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));

const start_message = `Server is up -> mode: ${env.mode}, port: ${env.port}`;
app.listen(env.port, () => console.log(start_message));