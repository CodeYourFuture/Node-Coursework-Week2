import express, { Request, Response } from 'express'
import messages from './routes/messages'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req: Request, res: Response) {
  res.sendFile(__dirname + '/index.html')
})

app.use('/messages', messages)

app.listen(process.env.PORT || 4000, () => console.log(`listening...`))
