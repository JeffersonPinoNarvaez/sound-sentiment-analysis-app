import express from 'express';
import cors from 'cors';

import SoundClassifierRoutes from '../routes/v1/sound-classifier/soundClassifierRoutes.js';

class ServerModel {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.corePath = '/v1/api/core';
        this.applyMiddlewares();
        this.applyRoutes();
    }

    applyMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    applyRoutes() {
        this.app.use(`${this.corePath}/sound-classifier`, SoundClassifierRoutes);                          
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default ServerModel;