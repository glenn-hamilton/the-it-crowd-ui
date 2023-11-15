import axiosInstance from '../config';
import { Login } from '../models/Auth';

export default class AuthService {

    async loginInUser(login: Login): Promise<string> {

        try {
            const response = await axiosInstance.post('/api/auth/login', login);
            return response.data;
        } catch (e) {
            throw new Error('Unable To Login.');
        }
    }
}