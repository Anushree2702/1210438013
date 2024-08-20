const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

let numbers = [];
const windowSize = 10;

app.get('/numbers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://third-party-server.com/api/${id}`, { timeout: 500 });
    const newNumber = response.data.number;

    if (!numbers.includes(newNumber)) {
      if (numbers.length >= windowSize) {
        numbers.shift();
      }
      numbers.push(newNumber);
    }

    const average = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

    res.json({
      windowPrevState: numbers.slice(0, -1),
      windowCurrState: numbers,
      avg: average.toFixed(2),
      numbers: numbers
    });
  } catch (error) {
    res.status(500).send('Error fetching number');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
