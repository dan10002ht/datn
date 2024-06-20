import {Router} from 'express';
import {handleUpload, upload} from '../services/cloudinaryServices';

const router = new Router();

router.post('/', upload.single('image'), async (req, res) => {
  const {file} = req;
  const response = await handleUpload(file);
  return res.status(200).json({
    success: true,
    data: {
      url: response.url,
    },
  });
});

export default router;
