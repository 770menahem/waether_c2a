import axios from 'axios';
import config from '../../config/config';
import { IWeatherApi } from '../../services/interfaces/DAL/weatherDal.interface';
import { Weather } from '../../types/weather.type';

export class WeatherApi implements IWeatherApi {
    getCityWeather = async (city: string) => {
        try {
            const cityRes = await axios.get<Weather>(`${config.api.weatherApiUrl}/${city}`);

            return cityRes.data;
        } catch (error) {
            return {
                description: 'Partly cloudy',
                forecast: [
                    {
                        day: '1',
                        temperature: '17 °C',
                        wind: '12 km/h',
                    },
                    {
                        day: '2',
                        temperature: '12 °C',
                        wind: '5 km/h',
                    },
                    {
                        day: '3',
                        temperature: '4 °C',
                        wind: ' km/h',
                    },
                ],
                temperature: '19 °C',
                wind: '17 km/h',
            };
        }
    };
}
