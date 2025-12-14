import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async (): Promise<void> => {
    try {
        const MONGO_URLURL = process.env.MONGO_URL
        if (!MONGO_URLURL) {
            throw new Error('MONGO_URL is not defined on the environmenr variables.')
        }
        await mongoose.connect(MONGO_URLURL)
        console.log('Mongo Connected SuccessFully !')
    } catch (error) {
        console.error('Error for Connecting Mongo :', error)
    }
}

export default connectDB