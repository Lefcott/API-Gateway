const express = require('express');
const { default: axios } = require('axios');

const app = express();

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  const origin = req.get('origin');

  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cookie, Set-Cookie, Authorization'
  );
  next();
});

app.all('*', (req, res) => {
  try {
    axios({
      baseURL: process.env.API_URL,
      url: req.originalUrl,
      headers: {
        ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
      },
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
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
