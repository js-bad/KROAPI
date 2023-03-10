import express, { Request, Response } from 'express';
import chatRouter from './routes/chat';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const app = express();
dotenv.config({ path: __dirname+'/../.env'});
connectDB();

app.use(express.json());

if (!fs.existsSync('./logs')){
    fs.mkdirSync('./logs');
}
const reqLogStream = fs.createWriteStream(path.join(__dirname, '../logs', 'requestLogs.log'), { flags: 'a+' });
const requestLogger = morgan('combined', { stream: reqLogStream });
app.use(requestLogger);

app.use('/api/chat', chatRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('success');
});

const port = 3000;
app.listen(port, () => {console.log(`Listening on ${port}`);})