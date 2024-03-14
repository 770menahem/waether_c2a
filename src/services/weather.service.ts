import { ILogger } from '../log/logger';
import { IWeatherService } from './interfaces/services/weatherService.interface';
import { IWeatherApi, IWeatherDal } from './interfaces/DAL/weatherDal.interface';
import { NotFound } from '../infra/express/utils/error';
import { Weather } from '../types/weather.type';

export class WeatherService implements IWeatherService {
    private WeatherRepo: IWeatherDal;
    private WeatherApi: IWeatherApi;
    private _logger: ILogger;

    constructor(weatherRepo: IWeatherDal, weatherApi: IWeatherApi, logger: ILogger) {
        this.WeatherRepo = weatherRepo;
        this.WeatherApi = weatherApi;
        this._logger = logger;
    }

    public getCitiesWeather = async (cities: string[]) => {
        const foundedCities: Weather[] = [];

        const promises = cities.map(async (city) => {
            const cityWeather: Weather = await this.WeatherApi.getCityWeather(city);

            if (cityWeather) {
                const createdCity = await this.WeatherRepo.addCityWeather({ ...cityWeather, cityName: city.toLowerCase() });
                foundedCities.push(createdCity);
            } else {
                this._logger.logError({ message: `fail to get city weather, ${city}` });
            }
        });

        await Promise.all(promises);

        if (!foundedCities.length) {
            this._logger.logError({ message: 'fail to get cities weather' });
            throw new NotFound('fail to get cities weather');
        }

        this._logger.logInfo({ message: `cities weather fetched successfully, ${foundedCities.length} cities` });
        return foundedCities;
    };

    public getHistorySearchedCities = async () => {
        const Weather = await this.WeatherRepo.getHistorySearchedCities();

        if (!Weather) {
            this._logger.logError({ message: 'fail to get history search Weather' });
            throw new NotFound('fail to get history search Weather');
        }

        this._logger.logInfo({ message: `history search Weather fetched successfully, ${Weather.length} cities` });

        return Weather;
    };

    public getLastWeather = async () => {
        const weather = await this.WeatherRepo.getLastWeather();

        if (!weather) {
            this._logger.logError({ message: 'fail to get last weather' });
            throw new NotFound('fail to get last weather');
        }

        this._logger.logInfo({ message: `last weather fetched successfully with city ${weather.cityName}` });

        return weather;
    };
}
