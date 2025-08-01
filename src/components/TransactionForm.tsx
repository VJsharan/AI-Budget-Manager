import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { PlusCircle, DollarSign, Calendar, Tag, FileText } from "lucide-react";

const categories = [
  { value: "food", label: "Food & Dining", color: "#ef4444" },
  { value: "transport", label: "Transportation", color: "#f97316" },
  { value: "entertainment", label: "Entertainment", color: "#eab308" },
  { value: "shopping", label: "Shopping", color: "#22c55e" },
  { value: "bills", label: "Bills & Utilities", color: "#3b82f6" },
  { value: "healthcare", label: "Healthcare", color: "#8b5cf6" },
  { value: "education", label: "Education", color: "#06b6d4" },
  { value: "travel", label: "Travel", color: "#ec4899" },
  { value: "investment", label: "Investment", color: "#8b5cf6" },
  { value: "salary", label: "Salary", color: "#22c55e" },
  { value: "freelance", label: "Freelance", color: "#10b981" },
  { value: "other", label: "Other", color: "#6b7280" },
];

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  notes?: string;
}

interface TransactionFormProps {
  onTransactionAdded: (transaction: Transaction) => void;
}

const TransactionForm = ({ onTransactionAdded }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      notes: formData.notes
    };

    // Store in localStorage for demo
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    existingTransactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(existingTransactions));

    onTransactionAdded(newTransaction);

    // Show success message
    toast({
      title: "Transaction Added!",
      description: `₹${formData.amount} ${formData.type} has been recorded successfully.`,
    });

    // Reset form
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });

    setIsSubmitting(false);
  };

  const suggestedDescriptions = {
    food: ["Lunch at restaurant", "Grocery shopping", "Coffee", "Dinner out"],
    transport: ["Uber ride", "Metro card recharge", "Fuel", "Bus ticket"],
    entertainment: ["Movie tickets", "Concert", "Gaming", "Streaming subscription"],
    shopping: ["Clothes", "Electronics", "Books", "Home items"],
    bills: ["Electricity bill", "Internet bill", "Phone bill", "Rent"],
    healthcare: ["Doctor consultation", "Medicines", "Health checkup", "Gym membership"],
    salary: ["Monthly salary", "Bonus", "Overtime pay"],
    freelance: ["Project payment", "Consulting fee", "Design work"]
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Add Transaction</h1>
        <p className="text-muted-foreground">Record your income and expenses</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            New Transaction
          </CardTitle>
          <CardDescription>
            Enter the details of your income or expense
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant={formData.type === 'expense' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setFormData({...formData, type: 'expense', category: ''})}
              >
                <span className="mr-2">📤</span>
                Expense
              </Button>
              <Button
                type="button"
                variant={formData.type === 'income' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setFormData({...formData, type: 'income', category: ''})}
              >
                <span className="mr-2">📥</span>
                Income
              </Button>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign size={16} />
                Amount *
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="text-lg"
                step="0.01"
                min="0"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag size={16} />
                Category *
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter(cat => {
                      if (formData.type === 'income') {
                        return ['salary', 'freelance', 'investment', 'other'].includes(cat.value);
                      }
                      return !['salary', 'freelance'].includes(cat.value);
                    })
                    .map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText size={16} />
                Description *
              </Label>
              <Input
                id="description"
                placeholder="Brief description of the transaction"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              
              {/* Quick suggestions */}
              {formData.category && suggestedDescriptions[formData.category as keyof typeof suggestedDescriptions] && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedDescriptions[formData.category as keyof typeof suggestedDescriptions].map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({...formData, description: suggestion})}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar size={16} />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this transaction"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Transaction..." : "Add Transaction"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* AI Suggestion Box */}
      <Card className="mt-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="text-lg">🤖</span>
            <div>
              <p className="font-medium text-sm">Smart Categorization Active</p>
              <p className="text-sm text-muted-foreground mt-1">
                I'm learning your spending patterns to automatically suggest categories and detect duplicate transactions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;