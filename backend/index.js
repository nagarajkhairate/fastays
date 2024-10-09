const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello from the Backend!');
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});

