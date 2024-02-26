import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected to mongoDB');
    }
    catch (error) {
        console.log(error);
    }
};
