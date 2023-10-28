import { body } from 'express-validator';

export const SegmentValidator = [
    body('type')
        .notEmpty()
        .withMessage('Type is required for segment.'),
];