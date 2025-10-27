'use server';

import {
  generateEventTheme,
  GenerateEventThemeInput,
  GenerateEventThemeOutput,
} from '@/ai/flows/generate-event-theme';

export interface ThemeGenerationState {
  data: GenerateEventThemeOutput | null;
  error: string | null;
}

export async function handleGenerateTheme(
  _prevState: ThemeGenerationState,
  formData: FormData
): Promise<ThemeGenerationState> {
  const eventType = formData.get('eventType') as string;
  const preferences = formData.get('preferences') as string;

  if (!eventType || !preferences) {
    return { data: null, error: 'Please fill out all fields.' };
  }

  try {
    const input: GenerateEventThemeInput = { eventType, preferences };
    const output = await generateEventTheme(input);
    return { data: output, error: null };
  } catch (error) {
    console.error('Error generating theme:', error);
    return { data: null, error: 'Failed to generate theme. Please try again.' };
  }
}
