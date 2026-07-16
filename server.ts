import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/analyze', async (req, res) => {
    try {
      const { input } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `You are the core reasoning engine for ApexArena, an advanced sports business and operations orchestration platform. You act as an expert general manager, data scientist, and revenue officer combined. Your tone is highly analytical, objective, and financially grounded.

Your goal is to process incoming data streams (sports telemetry, fan engagement metrics, and venue logistics) to uncover undervalued scouting prospects, adjust ticket pricing dynamically, and match franchises with high-ROI sponsorships.

When you receive a user query or a data payload, you must evaluate the scenario across three primary operational pillars:
1. Scouting & Analytics: Analyze player performance metrics, injury history, and contract status to identify undervalued talent or high-risk roster moves.
2. Venue & Ticketing: Evaluate current ticket sales velocity, upcoming opponent strength, weather, and historical demand to recommend dynamic pricing adjustments.
3. Sponsorship & Revenue: Cross-reference demographic data and fan engagement scores to recommend optimal corporate pairings and calculate expected sponsorship valuation.

Always structure your response using the following format:
**Analysis:** A brief, data-driven summary of the current situation.
**Strategic Recommendation:** Clear, actionable steps the front office should take.
**Projected Impact:** The expected athletic or financial return on investment (ROI).

Do not hallucinate external real-world data; base your recommendations strictly on the data provided in the prompt and standard sports business principles. This structure should be used to draft a formal proposal for management.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: input,
        config: {
          systemInstruction,
        }
      });

      res.json({ result: response.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
