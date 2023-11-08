import axiosInstance from '../config';

export default class ConnectionService {
    async testConnection(): Promise<string> {
        try {
            const response = await axiosInstance.get('/api/database-active');
            const message: string = response.data;
            return message;
        } catch (e) {
            throw new Error('Failed to test connection, ' + e);
        }
    }
}