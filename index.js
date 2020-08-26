const express = require('express');
const path = require('path');
var fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/users', require('./api/users'));

//app.set('client/pug', path.join(__dirname, './client/pug'));
app.set('view engine', 'pug');

app.use('/client/css', express.static('client/css'));

app.use('/client/js', express.static('client/js'));

app.use('/assets', express.static('assets'));


const directoryPath = path.join(__dirname, 'client/pug');
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        var str1 = "../client/pug/"
        var str2 = "/";
        var pug_path = str2.concat(file);
        app.get(pug_path.substring(0, pug_path.length - 4), (req, res) => {
            res.render(str1.concat(file));
        });
    });
});
app.get('/', (req, res) => {
    res.redirect('/login');
});


const PORT = process.env.PORT || 4646;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
