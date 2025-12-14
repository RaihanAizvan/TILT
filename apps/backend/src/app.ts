import express from "express";
import session from "express-session"

import { TopicService } from "./application/services/topic.service.js";
import { InMemoryTopicRepository } from "./infrastructure/repositories/in-memory-topic.repository.js";
import { TopicController } from "./presentation/controllers/topic.controller.js";

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "tilt-secret",
    resave: false,
    saveUninitialized: true,
  })
)


// wiring
const topicRepository = new InMemoryTopicRepository();
const topicService = new TopicService(topicRepository);
const topicController = new TopicController(topicService);

// cors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.sendStatus(204)
  }

  next()
})

// add user id randomly
app.use((req, _res, next) => {
  if (!req.session.userId) {
    req.session.userId = Math.floor(Math.random() * 1000000)
  }
  next()
})


// routes
app.post("/topics", (req, res) => topicController.createTopic(req, res));
app.get("/topics", (req, res) => topicController.getAllTopics(req, res));
app.post("/topics/:id/vote", (req, res) => topicController.vote(req, res));
app.delete("/topics/:id", (req, res) => topicController.deleteTopic(req, res));

export default app;
