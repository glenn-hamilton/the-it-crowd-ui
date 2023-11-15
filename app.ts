import { Request, Response, Application } from 'express';
const express = require('express');
const app: Application = express();
const path = require('path');
const session = require('express-session');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, '/public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'NOT HARDCODED SECRET', cookie: {maxAge: 3600000} }));

declare module 'express-session' {
    interface SessionData {
      token: String;
    }
  }

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

require('./controllers/AuthController')(app);

// Add Middleware for session checking:
const authMiddleware = require('./middleware/auth');
app.use(authMiddleware);

app.get('/', (req: Request, res: Response) => {
    const { token } = req.session;
    res.render('pages/home', {pageTitle: 'Home Page', token});
});


require('./controllers/ConnectionController')(app);
require('./controllers/JobsController')(app);
