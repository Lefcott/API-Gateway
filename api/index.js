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

app.listen(port, () => {
  console.log(`Redirector api listening at port ${port}`);
});
