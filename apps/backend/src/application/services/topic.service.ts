import type { TopicRepository } from "../../infrastructure/repositories/topic.repository.js";
import type { CreateTopicDTO } from "../../shared/dtos/create-topic.dto.js";
import type { VoteTopicDTO } from "../../shared/dtos/vote-topic.dto.js";
import type { TopicResponseDTO } from "../../shared/dtos/topic-response.dto.js";
import type { Topic } from "../../domain/models/topic.js";
import type { Vote } from "../../domain/models/vote.js";
import type { User } from "../../domain/models/user.js";

export class TopicService {
    constructor(private topicRepository: TopicRepository) {

    }

    async createTopic(dto: CreateTopicDTO, userId: number) : Promise<TopicResponseDTO> {


        if(!userId){
            throw new Error("Unauthorized")
        }

        // create a new topic

        const topic: Topic  = {
            id:0,
            topic: dto.topic,
            created_by: userId,
            createdAt: new Date()
        }
        // store it

        const newTopic = await this.topicRepository.create(topic)

        //return TopicResponseDTO
        return {
            id: newTopic.id,
            topic: newTopic.topic,
            upCount: 0,
            downCount: 0,
            createdBy: newTopic.created_by,
            createdAt: newTopic.createdAt
        }
    }

    async getAllTopics(): Promise<TopicResponseDTO[]> {

        // get all topics
        const topics: Topic[] = await this.topicRepository.findAll();
        //for each topics get its vote
        const res: TopicResponseDTO[] = []
        for(let i = 0 ; i < topics.length; i++) {
            let votes: Vote[] = await this.topicRepository.findVotesByTopicId(topics[i].id);
            let up: number  = 0;
            let down: number = 0
            for(let j = 0 ; j < votes.length; j++) {
                if(votes[j].value == "up")
                    up++
                else
                    down++
            }
            let dto2: TopicResponseDTO = {
                id:topics[i].id,
                topic:topics[i].topic,
                upCount: up,
                downCount: down,
                createdBy: topics[i].created_by,
                createdAt: topics[i].createdAt,
            }
            res.push(dto2)
        }

        return res
    }
    
    async vote(dto: VoteTopicDTO, userId: number| undefined): Promise<void> {

        if(!userId){
            throw new Error("Unauthorized")
        }

        const vote: Vote = {
            id:0,
            topicId:dto.topicId,
            userId: userId,
            value: dto.value
        }
        await this.topicRepository.saveVote(vote)
    }

    async deleteTopic(topicId: number, userId: number) : Promise<void> {
        const topics: Topic[] = await this.topicRepository.findAll();
        const topic = topics.find(t=> t.id === topicId);

        if (!topic) {
            throw new Error("Topic not found")
        }

        if(topic.created_by !== userId) {
            throw new Error("Not premited")
        }
        await this.topicRepository.deleteById(topicId)
    }

}