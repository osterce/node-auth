import mongoose from "mongoose";

interface Options{
  dbName: string;
  mongoURL: string;
}

export class MongoDatabase {

  static async connect( options: Options ){

    const { dbName, mongoURL } = options;

    try {
      await mongoose.connect( mongoURL, {
        dbName,
      })
      console.log("Connected to MongoDB");
      return true;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }

  }

}