import config from './config/config';

import Logger from './infra/winston/logger';
import conn from './infra/mongo/initializeMongo';
import { weatherSchema } from './infra/mongo/models/weather.model';
import { WeatherRepo } from './infra/mongo/repo/weather.repo';
import { WeatherService } from './services/weather.service';
import App from './infra/express/app';
import WeatherRouter from './infra/express/routers/weather.route';
import { WeatherController } from './infra/express/controllers/weatherController.controller';
import { WeatherApi } from './infra/api/weather.api';

export function initializeApp(port: any) {
    const logger = new Logger();

    const weatherRepo = new WeatherRepo(conn, config.mongo.weatherCollectionName, weatherSchema);
    const weatherApi = new WeatherApi();

    const weatherService = new WeatherService(weatherRepo, weatherApi, logger);

    const weatherController = new WeatherController(weatherService);

    const weatherRouter = new WeatherRouter(weatherController);

    return new App(port, [weatherRouter]);
}
