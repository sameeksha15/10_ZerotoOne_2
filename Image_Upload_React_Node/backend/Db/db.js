import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  try {
    const connectDb = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected with server: ${connectDb.connection.host}`);
  } catch (error) {
    console.log(`Error : ,${error}`);
  }
};

export default connectDatabase;
