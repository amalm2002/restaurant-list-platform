import express from 'express'
import connectDB from './config/mongo.config'
import 'dotenv/config'
import cors from 'cors'
import router from './routes/route'

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))

connectDB()



app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`server start on : http://localhost:${PORT}`)
})