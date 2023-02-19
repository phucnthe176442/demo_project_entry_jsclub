const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const { extname } = require('path')
const app = express()
const port = 2430

app.use(express.static(path.join(__dirname, 'public')));

// http logger
app.use(morgan('combined'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// template engine
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))
// console.log('PATH: ', path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => {
    res.render('login');
});
  
app.post('/', (req, res) => {
    const userInfo = req.body;

    // Authenticate user credentials
    if (userInfo.username === 'admin' && userInfo.password === '1') {
        res.render('home');
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))