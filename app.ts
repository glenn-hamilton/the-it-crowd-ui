const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

require('./controllers/ConnectionController')(app);