import mongoose from "mongoose"
import { MONGO_URI } from "../constants/env";


const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.log('Could not connected to database', error);
        process.exit(1);
    }
}