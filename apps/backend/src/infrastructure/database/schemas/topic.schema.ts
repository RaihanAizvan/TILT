import { Schema, model } from "mongoose";

const TopicSchema = new Schema(
    {
        topic: { type: String, required: true },
        created_by: { type: Number, required: true },
        created_by_name: { type: String, required: true },
        createdAt: { type: Date, required: true },
    },
    { versionKey: false }
);

export const TopicModel = model("Topic", TopicSchema);
