const express = require('express');
const app = express();
const server = app.listen(8000);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});
    
io.on('connection', function (socket) {
  socket.on('formData', function (formData) {
    var lucky = Math.floor(Math.random() * (1000 - 1) + 1);
    var response = {
        name: formData.name,
        location: formData.location,
        language: formData.language,
        comment: formData.comment,
        lucky: lucky
    };
    io.emit('response', response);
  });
});