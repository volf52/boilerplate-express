import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import express from "express";
import expressPinoLogger from "express-pino-logger";
import mongoose from "mongoose";
import keys from "./config/keys";
import routes from "./routes";
import { logger } from "./utils/logger";

const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logging
app.use(expressPinoLogger({ logger }));

app.use(cookieParser());
app.use(
    cookieSession({
        name: "session",
        keys: [keys.EXPRESS_SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000
    } as CookieSessionInterfaces.CookieSessionOptions)
);

// Routes
app.use("/api/users", routes.UserRoute);

// DB Config
const db = keys.mongoURI as string;

// Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
