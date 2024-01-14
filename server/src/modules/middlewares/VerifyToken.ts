import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

interface RequestWithUser extends Request {
  userId?: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, process.env.JWT_SECRET || 'default') as JwtPayload;
        (req as RequestWithUser).userId = decoded.sub as string;

        return next();
    } catch (err) {
        return res.status(401).send({ error: 'Invalid token' });
    }
};

export default authenticate;
