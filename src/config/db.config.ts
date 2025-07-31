import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not found.')
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo DB is connected.')
    } catch (error) {
        if (error instanceof mongoose.Error) {
            console.log('Error while configuring with database.', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        process.exit(1)
    }
}

export default connectToDatabase
