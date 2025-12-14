import express from "express";

import { TopicService } from "./application/services/topic.service.js";
import { InMemoryTopicRepository } from "./infrastructure/repositories/in-memory-topic.repository.js";
import { TopicController } from "./presentation/controllers/topic.controller.js";

const app = express();
app.use(express.json());

// wiring
const topicRepository = new InMemoryTopicRepository();
const topicService = new TopicService(topicRepository);
const topicController = new TopicController(topicService);

// routes
app.post("/topics", (req, res) => topicController.createTopic(req, res));
app.get("/topics", (req, res) => topicController.getAllTopics(req, res));
app.post("/topics/:id/vote", (req, res) => topicController.vote(req, res));
app.delete("/topic/:id", (req, res) => topicController.deleteTopic(req, res));

export default app;
