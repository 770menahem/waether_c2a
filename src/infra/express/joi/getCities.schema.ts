import * as Joi from 'joi';

export const citiesSchema = Joi.object({
    query: Joi.object({
        cities: Joi.string().required(),
    }),
});
