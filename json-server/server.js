const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
  try {
  const { email } = req.query;
  
  if (email) {
    const { data } = await axios({
      url: `http://localhost:8000/users?email=${email}`,
      method: 'GET'
    })
    return res.send(data);
  } else {
    const { data } = await axios({
      url: `http://localhost:8000/users`,
      method: 'GET'
    })
    return res.send(data);
  }
} catch (err) {
  console.log(err.message);
  return res.status(500).send('Internal error occurred')
}
});

app.patch('/users/:id', async (req, res) => {
  try {
  const userId = req.params.id;
  const data = req.body;

  await axios({
    url: `http://localhost:8000/users/${userId}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  });

  // Perform the necessary logic to update the user with the provided ID

  return res.send('User updated successfully');
} catch (err) {
  console.log(err.message);
  return res.status(500).send('Internal error occurred')
}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});