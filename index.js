import express from 'express';
import { appendFileSync, readFileSync } from 'fs';
const app = express();

app.use(express.static('.'));
app.use(express.json());

app.post('/statistic', (req, res) => {
    let text = JSON.stringify(req.body);
    appendFileSync('statistics.txt', text + '\n');
    res.sendStatus(201);
});

// app.post('/api/registration', (req, res) => {
//     let text = readFileSync('test.txt', 'utf8');
//     if (text.match(req.body.email) != null || req.body.password.length < 8 || req.body.age < 12) {
//         res.sendStatus(500);
//     } else {
//         appendFileSync('test.txt', JSON.stringify(req.body) + '\n');
//         res.sendStatus(201);
//     }
// });

// app.get("/google", function(res){
//   res.redirect('http://google.com/')

//   });

// app.get("/code/:visualstudiocode", function(req, res){

//   let visualstudiocode = req.params.visualstudiocode;

//   res.redirect('http://google.com/search?q=' + visualstudiocode)

//   });

app.listen(3000, () => {
    console.log('Server Work');
});

// import { readFileSync, writeFileSync, appendFileSync } from 'fs'

// writeFileSync('test.txt', 'Hello, World kdskdjskdjsodsdsahdisdiadhaidhiahdaidhiahdiahdiahdishdiahdia ')

// appendFileSync('test.txt', 'Vitalinaimnida\n')
// console.log('+++')
// let text = readFileSync('test.txt', 'utf8', (err,data) => {
//     console.log(err)
//     console.log(data)
// });

// console.log(text)

// console.log('---')

// let word = 'Віджет';

// let reg =  new RegExp(word, 'g');
// let str = 'Віджет з ідентифікатором Віджет';
// console.log(str.match(reg));

// let index = 0;
// let lastIndex = 0;
// let counter = 0;

// while (true) {
//     index = str.indexOf(word, index);
//     if (index < lastIndex) {
//         break;
//     }

//     lastIndex = index;
//     index++;
//     counter++;
// }
// console.log(counter);
