const express = require('express');
const axios = require('axios');

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0MTcwNzU3LCJpYXQiOjE3MjQxNzA0NTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhkY2QwMjJiLTc3NzMtNGYwZS1hMTE0LTBlNWQ2NzlmMjJhMyIsInN1YiI6InByYW1vZHNyaXZhc3RhdmEyNzAyQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6Im5ld19jYWxjaSIsImNsaWVudElEIjoiOGRjZDAyMmItNzc3My00ZjBlLWExMTQtMGU1ZDY3OWYyMmEzIiwiY2xpZW50U2VjcmV0IjoiRXVFYkNqd1pFbWxVeEZ4WCIsIm93bmVyTmFtZSI6IkFudXNocmVlIiwib3duZXJFbWFpbCI6InByYW1vZHNyaXZhc3RhdmEyNzAyQGdtYWlsLmNvbSIsInJvbGxObyI6IjEyMTA0MzgwMTMifQ.Zz_XG79RTGUIfLIbqaBnHjwUtaRBTUyERs3_GA547gM";

const app = express();
const TEST_SERVER_URL = 'http://20.244.56.144/test';
const PORT = process.env.PORT || 9876;
const WINDOW_SIZE = 10;

let windowNumbers = [];

const isValidId = (id) => ['primes', 'fibo', 'even', 'rand'].includes(id);

const fetchNumbersFromTestServer = async (numberId) => {
    try {
      const response = await axios.get(`${TEST_SERVER_URL}/${numberId}`, {
          headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
       });
      if (response.status === 200) {
        console.log(response.data); 
        return response.data.numbers; 
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error(`Error fetching numbers from test server: ${error.message}`);
    }
    return [];
  };

const updateWindow = (newNumbers) => {
    if (Array.isArray(newNumbers)) {
      newNumbers.forEach((num) => {
        if (!windowNumbers.includes(num)) {
          if (windowNumbers.length >= WINDOW_SIZE) {
            windowNumbers.shift();
          }
          windowNumbers.push(num);
        }
      });
    } else {
      console.error("newNumbers is not an array", newNumbers);
    }
  };

const calculateAverage = (numbers) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return numbers.length ? sum / numbers.length : 0;
};

app.get('/numbers/:numberId', async (req, res) => {
  const { numberId } = req.params;

  if (!isValidId(numberId)) {
    return res.status(400).json({ error: 'Invalid number ID. Valid IDs are primes, fibo, even, rand.' });
  }

  const previousWindow = [...windowNumbers];
  const newNumbers = await fetchNumbersFromTestServer(numberId);
  updateWindow(newNumbers);

  const average = calculateAverage(windowNumbers);

  return res.json({
    newNumbers,
    previousWindow,
    currentWindow: windowNumbers,
    average,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
