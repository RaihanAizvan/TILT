import app from "./app.js";
import { connectMongo } from "./infrastructure/database/mongo.js";

const PORT = Number(process.env.PORT || 3000);

async function startServer(): Promise<void> {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (err:any) {
    console.log("failed to start mongo server", err.message)
    process.exit(1)
  }
}


startServer();