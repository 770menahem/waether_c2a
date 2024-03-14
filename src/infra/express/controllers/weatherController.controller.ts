import { Request, Response } from 'express';
import { Weather } from '../../../types/weather.type';
import { ServiceError } from '../utils/error';
import { IWeatherController } from './weatherController.interface';
import { IWeatherService } from '../../../services/interfaces/services/weatherService.interface';

export class WeatherController implements IWeatherController {
    private WeatherService: IWeatherService;

    constructor(WeatherService: IWeatherService) {
        this.WeatherService = WeatherService;
    }

    public getCitiesWeather = async (req: Request, res: Response) => {
        const cities: string = req.query.cities as string;
        const citiesArray = cities.split(',');

        const citiesWeathers = await this.WeatherService.getCitiesWeather(citiesArray);

        if (!citiesWeathers) throw new ServiceError(404, 'fail to get cities weather');
        else res.send(citiesWeathers);
    };

    public getHistorySearchedCities = async (_req: Request, res: Response) => {
        const Weather: Weather[] | null = await this.WeatherService.getHistorySearchedCities();

        if (!Weather) throw new ServiceError(404, 'fail to create Weather');

        res.send(Weather);
    };

    public getLastWeather = async (_req: Request, res: Response) => {
        const Weather: Weather | null = await this.WeatherService.getLastWeather();

        if (!Weather) throw new ServiceError(404, 'fail to get last weather');
        else res.send(Weather);
    };
}
