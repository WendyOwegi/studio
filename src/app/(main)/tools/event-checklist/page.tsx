'use client';

import { useState } from 'react';
import { eventChecklist, ChecklistCategory } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function EventChecklistPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const totalTasks = eventChecklist.reduce(
    (sum, category) => sum + category.tasks.length,
    0
  );
  const progress = totalTasks > 0 ? (completedTasks.size / totalTasks) * 100 : 0;

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const getDefaultOpenItems = () => {
    if (eventChecklist.length > 0) {
        return [eventChecklist[0].title];
    }
    return [];
  }

  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Interactive Event Checklist</CardTitle>
          <CardDescription>
            Stay on track with your event planning from start to finish.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <Label htmlFor="progress">Overall Progress</Label>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress id="progress" value={progress} />
          </div>

          <Accordion type="multiple" defaultValue={getDefaultOpenItems()} className="w-full">
            {eventChecklist.map((category) => (
              <AccordionItem key={category.title} value={category.title}>
                <AccordionTrigger>{category.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {category.tasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50">
                        <Checkbox
                          id={task.id}
                          checked={completedTasks.has(task.id)}
                          onCheckedChange={() => handleTaskToggle(task.id)}
                        />
                        <Label
                          htmlFor={task.id}
                          className={`flex-1 cursor-pointer ${
                            completedTasks.has(task.id)
                              ? 'text-muted-foreground line-through'
                              : ''
                          }`}
                        >
                          {task.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
