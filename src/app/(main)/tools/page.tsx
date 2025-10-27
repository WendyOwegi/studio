import Link from 'next/link';
import {
  Calculator,
  CheckSquare,
  List,
  Palette,
  ArrowRight
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tools = [
  {
    title: 'Budget Calculator',
    description: 'Estimate your event costs, track expenses, and stay on budget with our easy-to-use calculator.',
    icon: Calculator,
    href: '/tools/budget-calculator',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: 'RSVP Tracker',
    description: 'Manage your guest list effortlessly. Track responses, meal preferences, and more in one place.',
    icon: List,
    href: '/tools/rsvp-tracker',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Event Checklist',
    description: 'Never miss a detail. Use our interactive checklist to guide you through every stage of planning.',
    icon: CheckSquare,
    href: '/tools/event-checklist',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'AI Theme Generator',
    description: 'Stuck for ideas? Let our AI generate unique event themes, color palettes, and decor suggestions for you.',
    icon: Palette,
    href: '/tools/theme-generator',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10'
  },
];

export default function ToolsPage() {
  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Event Planning Toolkit
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to plan your event, from budget to guest list.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.bgColor}`}>
                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription className="mt-1">{tool.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow"/>
            <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                    <Link href={tool.href}>Open Tool <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
