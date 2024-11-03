import express from 'express';
import cors from 'cors';
import dataRouter from './routes/dataRoutes.js'
import paymentRouter from './routes/paymentRoutes.js';

const app = express()
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())

app.use(dataRouter)
app.use(paymentRouter)

app.listen(PORT, () => {
    console.log("Server listening...")
})

