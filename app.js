const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyPaser = require('body-parser');
const cookiePaser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(session({ secret: 'labarina' }));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'books' }, { link: '/Author', title: 'Author' }];

const authRouter = require('./src/routes/authRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/books', bookRouter);


app.get('/', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'books' }, { link: '/Author', title: 'Author' }],
    title: 'Library'
  });
});

app.listen(port, () => {
  debug(`listening at port  ${chalk.green(port)}`);
});
