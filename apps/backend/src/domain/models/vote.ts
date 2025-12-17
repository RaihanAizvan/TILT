export interface Vote {
  id: number;
  topicId: string;
  userId: string;
  value: "up" | "down";
}
