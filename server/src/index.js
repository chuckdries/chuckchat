import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('howdy!');
});

app.listen(8080, () => console.log('Listening on 8080')); // eslint-disable-line no-console
