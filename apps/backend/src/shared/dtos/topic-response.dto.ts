export interface TopicResponseDTO {
    id: number;
    topic: string;
    upCount: number;
    downCount: number;
    createdBy: number;
    createdByName: string;
    createdAt: Date;
}