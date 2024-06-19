import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'pin-generator',
  api_key: '12345',
  api_secret: '12345',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CloudinaryImages',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

export default storage;
