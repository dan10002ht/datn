import cloudinary from '../config/cloudinary';
import storage from '../config/cloudinary';
import Multer from 'multer';

const storage = new Multer.memoryStorage();

export const upload = Multer({storage});

/**
 * https://cloudinary.com/blog/guest_post/upload-images-to-cloudinary-with-node-js-and-react
 *
 * @param {*} file
 * @returns
 */
export const handleUpload = async (file) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
  return await cloudinary.uploader.upload(dataURI, {
    resource_type: 'auto',
  });
};
