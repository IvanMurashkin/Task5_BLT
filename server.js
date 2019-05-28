const express = require('express');
const User = require('./server/user');
const bodyParser = require('body-parser');
//const session = require('express-session');
//const PgSession = require('connect-pg-simple')(session);
const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set("view engine", "pug");

/* Хотел сесси сделать, но какая-то странная ошибка вылазила, не смог найти решение 
app.use(session({
    store: new PgSession(),
    secret: 'secretBLT',
    resave: false,
    saveUninitialized: false
}));
*/
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/compiled_css"));
app.use(express.static(__dirname + "/js"));

app.get('/', (request, response) => {
    response.render('home/home'/*, { userName: request.session.username }*/);
});

app.get('/registration', (request, response) => { 
    //request.session.username = request.body.userName;
    response.render('registration/registration');
});

app.post('/registration', urlencodedParser, async (request, response) => {
    const user = new User(request.body.userName, request.body.password);
    let exists;

    try {
        exists = await user.save();
    } catch(e) {
        console.log(e.stack);
    }

    if (exists) {
        response.send(JSON.stringify({ exists, message: "Пользователь с таким именем уже существует" }));
    } else {
        response.send(JSON.stringify({ exists, message: "Вы успешно зарегистрировались" }));
    }
});

app.get('/users', urlencodedParser, async (request, response) => {
    let result;

    try {
        result = await User.getAllUsers();
    } catch (e) {
        console.log(e);
    }

    response.render('users/users', { users: result });
});

app.get('/login', (request, response) => {
    response.render('login/login');
});

app.post('/login', urlencodedParser, async (request, response) => {
    const user = new User(request.body.userName, request.body.password);
    let exists;
    try {
        exists = await user.login();
    } catch(e) {
        console.log(e.stack);
    }
    
    if (exists) {
        response.send(JSON.stringify({ exists, message: "Вы успешно залогинились" }));
    } else {
        response.send(JSON.stringify({ exists, message: "Неверный логин или пароль" }));
    }
});

app.listen(8080);
