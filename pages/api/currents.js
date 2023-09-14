// pages/api/currents.js

export default async (req, res) => {
    const { company } = req.query;
    const CURRENTS_API_KEY = process.env.NEXT_PUBLIC_CURRENTS_API_KEY;
    const ENDPOINT = `https://api.currentsapi.services/v1/search?keywords=${company}&apiKey=${CURRENTS_API_KEY}&page_size=5`;
    try {
      const response = await fetch(ENDPOINT);
      
      if (!response.ok) {
          console.error(`Error fetching from currentsapi: ${response.status} ${response.statusText}`);
          return res.status(500).json({ error: 'Failed to fetch data from currentsapi' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
  } catch (error) {
      console.error('Error in /api/currents:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
  }
  
  };
  