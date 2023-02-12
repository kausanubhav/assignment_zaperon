import express from "express"
import { PORT, NODE_ENV } from "./config.js"
import cors from "cors"
import errorHandler from "./middleware/errorMiddleware.js"
import router from "./routes/userRoutes.js"
import connectDB from "./db.js"
import cookies from 'cookie-parser'

const app = express()

connectDB()

app.disable("x-powered-by")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
  
}))
app.use(cookies())


app.get("/", (req, res) => {
  res.json({ message: "Welcome" })
})
app.use("/api/users", router)

app.use(errorHandler)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
