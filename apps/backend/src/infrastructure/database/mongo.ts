import mongoose from "mongoose";

export async function connectMongo() {
  const uri: string | undefined = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(uri);

  console.log("MongoDB connected");
}
