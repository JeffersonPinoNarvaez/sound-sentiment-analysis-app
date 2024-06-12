import dotenv from 'dotenv';
import Server from './models/serverModel.js';

class App {
    constructor() {
        this.loadEnvironmentVariables();
        this.createServerInstance();
    }

    loadEnvironmentVariables() {
        dotenv.config();
    }

    createServerInstance() {
        this.server = new Server();
    }

    startServer() {
        this.server.start();
    }
}

const app = new App();
app.startServer();