import { TopicRepository } from "./topic.repository.js";
import { Vote } from "../../domain/models/vote.js";
import { Topic } from "../../domain/models/topic.js";


export class MongoTopicRepository implements TopicRepository {

    async create(topic: Topic): Promise<Topic> {
        throw new Error("Not implemented");
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

    async findVotesByTopicId(topicId: number): Promise<Vote[]> {
        throw new Error("Not implemented");
    }
}