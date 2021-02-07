const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

let calculations = [];
let answer = 0;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('src/public'));


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
app.post('/numbers', (req, res) => {
    if (req.body.operator === '+') {
      answer = Number(req.body.enter1) + Number(req.body.enter2);
    } else if (req.body.operator === '-') {
      answer = Number(req.body.enter1) - Number(req.body.enter2);
    } else if (req.body.operator === '/') {
      answer = Number(req.body.enter1) / Number(req.body.enter2);
    } else {
      answer = Number(req.body.enter1) * Number(req.body.enter2);
    }
  

  let objCalculations = {
    equation: req.body,
    answer: answer
  }
  calculations.push(objCalculations)
  res.sendStatus(200);
  
})

app.get('/numbers', (req, res) => {
  

  res.send(calculations.slice(Math.max(calculations.length - 10, 0)).reverse()
);


})