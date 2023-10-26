import { body } from 'express-validator';

export const SegmentValidator = [
    body('payload')
        .isObject()
        .withMessage('Payload is required for segment.'),
];