import jwt from 'jsonwebtoken';
import { UserDoc } from '../models/user';

export const getJWTPayload = (user: UserDoc) => {
    const token = jwt.sign({ id: user?.id }, process?.env?.JWT_SECRET as string, { expiresIn: '24h' });
    const expiryDate = (Math.round(new Date().getTime() / 1000) + 24 * 3600) * 1000;
    return {
        token,
        expiryDate,
    }
}