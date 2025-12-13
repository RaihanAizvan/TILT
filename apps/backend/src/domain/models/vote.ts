export interface Vote {
    id: number,
    topicId:number,
    userId: number,
    value: "up" | "down"
}