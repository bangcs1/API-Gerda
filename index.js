const express = require('express');
const app = express();


global.logged = require('./function/logged.js');
global.api = {
    cls: [],
    infoCls: {}
};

//////////////////////////////////////////////
//////////////* TURN ON SERVER *//////////////
/////////////////////////////////////////////

app.use(express.json());
app.set("json spaces", 4);
require('./function/loadAPI.js')({
    app, express
});
app.use('/', require('./home.js'));
app.listen(2005, err => err ? console.log(err): console.log(`[ API ] • server has started working🐃`));
