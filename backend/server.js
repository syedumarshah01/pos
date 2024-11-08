import express from 'express';
import cors from 'cors';
import dataRouter from './routes/dataRoutes.js'
import paymentRouter from './routes/paymentRoutes.js';
import purchaseRouter from './routes/purchaseHistoryRoutes.js';
import supplierRouter from './routes/supplierRoutes.js';
import purchaseReturnRouter from './routes/purchaseReturnHistoryRoute.js';

const app = express()
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())


app.use(dataRouter)
app.use(paymentRouter)
app.use(purchaseRouter)
app.use(supplierRouter)
app.use(purchaseReturnRouter)

app.listen(PORT, () => {
    console.log("Server listening...")
})

