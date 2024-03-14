import JoiDate from '@joi/date';
import * as BaseJoi from 'joi';

const Joi = BaseJoi.extend(JoiDate);
Joi.objectId = require('joi-objectid')(Joi);

export type createUserDTO = {
    name: string;
    password: string;
};


export const createSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        password: Joi.string().required(),
    },
});

export const updateSchema = Joi.object({
    body: {
        name: Joi.string().required(),
    },
});
