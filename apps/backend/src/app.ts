import express from "express"
import session from "express-session"
import cors from "cors"

import { TopicService } from "./application/services/topic.service.js"
import { MongoTopicRepository } from "./infrastructure/repositories/mongo-topic.repository.js"
import { TopicController } from "./presentation/controllers/topic.controller.js"

const app = express()

/* =====================
   BASIC MIDDLEWARE
===================== */
app.use(express.json())

/* =====================
   CORS (VITE DEV)
===================== */
app.use(
  cors({
    origin: true,        // reflects http://localhost:5173 / 5500 etc
    credentials: true,   // REQUIRED for sessions
  })
)

/* =====================
   SESSION SETUP
===================== */
app.use(
  session({
    secret: "tilt-secret",
    resave: false,
    saveUninitialized: true,
  })
)

/* =====================
   SESSION USER ID
===================== */
app.use((req, _res, next) => {
  if (!req.session.userId) {
    req.session.userId = Math.floor(Math.random() * 1_000_000)
  }
  next()
})

/* =====================
   WIRING
===================== */
const topicRepository = new MongoTopicRepository()
const topicService = new TopicService(topicRepository)
const topicController = new TopicController(topicService)

/* =====================
   SESSION ROUTES
===================== */

// set username
app.post("/api/session/username", (req, res) => {
  const { username } = req.body

  if (!username || typeof username !== "string") {
    return res.status(400).json({ message: "Username required" })
  }

  req.session.username = username
  res.sendStatus(204)
})

// get current session user
app.get("/api/session/me", (req, res) => {
  if (!req.session.username) {
    return res.status(401).json({ message: "No username" })
  }

  res.json({
    userId: req.session.userId,
    username: req.session.username,
  })
})

/* =====================
   TOPIC ROUTES
===================== */
app.post("/api/topics", (req, res) => topicController.createTopic(req, res))
app.get("/api/topics", (req, res) => topicController.getAllTopics(req, res))
app.post("/api/topics/:id/vote", (req, res) => topicController.vote(req, res))
app.delete("/api/topics/:id", (req, res) => topicController.deleteTopic(req, res))

export default app
