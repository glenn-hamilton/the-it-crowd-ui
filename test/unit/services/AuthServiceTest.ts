let MockAdapter = require('axios-mock-adapter');
let chai = require('chai');
const expect = chai.expect;
import { describe, it } from 'mocha';
import axiosInstance from '../../../config';
import AuthService from '../../../services/AuthService';
let mock = new MockAdapter(axiosInstance);

let authService = new AuthService();

const userAccount = {
    email: 'fake@email.com',
    password: 'supperFakePassword'
};

describe('AuthService', function () {
    it('Login user, should return token, when valid login details are sent.', async () => {
        let fakeToken: String = 'Valid Token';
        mock.onPost('/api/auth/login').reply(200, fakeToken);

        let token = await authService.loginInUser(userAccount);

        expect(token).to.be.an('String');
    });

    it('Login user, should throw an error, when invalid login details are sent.', async () => {
        mock.onPost('/api/auth/login').reply(new Error('Unable To Login.'));

        let error:string;
        try {
            await authService.loginInUser(userAccount);
        } catch (e) {
            error = e;
        }
        expect(String(error)).to.equal('Error: Unable To Login.');
    });
});
