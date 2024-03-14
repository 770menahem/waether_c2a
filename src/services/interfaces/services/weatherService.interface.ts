import { Weather } from './../../../types/weather.type';

export interface IWeatherService {
    getCitiesWeather: (cities: string[]) => Promise<Weather[]>;
    getHistorySearchedCities: () => Promise<Weather[]>;
    getLastWeather: () => Promise<Weather>;
}
