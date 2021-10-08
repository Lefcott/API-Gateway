const express = require('express');
const { default: axios } = require('axios');

require('./env');

const app = express();
const port = process.env.PORT || 3000;

app.all('*', (req, res) => {
  res.json({ message: 'readyyy' });
  // axios({
  //   baseURL: process.env.API_URL,
  //   url: req.originalUrl,
  //   method: req.method,
  //   responseType: 'stream',
  // })
  //   .then((response) => {
  //     response.data.pipe(res);
  //     res.status(response.status);
  //   })
  //   .catch((error) => {
  //     error.response.data.pipe(res);
  //     res.status(error.response.status);
  //   });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'test' });
});

app.listen(port, () => {
  console.log(`API Gateway listening at port ${port}`);
});