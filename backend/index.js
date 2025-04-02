//import dependencies
import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser'

//import pages/components
import {dbConfig} from './lib/dbConfig.js'
import authroute from './routes/auth.route.js'
import messageroute from './routes/message.route.js'
import { app, server } from './lib/socket.js';


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(bodyParser.json({ limit: '50mb' })); // Increase JSON payload limit
app.use(cookieParser())
app.use(express.json());
app.use('/auth', authroute)
app.use('/message', messageroute)



dotenv.config();
const PORT = process.env.PORT;

server.listen(PORT, ()=> {
    console.log(`running on PORT ${PORT}`);
    dbConfig()
})

