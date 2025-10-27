'use server';

/**
 * @fileOverview A flow for generating event theme ideas based on user input.
 *
 * - generateEventTheme - A function that generates event theme ideas.
 * - GenerateEventThemeInput - The input type for the generateEventTheme function.
 * - GenerateEventThemeOutput - The return type for the generateEventTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventThemeInputSchema = z.object({
  eventType: z.string().describe('The type of event (e.g., wedding, birthday party, corporate event).'),
  preferences: z.string().describe('Any personal preferences or specific requests for the event theme.'),
});
export type GenerateEventThemeInput = z.infer<typeof GenerateEventThemeInputSchema>;

const GenerateEventThemeOutputSchema = z.object({
  themeName: z.string().describe('The suggested name for the event theme.'),
  colorPalette: z.array(z.string()).describe('A list of color codes (e.g., hex codes) for the theme.'),
  moodBoardDescription: z.string().describe('A textual description of the mood board for the theme.'),
  decorSuggestions: z.string().describe('Suggestions for decorations that fit the theme.'),
});
export type GenerateEventThemeOutput = z.infer<typeof GenerateEventThemeOutputSchema>;

export async function generateEventTheme(input: GenerateEventThemeInput): Promise<GenerateEventThemeOutput> {
  return generateEventThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventThemePrompt',
  input: {schema: GenerateEventThemeInputSchema},
  output: {schema: GenerateEventThemeOutputSchema},
  prompt: `You are an AI event theme generator. Please generate event theme ideas based on the event type and preferences provided by the user.\n\nEvent Type: {{{eventType}}}\nPreferences: {{{preferences}}}\n\nConsider the event type and preferences to generate a cohesive event theme with a name, a color palette (provide hex codes), a mood board description, and decor suggestions.`,  
});

const generateEventThemeFlow = ai.defineFlow(
  {
    name: 'generateEventThemeFlow',
    inputSchema: GenerateEventThemeInputSchema,
    outputSchema: GenerateEventThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
