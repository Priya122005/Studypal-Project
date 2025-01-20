const express = require('express');
const { console } = require('inspector');
const app = express();
const port = 3000;
app.get('/' , (req, res) => {
    res.send('Welcome to My App');
});
app.get('/about' , (req, res) => {
    res.send('This is a short bio of my app.  It was built with Express!');
});
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
});