import mongoose from "mongoose";
import logger from "./logger";
mongoose.set('strictQuery', true);
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://0.0.0.0:27017/nodejs-express-auth";

export async function connect_to_database() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        logger.info("Connected to Database");
    } catch (error) {
        logger.error(`Error while connecting to DB ${error}`);
        process.exit(1);
    }

}

export async function disconnect_from_database() {
    try {
        await mongoose.connection.close();
    } catch (error) {
        logger.error(`Error occured while disconnecting to DB ${error}`);
        
    }
};

