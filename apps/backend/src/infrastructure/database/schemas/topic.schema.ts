import { Schema, model } from "mongoose";

const TopicSchema = new Schema(
    {
        topicId: {
            type: Schema.Types.ObjectId, 
            required: true,
            ref: "Topic"
        },

        userId: {
            type: Number,
            required: true,
        },

        value: {
            type: String, 
            enum: ["up", "down"],
            required: true,
        }
    },
    {
        versionKey:false
    }
)
