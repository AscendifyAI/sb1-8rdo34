import express from 'express';
import {
  generateAIResponse,
  generatePersonalizedPlan,
  generateResources,
  analyzeUserProgress,
  generateDailyTasks
} from '../ai/index.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { prompt, modelType, context } = req.body;
    const response = await generateAIResponse(prompt, context);
    res.json(response);
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

router.post('/plan', async (req, res) => {
  try {
    const { goalType, userPreferences } = req.body;
    const plan = await generatePersonalizedPlan(goalType, userPreferences);
    res.json(plan);
  } catch (error) {
    console.error('Plan generation error:', error);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

router.post('/resources', async (req, res) => {
  try {
    const { resourceType, userContext } = req.body;
    const resources = await generateResources(resourceType, userContext);
    res.json(resources);
  } catch (error) {
    console.error('Resource generation error:', error);
    res.status(500).json({ error: 'Failed to generate resources' });
  }
});

router.post('/analyze', async (req, res) => {
  try {
    const { goalId, progressData } = req.body;
    const analysis = await analyzeUserProgress(goalId, progressData);
    res.json(analysis);
  } catch (error) {
    console.error('Progress analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze progress' });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const { userId, goals } = req.body;
    const tasks = await generateDailyTasks(userId, goals);
    res.json(tasks);
  } catch (error) {
    console.error('Task generation error:', error);
    res.status(500).json({ error: 'Failed to generate tasks' });
  }
});

export default router;