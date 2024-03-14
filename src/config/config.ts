import * as env from 'env-var';
import './dotenv';

const config = {
    server: {
        port: env.get('PORT').required().asPortNumber(),
    },
    api: {
        weatherApiUrl: env.get('WEATHER_API_URL').required().asString(),
    },
    rateLimit: {
        windowMs: env.get('RATE_LIMIT_WINDOW_MS').required().asIntPositive(),
        limit: env.get('RATE_LIMIT_LIMIT').required().asIntPositive(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asString(),
        weatherCollectionName: env.get('WEATHER_COLLECTION_NAME').required().asString(),
        maxWeatherHistoryCount: env.get('MAX_WEATHER_HISTORY_COUNT').required().asIntPositive(),
    },
};

export default config;
