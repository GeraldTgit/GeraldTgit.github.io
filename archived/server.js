require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const accessToken = process.env.GITHUB_ACCESS_TOKEN; // Retrieve access token from environment variable

app.post('/saveData', async (req, res) => {
  const inputData = req.body.data;
  try {
    const response = await axios.put(
      'https://api.github.com/repos/GeraldTgit/GeraldTgit.github.io/contents/data.txt',
      {
        message: 'Added new data',
        content: Buffer.from(inputData).toString('base64'),
        branch: 'main',
      },
      {
        headers: {
          Authorization: `token ${accessToken}`,
          'Content-Type': 'application/json', // Add this line
        },
      }
    );
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while saving data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
