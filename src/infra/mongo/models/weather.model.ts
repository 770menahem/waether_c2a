import { Weather } from './../../../types/weather.type';
import mongoose from 'mongoose';

export const weatherSchema = new mongoose.Schema<Weather>(
    {
        cityName: { type: String, required: true, index: true },
        temperature: { type: String, required: true },
        wind: { type: String, required: true },
        description: { type: String, required: true },
        forecast: [
            {
                day: { type: String, required: true },
                temperature: { type: String, required: true },
                wind: { type: String, required: true },
            },
        ],
    },
    { versionKey: false, timestamps: true },
);

// export const userModel = mongoose.model<User>(config.mongo.userCollectionName, userSchema);
