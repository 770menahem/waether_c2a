import { rateLimit } from 'express-rate-limit';
import config from '../../../config/config';

export const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    limit: config.rateLimit.limit,
    standardHeaders: true,
    legacyHeaders: false,
});
