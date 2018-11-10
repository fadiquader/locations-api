
import jwt from 'jsonwebtoken';
// project files
import * as config from './config/app.config';

export function generateToken({ _id }) {
  const timestamp = new Date().getTime();
  return jwt.sign({
    sub: _id,
    iat: timestamp,
  }, config.JWT_SECRET);
}
