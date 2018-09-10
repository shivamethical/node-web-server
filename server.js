const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+ '/views/partials')

hbs.registerHelper('currentYear', () => {
    return  new Date().getFullYear()
})

hbs.registerHelper('screamIt', function(text){
    return text.toUpperCase();
})

app.set('view engine', 'hbs');

/* Middleware to store logs of website */
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if(err) {
            console.log('Unable to append in server.log')
        }
    })
    next();
});

/*  Middleware if website is under maintenance */

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname+ '/public'));

/* Set http route handler */

app.get('/', (req, res) => {   // callback method what return to user when request come
    // res.send('<h1> Hello Express ! </h1>') // this method send response
    res.render('home.hbs', {
        pageTitle: 'Shivam', 
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to home'
    })
});

app.get('/about', (req, res) => {
    // res.send("This is about page !")
    //render method to render template
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({errorMessage: 'unable to handle request !'})
})

app.listen(port, () => {
    console.log('Server started on port : 3000')
})