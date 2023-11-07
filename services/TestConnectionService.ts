const axios = require('axios');

const express = require('express');
const app = express();

import { Request, Response, Application, response } from "express";

export default class TestConnectionService {
    async testConnection(): Promise<string> {
        try {
            const response = await axios.get('http://localhost:8080/api/database-active');
            const message: string = response.data;
            console.log("message-> ", message);
            return message;
        } catch (e) {
            throw new Error("Failed to test connection, " + e)
        }
    }
}