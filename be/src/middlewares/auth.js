import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export function authenticateToken(req, res, next) {
  const token = req.headers['Authorization'] || req.headers['authorization'];
  if (!token) return res.status(401).json({success: false, message: 'Invalid token'});

  return jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({success: false, message: 'Invalid token'});
    req.user = user;
    return next();
  });
}
