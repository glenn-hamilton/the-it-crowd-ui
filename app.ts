const express = require('express');
const app = express();
const path = require('path');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

require('./controllers/ConnectionController')(app);
require('./controllers/AuthController')(app);