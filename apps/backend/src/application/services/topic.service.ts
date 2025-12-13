import { TopicRepository } from "../../infrastructure/repositories/topic.repository";
import { CreateTopicDTO } from "../../shared/dtos/create-topic.dto";
import { VoteTopicDTO } from "../../shared/dtos/vote-topic.dto";
import { TopicResponseDTO } from "../../shared/dtos/topic-response.dto";
import { Topic } from "../../domain/models/topic";


export class TopicService {
    constructor(private topicRepository: TopicRepository) {

    }

    async createTopic(dto: CreateTopicDTO, userId: number) : Promise<TopicResponseDTO> {

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
        throw new Error("Not implemented")
    }
    
    async vote(dto: VoteTopicDTO, userId: number): Promise<void> {
        throw new Error("Not implemented")
    }

    async deleteTopic(topicId: number, userId: number) : Promise<void> {
        throw new Error("Not implemented")
    }

}