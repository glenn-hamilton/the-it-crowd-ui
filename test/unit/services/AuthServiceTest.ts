import { describe, it, before, after } from 'mocha';
import axiosInstance from '../../../config';
import AuthService from '../../../services/AuthService';
import { Login } from '../../../models/Auth';

let MockAdapter = require('axios-mock-adapter');
let chai = require('chai');
const expect = chai.expect;

let authService = new AuthService();
let mock: typeof MockAdapter;

const userAccount: Login = {
    email: 'fake@email.com',
    password: 'supperFakePassword'
};

describe('AuthService', function () {

    before(function() {
        mock = new MockAdapter(axiosInstance);
    });

    after(function() {
        mock = undefined;
    });

    it('Login user, should return token, when valid login details are sent.', async () => {
        let fakeToken: String = 'Valid Token';

        mock.onPost('/api/auth/login', userAccount).reply(200, fakeToken);

        let token: string = await authService.loginInUser(userAccount);
        expect(token).to.equal(fakeToken);
    });

    it('Login user, should throw an error, when invalid login details are sent.', async () => {
        mock.onPost('/api/auth/login', userAccount).reply(500, new Error('Unable To Login.'));

        let error:string;
        try {
            await authService.loginInUser(userAccount);
        } catch (e) {
            error = e;
        }
        expect(String(error)).to.equal('Error: Unable To Login.');
    });
});
