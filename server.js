const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const db = require('./api/configs/db.config');
const config = require('./api/configs/app.config')
const path = require('path');
const schema = require('./api/schemas/index.schema.js');
const session = require('express-session');
const fs = require('fs');

//la section document : ils auront l'opportunité de rajouter les nouvelles études finalisées, de la communication...
//la section pour les appels d'offres, pour informer des appels d'offres en cours 
//Comptes rendus en pdf

const app = express();
app.use(cors(config));
app.use(cookieParser());
app.use(express.json());

app.use(session({
    secret: process.env.COOKIES_SECRET,
    resave: true,
    saveUninitialized : true,
    cookie: { secure: true },
}))


const port = config.PORT || 5000


app.use("/storage", express.static(path.join(__dirname, './storage')));
// const mail = require('./api/services/mailer.service.js')

const routes = require('./api/routes/index.router.js');

const script = require('./api/script/createUser.script.js');
script()

app.use(routes)

app.listen(port, () => 
    {  console.log("Serveur à l'écoute au port : " , port)
})
