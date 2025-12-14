import { Types } from "mongoose";
import { TopicRepository } from "./topic.repository.js";
import { TopicModel } from "../database/schemas/topic.schema.js"
import { VoteModel } from "../database/schemas/vote.schema.js";
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
        const docs = await TopicModel.find().sort({ createdAt: -1 }).lean();

        return docs.map((d: any) => ({
            id: d._id.toString(),
            topic: d.topic,
            created_by: d.created_by,
            created_by_name: d.created_by_name,
            createdAt: d.createdAt,
        }));
    }

    async deleteById(topicId: string): Promise<void> {
        const _id = new Types.ObjectId(topicId);

        await TopicModel.deleteOne({ _id });
        await VoteModel.deleteMany({ topicId: _id });
    }

    async saveVote(vote: Vote): Promise<void> {
        await VoteModel.findOneAndUpdate(
            {
                topicId: new Types.ObjectId(vote.topicId),
                userId: vote.userId,
            },
            {
                $set: { value: vote.value },
            },
            {
                upsert: true,
                new: true,
            }
        );
    }

    async findVotesByTopicId(topicId: string): Promise<Vote[]> {
        const docs = await VoteModel.find({
            topicId: new Types.ObjectId(topicId),
        }).lean();

        return docs.map((d: any) => ({
            id: d._id.toString(),
            topicId: d.topicId.toString(),
            userId: d.userId,
            value: d.value,
        }));
    }
}