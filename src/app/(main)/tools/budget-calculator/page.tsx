'use client';

import { useState } from 'react';
import { Plus, Trash, Download } from 'lucide-react';
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

interface BudgetItem {
  id: number;
  name: string;
  cost: number;
}

export default function BudgetCalculatorPage() {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: 1, name: 'Venue Rental', cost: 2000 },
    { id: 2, name: 'Catering (per person)', cost: 75 },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  const totalCost = items.reduce((sum, item) => sum + item.cost, 0);

  const handleAddItem = () => {
    if (newItemName && newItemCost) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItemName,
          cost: parseFloat(newItemCost),
        },
      ]);
      setNewItemName('');
      setNewItemCost('');
    }
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };
  
  const handleUpdateItem = (id: number, field: 'name' | 'cost', value: string) => {
    setItems(items.map(item => item.id === id ? {...item, [field]: field === 'cost' ? parseFloat(value) || 0 : value } : item));
  }

  const handleDownload = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Item,Cost\n";
    items.forEach(item => {
        csvContent += `${item.name},${item.cost}\n`;
    });
    csvContent += `\nTotal,${totalCost}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "budget_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Budget Calculator</CardTitle>
          <CardDescription>
            Estimate and track your event expenses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="w-[150px] text-right">Cost</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input value={item.name} onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)} className="border-none bg-transparent h-auto p-0" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input type="number" value={item.cost} onChange={(e) => handleUpdateItem(item.id, 'cost', e.target.value)} className="border-none bg-transparent h-auto p-0 text-right" />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* New Item Row */}
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="New item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newItemCost}
                    onChange={(e) => setNewItemCost(e.target.value)}
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Button size="icon" onClick={handleAddItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 py-4 px-6 rounded-b-lg">
          <div className="flex items-center gap-4">
            <Button onClick={handleDownload} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Summary
            </Button>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Estimated Cost</p>
            <p className="text-2xl font-bold">
              ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
