import jwt from 'jsonwebtoken';
// project files
import * as db from '../models';
import { JWT_SECRET } from '../config/app.config';

export const decodeJwt = async (req, res, next) => {
  try {
    if(req.user && req.user.id) return next();
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_SECRET);
    // delete decoded.sub;
    const user = await db.User.findById(decoded.sub);
    req.user = user;
    return next();
  } catch (e) {
    console.log('decode JWT Error: ', e.message)

  }
  return next();
};
