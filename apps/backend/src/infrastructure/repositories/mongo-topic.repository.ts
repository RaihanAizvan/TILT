import { TopicRepository } from "./topic.repository.js";
import { TopicModel } from "../database/schemas/topic.schema.js"
import { Vote } from "../../domain/models/vote.js";
import { Topic } from "../../domain/models/topic.js";


export class MongoTopicRepository implements TopicRepository {

    async create(topic: Topic): Promise<Topic> {
        const doc = await TopicModel.create({
            topic: topic.topic,
            created_by: topic.created_by,
            created_by_name: topic.created_by_name,
            createdAt: topic.createdAt,
        })

        return {
            id: doc._id.toString(),
            topic: doc.topic,
            created_by: doc.created_by,
            created_by_name: doc.created_by_name,
            createdAt: doc.createdAt,
        };
    }
    async findAll(): Promise<Topic[]> {
        throw new Error("Not implemented");
    }

    async deleteById(topicId: number): Promise<void> {
        throw new Error("Not implemented");
    }

    async saveVote(vote: Vote): Promise<void> {
        throw new Error("Not implemented");
    }

    async findVotesByTopicId(topicId: string): Promise<Vote[]> {
        throw new Error("Not implemented");
    }
}