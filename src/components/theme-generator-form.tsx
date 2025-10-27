'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Palette, Wand2, Loader2 } from 'lucide-react';

import { handleGenerateTheme, ThemeGenerationState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialState: ThemeGenerationState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Theme
        </>
      )}
    </Button>
  );
}

export function ThemeGeneratorForm() {
  const [state, formAction] = useFormState(handleGenerateTheme, initialState);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-2xl">AI Theme Generator</CardTitle>
            <CardDescription>
              Describe your event, and let AI create a unique theme for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Input
                id="eventType"
                name="eventType"
                placeholder="e.g., Wedding, Birthday Party, Corporate Event"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferences">Preferences & Ideas</Label>
              <Textarea
                id="preferences"
                name="preferences"
                placeholder="e.g., 'A rustic outdoor feel with a touch of elegance', 'Modern and minimalist', 'Vibrant and colorful for a kids party'"
                required
                rows={4}
              />
            </div>
            {state.error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center"><Palette className="mr-2 h-5 w-5"/> Generated Theme</h2>
        <Card className="min-h-[400px]">
            <CardContent className="p-6">
                {state.data ? (
                    <div className="space-y-6">
                        <div>
                            <Label className="text-sm text-muted-foreground">Theme Name</Label>
                            <h3 className="text-2xl font-bold font-headline text-primary">{state.data.themeName}</h3>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">Color Palette</Label>
                            <div className="flex space-x-2 mt-2">
                                {state.data.colorPalette.map((color, index) => (
                                    <div key={index} className="h-12 w-12 rounded-lg border-2" style={{ backgroundColor: color }} title={color} />
                                ))}
                            </div>
                        </div>
                         <div>
                            <Label className="text-sm text-muted-foreground">Mood</Label>
                            <p>{state.data.moodBoardDescription}</p>
                        </div>
                         <div>
                            <Label className="text-sm text-muted-foreground">Decor Suggestions</Label>
                            <p>{state.data.decorSuggestions}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-20">
                        <Wand2 className="h-12 w-12 mb-4" />
                        <p>Your generated theme will appear here.</p>
                        <p className="text-sm">Fill out the form and click "Generate Theme" to start.</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
