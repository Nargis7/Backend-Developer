import express from 'express';

const app = express();

// app.get('/',(req,res)=>{
//   res.send('server is ready');
// });

// get a list of five jokes
app.get('/api/jokes',(req,res)=>{
  const jokes = [
    {
      id:1,
      title:'Programming Jokes',
      joke:'Why do programmers prefer dark mode? Because light attracts bugs!'
    },
    {
      id:2,
      title:'Java Jokes',
      joke:'Why do Java developers wear glasses? Because they don\'t see sharp!'
    },
    {
      id:3,
      title:'Light Bulb Jokes',
      joke:'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!'
    },
    {
      id:4,
      title:'Python Jokes',
      joke:'Why do Python programmers have low self-esteem? Because they\'re constantly comparing their self to others!'
    },
    {
      id:5,
      title:'Foo Bar Jokes',
      joke:'What is a programmer\'s favorite hangout place? Foo Bar!'
    }
  ];
  res.send(jokes);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
  console.log(`server at http://localhost:${PORT}`);
});