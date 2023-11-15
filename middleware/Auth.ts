import { NextFunction, Request, Response } from 'express';

module.exports = function (req: Request, res: Response, next: NextFunction) {
    if (req.session.token && req.session.token.length > 0) {

        let token: String = req.session.token;

        const base64String = token.split('.')[1];
        const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));

        let current: Number = Math.floor(+new Date() / 1000);

        let jwtExpiry: Number = decodedValue['expiry'];

        if (jwtExpiry <= current ) {
            // Token Has Expired. -> Redirect To Login Page.
            let payload = {pageTitle: 'Session Expired', errormessage: 'Token Has Expired, Please Login Again.',
                token: req.session.token};
            res.render('pages/login', payload);
        }

        next();
    } else {
        res.redirect('/login');
    }
};
