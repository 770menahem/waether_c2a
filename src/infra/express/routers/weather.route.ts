import { IWeatherController } from '../controllers/weatherController.interface';
import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';
import validateRequest from '../joi/joi';
import { citiesSchema } from '../joi/getCities.schema';

class WeatherRouter extends BaseRouter<IWeatherController> {
    constructor(weatherController: IWeatherController) {
        super(weatherController);
        this.path = '/weather';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get('', validateRequest(citiesSchema), wrapController(this.controller.getCitiesWeather));
        this.router.get('/history', wrapController(this.controller.getHistorySearchedCities));
        this.router.get('/last', wrapController(this.controller.getLastWeather));
    }
}

export default WeatherRouter;
