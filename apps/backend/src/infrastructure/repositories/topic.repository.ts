// repository means just how data is stored and fetched

import type { Vote } from "../../domain/models/vote.js";
import type { Topic } from "../../domain/models/topic.js";

export interface TopicRepository {
    create(topic: Topic) : Promise<Topic>
    findAll(): Promise<Topic[]>
    deleteById(topicId: number): Promise<void> 

    saveVote(vote:Vote) : Promise<void>
    findVotesByTopicId(topicId: number): Promise<Vote[]>
}