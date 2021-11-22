import mongoose from "mongoose";

const Connection = async () => {
  try {
    const URL = `mongodb://user:BharatPk@cluster0-shard-00-00.j6ilb.mongodb.net:27017,cluster0-shard-00-01.j6ilb.mongodb.net:27017,cluster0-shard-00-02.j6ilb.mongodb.net:27017/Vote?ssl=true&replicaSet=atlas-wtx4ie-shard-0&authSource=admin&retryWrites=true&w=majority`;
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with database ", error);
  }
};

export default Connection;
