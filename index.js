let express = require('express')
let app = express()
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

app.set('view engine', 'ejs')

app.use(layouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))

app.use('/search', require('./controllers/search'))

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(3000, () => {
    console.log('Rootin n Tootin on Port 3000')
})