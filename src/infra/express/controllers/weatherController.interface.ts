import { Request, Response } from 'express';

export interface IWeatherController {
    getCitiesWeather(req: Request, res: Response): Promise<void>;
    getHistorySearchedCities(req: Request, res: Response): Promise<void>;
    getLastWeather(req: Request, res: Response): Promise<void>;
}
