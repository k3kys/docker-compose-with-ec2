import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import express from "express"
import cookieParser from 'cookie-parser';

import userRouter from "./routes/userRoutes"

const app = express()

app.use(express.json())
app.use(cookieParser());

app.use("/users", userRouter)

app.get("*", (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }