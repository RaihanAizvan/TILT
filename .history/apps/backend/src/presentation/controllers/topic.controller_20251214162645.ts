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
import { TopicService } from "../../application/services/topic.service.js";
import type { VoteTopicDTO } from "../../shared/dtos/vote-topic.dto.js";

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
            res.status(500).json({message:err.message})
        }
    }

    async getAllTopics(req: Request, res: Response) {
        try {
            
            const topics = await this.topicService.getAllTopics()
            res.json(topics)

        } catch (err: any) {
            res.status(500).json({message:err.message})
        }
    }

    async vote(req: Request, res: Response) {
        try {
            const topicId: number  = Number(req.params.id)
            
            //checking for not a number
            if (Number.isNaN(topicId)) {
                throw new Error("Topic id must be a number")
            }
            const { value }: VoteTopicDTO = req.body
            const userId = 1 //mock

            const dto: VoteTopicDTO = {
                topicId : topicId,
                value: value
            }

            await this.topicService.vote(dto, userId)
            res.status(204).send()

        } catch (err: any) {
            res.status(400).json({message: err.message})
        }
    }

    async deleteTopic(req: Request, res: Response) {
        try {
            
            const topicId: number = Number(req.params.id)
            console.log(topicId)
            if (Number.isNaN(topicId)) {
                return res.status(400).json({ message: "Topic id must be a number" })
            }

            const userId: number = 1 //mock
            await this.topicService.deleteTopic(topicId, userId)
            res.status(204).send()

        } catch (err:any) {
            res.status(500).json({message: err.message})
        }
    }
}