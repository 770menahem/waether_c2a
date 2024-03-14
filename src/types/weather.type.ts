export type Forecast = {
    day: string;
    temperature: string;
    wind: string;
};

export type Weather = {
    cityName?: string;
    temperature: string;
    wind: string;
    description: string;
    forecast: Forecast[];
};
