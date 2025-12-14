/*
Endpoints to implement:

POST /topics → create topic
GET /topics → list topics
POST /topics/:id/vote → vote
DELETE /topics/:id → delete

Controller rules:

Extract params/body
Pass userId (mock/session for now)
Call service
Send JSON response
Catch errors
*/


import { Request, Response } from "express";
import { TopicService } from "../../application/services/topic.service";

export class TopicController {
    constructor(private topicService: TopicService) {

    }

    async createTopic(req: Request, res: Response) {
        try {
            const {topic} = req.body;
            const userId = 1;

            const result = await this.topicService.createTopic({topic}, userId)
            res.json(result)

        } catch (err: any) {
            
        }
    }

    async getAllTopics(req: Request, res: Response) {

    }

    async vote(req: Request, res: Response) {

    }

    async deleteTopic(req: Request, res: Response) {

    }
}