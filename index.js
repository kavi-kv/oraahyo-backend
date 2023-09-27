import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import xikmadoRoutes from "./routes/xikmado.js"


import QuotesModel from "./Models/QuotesModel.js";
import { quotesWithOutAuther } from "./data/index.js";


/* CONFIGUARIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

/* ROUTES */
app.use("/xikmado", xikmadoRoutes);
// app.use("/oraahyo", oraahyoRoutes);

/* MONGOOSE */

const Port = process.env.PORT || 5009
const dbName = "oraahyo";
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    app.listen(5005 , () => console.log("Server Port is on", Port, " ", dbName));

    /* Add Data Only Once */
    // QuotesModel.insertMany(quotesWithOutAuther);
    
})
.catch((error)=> console.log(`${error} did not connect!`))
