const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data (replace with real API calls later)
const mockData = {
  leetcode: {
    username: "techmaster",
    solved: 324,
    ranking: 45678,
    contests: 15,
    contestRating: 1756,
    badges: ["Dynamic Programming", "Arrays", "Trees"]
  },
  codechef: {
    username: "techmaster",
    rating: 1892,
    division: 2,
    contestsParticipated: 12,
    problemsSolved: 245,
    highestRank: 234
  }
};

// Routes
app.get('/api/leetcode/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Replace with LeetCode's API endpoint
    const response = await axios.get(`https://leetcode.com/api/users/${username}`, {
      headers: { 'Authorization': `Bearer ${process.env.LEETCODE_API_KEY}` }
    });
    const data = response.data;

    // Process the data as needed for the frontend
    res.json({
      username: data.username,
      solved: data.totalSolved,
      ranking: data.globalRanking,
      contests: data.totalContests,
      contestRating: data.rating,
      badges: data.badges || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(mockData.leetcode); // Use mock data in case of failure
  }
});

app.get('/api/codechef/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Replace with CodeChef's API endpoint
    const response = await axios.get(`https://api.codechef.com/users/${username}`, {
      headers: { 'Authorization': `Bearer ${process.env.CODECHEF_API_KEY}` }
    });
    const data = response.data.result.data.content;

    // Process the data as needed for the frontend
    res.json({
      username: data.username,
      rating: data.rating,
      division: data.division,
      contestsParticipated: data.contestsParticipated,
      problemsSolved: data.problemsSolved,
      highestRank: data.highestRank
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(mockData.codechef); // Use mock data in case of failure
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
