import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173'
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Plan-based rate limiting middleware
const planRateLimit = async (req, res, next) => {
  const { plan } = req.user || { plan: 'free' };
  const limits = {
    free: 10,
    pro: 50,
    enterprise: 100
  };
  
  // Implement plan-based rate limiting logic here
  next();
};

// AI Mentor endpoint
app.post('/api/ai/mentor', planRateLimit, async (req, res) => {
  try {
    const { prompt, userId, context } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an AI mentor focused on helping users achieve their personal and professional goals. Provide actionable advice and guidance."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({
      message: completion.choices[0].message.content,
      suggestions: [], // Add relevant suggestions based on the response
      nextSteps: []   // Add next steps based on the response
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});