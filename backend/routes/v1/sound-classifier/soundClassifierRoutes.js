import { Router } from 'express';

import SoundClassifierController from '../../../controllers/sound-classifier/soundClassifierController.js';
import SoundClassififerMiddleware from '../../../middlewares/sound-classifier/soundClassififerMiddleware.js';
import CheckValidationResult from '../../../middlewares/checkValidationResult.js';

const router = Router();

router.post('/uploads', SoundClassifierController.handleFileUpload, SoundClassifierController.uploadWavFile);

export default router;