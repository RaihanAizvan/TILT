import mongoose from "mongoose";

export async function connectMongo() {
  const uri = "mongodb://localhost:27017/tilt"; // later change to env

  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
