import storage from '../config/cloudinary';
import multer from 'multer';

export const upload = multer({storage});
