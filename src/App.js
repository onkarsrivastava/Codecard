import React, { useState } from 'react';
import { Trophy, Code2, Download } from 'lucide-react';

const CodingProfileCard = () => {
  const [profiles, setProfiles] = useState({
    codechef: '',
    leetcode: ''
  });

  // Mock data - in a real app, you'd fetch this from the platforms' APIs
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

  const handleInputChange = (platform, value) => {
    setProfiles(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const downloadAsSVG = (platform) => {
    // Create the SVG content based on the card data
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500">
        <rect width="100%" height="100%" fill="white"/>
        <rect width="100%" height="60" fill="${platform === 'leetcode' ? '#fff8f0' : '#fefce8'}"/>
        
        <!-- Title -->
        <text x="20" y="40" font-size="24" font-weight="bold" fill="black">
          ${platform === 'leetcode' ? 'LeetCode' : 'CodeChef'} Report
        </text>

        <!-- Content -->
        ${platform === 'leetcode' ? `
          <text x="20" y="100" fill="#4B5563">Problems Solved</text>
          <text x="380" y="100" text-anchor="end" font-weight="600">${mockData.leetcode.solved}</text>
          
          <text x="20" y="140" fill="#4B5563">Global Ranking</text>
          <text x="380" y="140" text-anchor="end" font-weight="600">#${mockData.leetcode.ranking}</text>
          
          <text x="20" y="180" fill="#4B5563">Contest Rating</text>
          <text x="380" y="180" text-anchor="end" font-weight="600">${mockData.leetcode.contestRating}</text>
          
          <text x="20" y="220" fill="#4B5563">Contests Participated</text>
          <text x="380" y="220" text-anchor="end" font-weight="600">${mockData.leetcode.contests}</text>
          
          <text x="20" y="280" fill="#4B5563" font-size="14">Strong Areas:</text>
          ${mockData.leetcode.badges.map((badge, index) => `
            <rect x="${20 + index * 140}" y="300" width="130" height="30" rx="15" fill="#F3F4F6"/>
            <text x="${85 + index * 140}" y="320" text-anchor="middle" fill="black">${badge}</text>
          `).join('')}
        ` : `
          <text x="20" y="100" fill="#4B5563">Current Rating</text>
          <text x="380" y="100" text-anchor="end" font-weight="600">${mockData.codechef.rating}</text>
          
          <text x="20" y="140" fill="#4B5563">Division</text>
          <text x="380" y="140" text-anchor="end" font-weight="600">${mockData.codechef.division}</text>
          
          <text x="20" y="180" fill="#4B5563">Problems Solved</text>
          <text x="380" y="180" text-anchor="end" font-weight="600">${mockData.codechef.problemsSolved}</text>
          
          <text x="20" y="220" fill="#4B5563">Contests Participated</text>
          <text x="380" y="220" text-anchor="end" font-weight="600">${mockData.codechef.contestsParticipated}</text>
          
          <text x="20" y="260" fill="#4B5563">Highest Contest Rank</text>
          <text x="380" y="260" text-anchor="end" font-weight="600">#${mockData.codechef.highestRank}</text>
        `}
      </svg>
    `;

    // Create a Blob from the SVG content
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const link = document.createElement('a');
    link.href = url;
    link.download = `${platform}-profile-card.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter CodeChef Username"
          value={profiles.codechef}
          onChange={(e) => handleInputChange('codechef', e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter LeetCode Username"
          value={profiles.leetcode}
          onChange={(e) => handleInputChange('leetcode', e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LeetCode Card */}
        <div className="relative">
          <div className="border rounded-lg shadow-lg bg-white">
            <div className="bg-orange-50 p-4 rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Code2 className="text-orange-500" />
                LeetCode Report
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Problems Solved</span>
                  <span className="text-xl font-semibold">{mockData.leetcode.solved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Global Ranking</span>
                  <span className="text-xl font-semibold">#{mockData.leetcode.ranking}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Contest Rating</span>
                  <span className="text-xl font-semibold">{mockData.leetcode.contestRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Contests Participated</span>
                  <span className="text-xl font-semibold">{mockData.leetcode.contests}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Strong Areas:</p>
                  <div className="flex flex-wrap gap-2">
                    {mockData.leetcode.badges.map((badge) => (
                      <span key={badge} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => downloadAsSVG('leetcode')}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            title="Download card"
          >
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* CodeChef Card */}
        <div className="relative">
          <div className="border rounded-lg shadow-lg bg-white">
            <div className="bg-yellow-50 p-4 rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="text-yellow-600" />
                CodeChef Report
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Rating</span>
                  <span className="text-xl font-semibold">{mockData.codechef.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Division</span>
                  <span className="text-xl font-semibold">{mockData.codechef.division}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Problems Solved</span>
                  <span className="text-xl font-semibold">{mockData.codechef.problemsSolved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Contests Participated</span>
                  <span className="text-xl font-semibold">{mockData.codechef.contestsParticipated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Highest Contest Rank</span>
                  <span className="text-xl font-semibold">#{mockData.codechef.highestRank}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => downloadAsSVG('codechef')}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            title="Download card"
          >
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingProfileCard;