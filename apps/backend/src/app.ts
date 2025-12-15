import express, { Request, Response } from "express";
import cors from "cors"

import { TopicService } from "./application/services/topic.service.js";
import { InMemoryTopicRepository } from "./infrastructure/repositories/in-memory-topic.repository.js";
import { MongoTopicRepository } from "./infrastructure/repositories/mongo-topic.repository.js";
import { TopicController } from "./presentation/controllers/topic.controller.js";

const app = express();
app.use(express.json());

//cors
//cors

app.use(
  cors({
    origin: true, // or http://localhost:5500
    credentials: false, // stateless; no cookies/credentials
  })
)


// wiring
const topicRepository = new MongoTopicRepository();
const topicService = new TopicService(topicRepository);
const topicController = new TopicController(topicService);

// identity via headers middleware (stateless)
app.use((req, res, next) => {
  const userId = req.header("x-user-id");
  const username = req.header("x-username");
  // For non-protected routes like GET /topics we allow missing headers
  const isProtected = req.method !== 'GET' || req.path.startsWith('/session');
  if (isProtected && (!userId || !username)) {
    return res.status(400).json({ message: "Missing identity headers: x-user-id, x-username" });
  }
  next();
})


// routes
app.post("/api/topics", (req, res) => topicController.createTopic(req, res));
app.get("/api/topics", (req, res) => topicController.getAllTopics(req, res));
app.post("/api/topics/:id/vote", (req, res) => topicController.vote(req, res));
app.delete("/api/topics/:id", (req, res) => topicController.deleteTopic(req, res));
export default app;
