export interface TopicResponseDTO {
    id: string;
    topic: string;
    upCount: number;
    downCount: number;
    createdBy: number;
    createdByName: string;
    createdAt: Date;
}