import prisma from '@/lib/db';
import { inngest } from './client';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';

export const execute = inngest.createFunction(
  { id: 'execute' },
  { event: 'execute/ai' },
  async ({ event, step }) => {
    const prompt = event.data.prompt;

    const { steps: geminiSteps } = await step.ai.wrap(
      'gemini-generate-text',
      generateText,
      {
        system: 'You are a helpful assistant.',
        model: google('gemini-2.5-flash'),
        prompt: prompt,
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      'openai-generate-text',
      generateText,
      {
        system: 'You are a helpful assistant.',
        model: openai('gpt-4o'),
        prompt: prompt,
      }
    );

    return { geminiSteps, openaiSteps };
  }
);
