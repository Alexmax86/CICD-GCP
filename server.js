'use strict';

const express = require('express');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World. This is Continuous Deployement example');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});