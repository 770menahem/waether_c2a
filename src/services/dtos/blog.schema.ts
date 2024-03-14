import JoiDate from '@joi/date';
import * as BaseJoi from 'joi';

const Joi = BaseJoi.extend(JoiDate);
Joi.objectId = require('joi-objectid')(Joi);

export type createBlogDTO = {
    title: string;
    description: string;
    author: string;
};

export const createSchema = Joi.object({
    body: {
        title: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.objectId().required()
    },
});

export const updateSchema = Joi.object({
    body: {
        description: Joi.string().required(),
    },
});
