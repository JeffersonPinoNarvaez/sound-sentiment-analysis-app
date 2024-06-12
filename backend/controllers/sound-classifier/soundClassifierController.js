import { request, response } from 'express';
import multer from 'multer';
import fs from 'fs';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath);

class SoundClassifierController {
    constructor() {
        this.SoundClassifier = null;
        this.initializeModel();
        this.initMulter();
    }

    async initializeModel() {
        this.SoundClassifier = null;
    }

    async initMulter() {
        // Set storage engine for multer
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/'); // Save uploaded files to the 'uploads' folder
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname); // Use the original filename
            },
        });

        // Middleware to handle file upload
        this.handleFileUpload = multer({ storage }).single('wavFile');
    }

    // Controller method to handle file upload and return response
    uploadWavFile = async (req = request, res = response) => {
        try {
            // Check if req.file exists (file uploaded successfully)
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded.' });
            }

            // File uploaded successfully, convert to MP3
            const wavFilePath = req.file.path;
            const mp3FilePath = wavFilePath.replace('.wav', '.mp3');

            ffmpeg()
                .input(wavFilePath)
                .output(mp3FilePath)
                .on('end', () => {
                    // Remove the original WAV file
                    fs.unlinkSync(wavFilePath);
                    
                    // Send success response with MP3 file information
                    res.status(200).json({ message: 'File converted to MP3 successfully.', filename: mp3FilePath });
                })
                .on('error', (err) => {
                    this.handleError(res, err, 'Error converting WAV to MP3');
                })
                .run();
        } catch (error) {
            this.handleError(res, error, 'Error uploading WAV file');
        }
    };

    handleError = (res, error, message) => {
        console.error(`${message}: ${error}`);
        res.status(500).json({
            data: null,
            error: { msg: `${message}: ${error}` },
        });
    };
}

export default new SoundClassifierController();
