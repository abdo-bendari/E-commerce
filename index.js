import express from "express"
import dbConnection from "./database/dbConnection.js"
import { bootstrap } from "./src/modules/bootstrap.js"
import cors from "cors"
import dotenv from "dotenv"
const app = express()
app.use('/uploads',express.static('uploads'))
app.use(cors())
dotenv.config()
const port = process.env.PORT||3000
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))