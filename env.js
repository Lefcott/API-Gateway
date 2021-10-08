const dotenv = require('dotenv');

dotenv.config();

if (!process.env.API_URL) throw new Error('Missing API_URL');
