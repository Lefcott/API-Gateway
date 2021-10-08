const express = require('express');
const { default: axios } = require('axios');

const app = express();

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://blanqueriawow.com,https://femelibros.com');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.all('*', (req, res) => {
  axios({
    baseURL: process.env.API_URL,
    url: req.originalUrl,
    method: req.method,
    responseType: 'stream',
  })
    .then((response) => {
      response.data.pipe(res);
      res.status(response.status);
    })
    .catch((error) => {
      error.response.data.pipe(res);
      res.status(error.response.status);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
