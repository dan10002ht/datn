import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const generateToken = (req, res) => {
  const {apiKey} = req.body;
  if (apiKey === process.env.SECRET_KEY) {
    const token = jwt.sign({apiKey}, process.env.SECRET_KEY, {expiresIn: '10h'});
    res.cookie('token', token, {httpOnly: true});
    return res.status(200).json({success: true, token});
  }
  return res.status(500).json({success: false, message: 'Invalid api key'});
};
