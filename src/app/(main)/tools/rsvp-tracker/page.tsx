'use client';

import { useState, useMemo } from 'react';
import { Plus, Trash, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Status = 'Attending' | 'Maybe' | 'Declined' | 'Not Responded';

interface Guest {
  id: number;
  name: string;
  status: Status;
}

export default function RsvpTrackerPage() {
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: 'Alice Johnson', status: 'Attending' },
    { id: 2, name: 'Bob Williams', status: 'Not Responded' },
    { id: 3, name: 'Charlie Brown', status: 'Declined' },
  ]);
  const [newGuestName, setNewGuestName] = useState('');

  const handleAddGuest = () => {
    if (newGuestName) {
      setGuests([
        ...guests,
        {
          id: Date.now(),
          name: newGuestName,
          status: 'Not Responded',
        },
      ]);
      setNewGuestName('');
    }
  };

  const handleRemoveGuest = (id: number) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  const handleUpdateStatus = (id: number, status: Status) => {
    setGuests(
      guests.map((guest) => (guest.id === id ? { ...guest, status } : guest))
    );
  };
  
  const handleUpdateName = (id: number, name: string) => {
    setGuests(
      guests.map((guest) => (guest.id === id ? { ...guest, name } : guest))
    );
  };

  const statusCounts = useMemo(() => {
    return guests.reduce(
      (acc, guest) => {
        acc[guest.status]++;
        return acc;
      },
      { Attending: 0, Maybe: 0, Declined: 0, 'Not Responded': 0 }
    );
  }, [guests]);

  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">RSVP Tracker</CardTitle>
          <CardDescription>
            Manage your guest list and track attendance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{guests.length}</CardTitle>
                <CardDescription>Total Guests</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-500">{statusCounts.Attending}</CardTitle>
                <CardDescription>Attending</CardDescription>
              </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-orange-500">{statusCounts.Maybe}</CardTitle>
                    <CardDescription>Maybe</CardDescription>
                </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-red-500">{statusCounts.Declined}</CardTitle>
                <CardDescription>Declined</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest Name</TableHead>
                <TableHead className="w-[180px]">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <Input value={guest.name} onChange={(e) => handleUpdateName(guest.id, e.target.value)} className="border-none bg-transparent h-auto p-0" />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={guest.status}
                      onValueChange={(value: Status) =>
                        handleUpdateStatus(guest.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Set status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Attending">Attending</SelectItem>
                        <SelectItem value="Maybe">Maybe</SelectItem>
                        <SelectItem value="Declined">Declined</SelectItem>
                        <SelectItem value="Not Responded">
                          Not Responded
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveGuest(guest.id)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* New Guest Row */}
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="New guest name"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                    {/* Empty cell for alignment */}
                </TableCell>
                <TableCell>
                  <Button size="icon" onClick={handleAddGuest}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
