import { Weather } from '../../../types/weather.type';

export interface IWeatherApi {
    getCityWeather: (city: string) => Promise<Weather>;
}

export interface IWeatherDal extends IWeatherApi {
    addCityWeather: (cityWeather: Weather) => Promise<Weather>;
    getHistorySearchedCities: () => Promise<Weather[]>;
    getLastWeather: () => Promise<Weather>;
}
