import Mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await Mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
