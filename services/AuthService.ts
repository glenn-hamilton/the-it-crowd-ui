import axiosInstance from '../config';
import { Login } from '../model/Auth';

export default class AuthService {

    async loginInUser(login: Login): Promise<string> {

        try {
            const response = await axiosInstance.post('/api/auth/login', login);
            return response.data;
        } catch (e) {
            console.error(e);
            throw new Error('Unable To Login.');
        }
    }
}