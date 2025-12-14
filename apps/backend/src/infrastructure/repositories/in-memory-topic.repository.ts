// in memory repo are just like fake db. for testing architecture

import type { TopicRepository } from "./topic.repository.js";
import type { Topic } from "../../domain/models/topic.js";
import type { Vote } from "../../domain/models/vote.js";

export class InMemoryTopicRepository implements TopicRepository {
  private topics: Topic[] = [];
  private votes: Vote[] = [];
  private topicIdCounter = 1;
  private voteIdCounter = 1;

  async create(topic: Topic): Promise<Topic> {
    const newTopic = {
      ...topic,
      id: this.topicIdCounter++,
    };
    this.topics.push(newTopic);
    return newTopic;
  }

  async findAll(): Promise<Topic[]> {
    return this.topics;
  }

  async deleteById(topicId: number): Promise<void> {
    this.topics = this.topics.filter((t) => t.id !== topicId);
    this.votes = this.votes.filter((v) => v.topicId !== topicId);
  }

  async saveVote(vote: Vote): Promise<void> {
    const existing = this.votes.find(
      (v) => v.topicId === vote.topicId && v.userId === vote.userId
    );
    if (existing) {
      existing.value = vote.value;
    } else {
      this.votes.push({
        ...vote,
        id: this.voteIdCounter++,
      });
    }
  }

  async findVotesByTopicId(topicId: number): Promise<Vote[]> {
    return this.votes.filter((v) => v.topicId === topicId);
  }
}
