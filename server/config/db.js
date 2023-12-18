import mongoose from "mongoose";

export default function connectDB() {
  const url = process.env.MONGO_URI;

  try {
    mongoose.connect(url, {});
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => console.log(`Database connected: ${url}`));
  dbConnection.once("error", (error) =>
    console.log(`Connection error: ${error}`)
  );
  return;
}
