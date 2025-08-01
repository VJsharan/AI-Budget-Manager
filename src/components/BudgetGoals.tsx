import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Target, Plus, TrendingUp, AlertCircle, CheckCircle2, Edit } from "lucide-react";

interface BudgetGoal {
  id: string;
  category: string;
  budgetAmount: number;
  currentSpent: number;
  period: 'monthly' | 'weekly' | 'yearly';
  color: string;
}

const initialBudgets: BudgetGoal[] = [
  { id: '1', category: 'Food & Dining', budgetAmount: 4000, currentSpent: 4500, period: 'monthly', color: '#ef4444' },
  { id: '2', category: 'Transportation', budgetAmount: 3000, currentSpent: 2800, period: 'monthly', color: '#f97316' },
  { id: '3', category: 'Entertainment', budgetAmount: 2000, currentSpent: 1900, period: 'monthly', color: '#eab308' },
  { id: '4', category: 'Shopping', budgetAmount: 2500, currentSpent: 3200, period: 'monthly', color: '#22c55e' },
  { id: '5', category: 'Bills & Utilities', budgetAmount: 6000, currentSpent: 5500, period: 'monthly', color: '#3b82f6' },
];

const categories = [
  { value: "food", label: "Food & Dining", color: "#ef4444" },
  { value: "transport", label: "Transportation", color: "#f97316" },
  { value: "entertainment", label: "Entertainment", color: "#eab308" },
  { value: "shopping", label: "Shopping", color: "#22c55e" },
  { value: "bills", label: "Bills & Utilities", color: "#3b82f6" },
  { value: "healthcare", label: "Healthcare", color: "#8b5cf6" },
  { value: "education", label: "Education", color: "#06b6d4" },
  { value: "travel", label: "Travel", color: "#ec4899" },
];

const BudgetGoals = () => {
  const [budgets, setBudgets] = useState<BudgetGoal[]>(initialBudgets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetGoal | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    budgetAmount: '',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.budgetAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const categoryInfo = categories.find(cat => cat.value === formData.category);
    
    if (editingBudget) {
      // Update existing budget
      setBudgets(budgets.map(budget => 
        budget.id === editingBudget.id 
          ? { ...budget, category: categoryInfo?.label || formData.category, budgetAmount: parseFloat(formData.budgetAmount), period: formData.period }
          : budget
      ));
      toast({
        title: "Budget Updated!",
        description: `Budget for ${categoryInfo?.label} has been updated.`,
      });
    } else {
      // Add new budget
      const newBudget: BudgetGoal = {
        id: Date.now().toString(),
        category: categoryInfo?.label || formData.category,
        budgetAmount: parseFloat(formData.budgetAmount),
        currentSpent: 0,
        period: formData.period,
        color: categoryInfo?.color || '#6b7280'
      };
      
      setBudgets([...budgets, newBudget]);
      toast({
        title: "Budget Added!",
        description: `Budget for ${categoryInfo?.label} has been created.`,
      });
    }

    setFormData({ category: '', budgetAmount: '', period: 'monthly' });
    setEditingBudget(null);
    setIsDialogOpen(false);
  };

  const getBudgetStatus = (budget: BudgetGoal) => {
    const percentage = (budget.currentSpent / budget.budgetAmount) * 100;
    if (percentage > 100) return { status: 'exceeded', color: 'destructive' };
    if (percentage > 80) return { status: 'warning', color: 'warning' };
    return { status: 'good', color: 'success' };
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.currentSpent, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  const handleEditBudget = (budget: BudgetGoal) => {
    setEditingBudget(budget);
    setFormData({
      category: categories.find(cat => cat.label === budget.category)?.value || '',
      budgetAmount: budget.budgetAmount.toString(),
      period: budget.period
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budget Goals</h1>
          <p className="text-muted-foreground">Set and track your spending limits</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              setEditingBudget(null);
              setFormData({ category: '', budgetAmount: '', period: 'monthly' });
            }}>
              <Plus size={16} />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBudget ? 'Edit Budget Goal' : 'Create New Budget Goal'}
              </DialogTitle>
              <DialogDescription>
                Set a spending limit for a specific category
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Amount</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="0"
                  value={formData.budgetAmount}
                  onChange={(e) => setFormData({...formData, budgetAmount: e.target.value})}
                  step="100"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Select value={formData.period} onValueChange={(value: any) => setFormData({...formData, period: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                {editingBudget ? 'Update Budget' : 'Create Budget'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overall Budget Summary */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Overall Budget Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Spent</span>
              <span className="font-medium">₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()}</span>
            </div>
            <Progress value={Math.min(overallProgress, 100)} className="h-3" />
            <div className="flex justify-between items-center text-sm">
              <span className={overallProgress > 100 ? "text-destructive" : overallProgress > 80 ? "text-warning" : "text-success"}>
                {overallProgress.toFixed(1)}% of budget used
              </span>
              <span className="text-muted-foreground">
                ₹{(totalBudget - totalSpent).toLocaleString()} remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => {
          const budgetStatus = getBudgetStatus(budget);
          const percentage = (budget.currentSpent / budget.budgetAmount) * 100;
          
          return (
            <Card key={budget.id} className="relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: budget.color }}
              />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{budget.category}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={budgetStatus.color as any}>
                      {budgetStatus.status === 'exceeded' && <AlertCircle size={12} />}
                      {budgetStatus.status === 'warning' && <AlertCircle size={12} />}
                      {budgetStatus.status === 'good' && <CheckCircle2 size={12} />}
                      {budgetStatus.status === 'exceeded' ? 'Over Budget' : 
                       budgetStatus.status === 'warning' ? 'Near Limit' : 'On Track'}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditBudget(budget)}
                    >
                      <Edit size={14} />
                    </Button>
                  </div>
                </div>
                <CardDescription className="capitalize">{budget.period} budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">₹{budget.currentSpent.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">/ ₹{budget.budgetAmount.toLocaleString()}</span>
                  </div>
                  
                  <Progress value={Math.min(percentage, 100)} className="h-2" />
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className={percentage > 100 ? "text-destructive" : percentage > 80 ? "text-warning" : "text-muted-foreground"}>
                      {percentage.toFixed(1)}% used
                    </span>
                    <span className="text-muted-foreground">
                      ₹{(budget.budgetAmount - budget.currentSpent).toLocaleString()} left
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Budget Recommendations */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            AI Budget Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-destructive mb-2">⚠️ Budget Alert</h4>
              <p className="text-sm text-muted-foreground">
                You've exceeded your Food & Dining budget by ₹500. Consider reducing restaurant visits 
                or increasing your budget to ₹4,500 based on your spending pattern.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-success mb-2">✅ Great Progress</h4>
              <p className="text-sm text-muted-foreground">
                You're doing well with Transportation! You're ₹200 under budget. 
                This saved amount could be moved to your Emergency Fund.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-primary mb-2">💡 Optimization Tip</h4>
              <p className="text-sm text-muted-foreground">
                Based on your spending patterns, consider creating a "Miscellaneous" budget 
                of ₹1,000/month for unexpected expenses.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-investment mb-2">📈 Growth Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                You consistently stay under budget. Consider increasing your investment 
                allocation by ₹2,000/month to accelerate wealth building.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetGoals;