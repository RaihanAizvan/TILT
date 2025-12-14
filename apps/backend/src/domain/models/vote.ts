export interface Vote {
    id: number,
    topicId:string,
    userId: number,
    value: "up" | "down"
}