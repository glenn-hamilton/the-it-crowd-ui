import { Request, Response, Application } from 'express';
import ConnectionService from '../services/ConnectionService';

module.exports = function(app: Application) {
    app.get('/database-active', async (req: Request, res: Response) => {
        const connectionService = new ConnectionService();
        let message: string = 'Could Not Connect To Database!';
        try {
            message = await connectionService.testConnection();
            res.status(200).send(message);
        } catch (error) {
            console.error(error);
            res.status(500).send(message);
        }

    });
};

