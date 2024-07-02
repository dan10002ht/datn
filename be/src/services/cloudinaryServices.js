import cloudinary from '../config/cloudinary';
import Multer from 'multer';

const storage = new Multer.memoryStorage();

export const upload = Multer({storage});

/**
 * https://cloudinary.com/blog/guest_post/upload-images-to-cloudinary-with-node-js-and-react
 *
 * @param {*} file
 * @returns
 */
export const handleUpload = async (dataURI) => {
  if (!dataURI) return {url: ''};
  return await cloudinary.uploader.upload(dataURI, {
    resource_type: 'auto',
  });
};
