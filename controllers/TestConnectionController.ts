const axios = require('axios');

import { Request, Response, Application, response } from "express";
import TestConnectionService from "../services/TestConnectionService";

module.exports = function(app: Application) {
	app.get('/test-connection', async (req: Request, res: Response) => {
		var testConnectionService = new TestConnectionService();
		let message: string;	
        try {
			message = await testConnectionService.testConnection();
		 } catch (error) {
			 console.error(error);
		 }
		res.send(message);
	});
}

