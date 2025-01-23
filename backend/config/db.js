import mongoose from "mongoose";

const connectDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://aqsa:AqsaS2774.@cluster0.d030bn7.mongodb.net/test', {
            // useUnifiedTopology: true, 
        })
        console.log('Successfully connected to MongoDB✅');
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;