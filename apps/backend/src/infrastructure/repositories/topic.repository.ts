// repository means just how data is stored and fetched

import { Vote } from "../../domain/models/vote";
import { Topic } from "../../domain/models/topic";

export interface TopicRepository {
    create(topic: Topic) : Promise<Topic>
    findAll(): Promise<Topic[]>
    deleteById(topicId: number): Promise<void> 

    saveVote(vote:Vote) : Promise<void>
    findVotesByTopicId(topicId: number): Promise<Vote[]>
}