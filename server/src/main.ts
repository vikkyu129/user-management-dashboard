import express from 'express';
import { connect_to_database } from './utils/database';
import logger from './utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CORS_ORIGIN } from '../constants';
import helmet from 'helmet';
import userRoute from  './modules/user/user.route';
import authRoute from "./modules/auth/auth.route";
import deserialize_user from './middlewares/deserialize_user';
const PORT = process.env.PORT || 4000;
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN, 
    credentials:true
}));
app.use(helmet());
app.use(deserialize_user);


app.use('/api/users', userRoute);

app.use("/api/auth", authRoute);

const server = app.listen(PORT, async ()=>{
    await connect_to_database();
    logger.info(`Listening on Port ${PORT}`);
});


// const signals  = ["SIGTERM", "SIGINT"];

// function gracefulShutdown(signal: string){
//     process.on(signal,async () => {
//         server.close();
//     });
// };

// for(let i =0; i < signals.length; i++){
//     gracefulShutdown(signals[i]);
//     process.exit(0);    
// };


