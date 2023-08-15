import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import sample from 'lodash.sample';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS);
  res.render('greet.html.njk', {
    name: name,
    compliment: compliment
  });
});

// In this function, get the user’s response to the yes-or-no question from the form and

// if they said no, call res.render('goodbye.html.njk') that tells them goodbye and that they’ll be missed(you’ll have to create goodbye.html.njk)

// if they said yes, render a different view file, game.html.njk.This file should have a simple form that asks for the name of a person, a color, a noun, and an adjective.How you choose to implement those inputs is up to you, but you should feel free to mix and match. (Hint: it might be fun to try one as a drop - down menu of choices). This new form should submit its data to / madlib.
app.get('/game', (req, res) => {
  const playGame = req.query.play === "yes";
  if (playGame) {
    res.render("game.html.njk")
  } else {
    res.render("goodbye.html.njk")
  }
});

app.get("/madlib", (req, res) => {
  const name = req.query.name;
  const color = req.query.color;
  const noun = req.query.noun;
  const adjective = req.query.adjective;

  console.log(req.query)
  res.render("madlib.html.njk", {
    // name: name,
    // color: color,
    // noun: noun,
    // adjective: adjective
    ...req.query
  })
});