import config from '../../../config/config';
import { IWeatherDal } from '../../../services/interfaces/DAL/weatherDal.interface';

import { Weather } from '../../../types/weather.type';
import { DbFail, NotFound } from '../../express/utils/error';
import { BaseRepository } from './baseRepository';

export class WeatherRepo extends BaseRepository<Weather> implements IWeatherDal {
    getCityWeather = async (city: string) => {
        const cityDoc: Weather | null = await this._model.findOne({ cityName: city });

        if (!cityDoc) {
            throw new NotFound(`city ${city} not found`);
        }

        return cityDoc;
    };

    public addCityWeather = async (weather: Weather): Promise<Weather> => {
        try {
            const count = await this._model.countDocuments({});
            if (count > config.mongo.maxWeatherHistoryCount - 1) {
                const oldestDoc = await this._model.find().sort({ createdAt: 1 }).limit(1);

                if (oldestDoc) {
                    await this._model.deleteOne({ _id: oldestDoc[0]._id });
                }
            }

            return await this._model.findOneAndUpdate(
                {
                    cityName: weather.cityName,
                },
                weather,
                {
                    upsert: true,
                    new: true,
                },
            );
        } catch (error) {
            throw new DbFail(`fail to create weather ${weather.cityName}`);
        }
    };

    public getHistorySearchedCities = async (): Promise<Weather[]> => {
        try {
            const weather = await this._model.find().limit(5);
            return weather;
        } catch (error) {
            throw new DbFail('fail to get history search Weather');
        }
    };

    public getLastWeather = async (): Promise<Weather> => {
        try {
            const lastSearch: Weather[] = await this._model.find().sort({ createdAt: -1 }).limit(1);

            if (!lastSearch.length) {
                throw new NotFound('data not found probably db is empty');
            }

            return lastSearch[0];
        } catch (error) {
            throw new DbFail('fail to get last weather');
        }
    };
}
