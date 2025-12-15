export interface TopicResponseDTO {
  id: string;
  topic: string;
  upCount: number;
  downCount: number;
  createdBy: string;
  createdByName: string;
  createdAt: Date;
}
