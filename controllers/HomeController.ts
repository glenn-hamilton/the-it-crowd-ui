import {Request, Response, Application} from 'express';

module.exports = function(app: Application) {
    app.get('/', (req: Request, res: Response)=>{
        try {
            const banner = {
                dynamicImage: 'public/assets/academy1.jpeg',
                dynamicText: 'Where your future begins',
                buttonText: 'Login Now',
                dynamicUrl: '/login',
            };
            res.render('pages/home', {
                pageTitle: 'Kainos Careers Portal',
                banner,
            });
        } catch (error) {
            console.error(error.message);
            res.redirect('pages/home');
        }
    });
};