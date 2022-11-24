require('dotenv').config;

//? _______________Récup des paquets npm__________________
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const morgan = require('morgan'); // log de requetes http
const expressSession = require('express-session');
const cors = require('cors');
const router = require('./App/router');
const{google} = require('googleapis');

//? ______________initialisation serveur____________________
const PORT= process.env.PORT || 8989;
const app = express();

app.set('views','app/views');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname,'public')));

//! avant le router, activer le middleware pour recup les données post, ainsi que les sessions
app.use(express.urlencoded({extended:true}));

app.use(
    expressSession({
        secret: 'Backend express', // le "secret qui sert a générer les id de session chiffrés"
        resave: true, // sauvegarde les sessions a chaque appel, même si elle n'a pas changé
        saveUninitialized: true, // sauvegarde une session même si elle est vide
        cookie: {
            //les options du cookie
            secure: false, // sans ça, obligé de passer en HTTPS
            maxAge: 10000 * 60 * 60, // le temps max d'une session en ms -> 1h

        },
    })
);

app.use(bodyParser.json());
//app.use(cors(corsOptions));

//?__________lancement du routeur_________________________
app.use(router);
//app.use(routerUpload);

app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
})