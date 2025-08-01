import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp, Calendar, Target, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample analytics data
const monthlyData = [
  { month: 'Jan', income: 65000, expenses: 45000, savings: 20000 },
  { month: 'Feb', income: 68000, expenses: 48000, savings: 20000 },
  { month: 'Mar', income: 62000, expenses: 44000, savings: 18000 },
  { month: 'Apr', income: 70000, expenses: 52000, savings: 18000 },
  { month: 'May', income: 72000, expenses: 49000, savings: 23000 },
  { month: 'Jun', income: 75000, expenses: 51000, savings: 24000 },
];

const categoryTrends = [
  { category: 'Food', jan: 4200, feb: 4500, mar: 3800, apr: 4100, may: 4000, jun: 4500 },
  { category: 'Transport', jan: 2800, feb: 3200, mar: 2500, apr: 2900, may: 2700, jun: 2800 },
  { category: 'Shopping', jan: 3500, feb: 4200, mar: 2800, apr: 3800, may: 3200, jun: 3200 },
  { category: 'Bills', jan: 5200, feb: 5400, mar: 5100, apr: 5600, may: 5300, jun: 5500 },
];

const weeklySpending = [
  { week: 'Week 1', amount: 12500 },
  { week: 'Week 2', amount: 14200 },
  { week: 'Week 3', amount: 11800 },
  { week: 'Week 4', amount: 13500 },
];

const Analytics = () => {
  const handleExportData = () => {
    // Simulate CSV export
    const csvData = monthlyData.map(row => 
      `${row.month},${row.income},${row.expenses},${row.savings}`
    ).join('\n');
    
    const blob = new Blob([`Month,Income,Expenses,Savings\n${csvData}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-data.csv';
    a.click();
    
    toast({
      title: "Data Exported!",
      description: "Your financial data has been downloaded as CSV.",
    });
  };

  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const avgMonthlySavings = monthlyData.reduce((sum, month) => sum + month.savings, 0) / monthlyData.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your financial patterns</p>
        </div>
        <Button onClick={handleExportData} className="gap-2">
          <Download size={16} />
          Export Data
        </Button>
      </div>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp size={16} />
              6-Month Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+12.5%</div>
            <p className="text-xs text-muted-foreground">Income growth</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-savings">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target size={16} />
              Avg Monthly Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-savings">₹{avgMonthlySavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">28.5% of income</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle size={16} />
              Spending Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Food</div>
            <p className="text-xs text-muted-foreground">18% above average</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses Trend</CardTitle>
            <CardDescription>6-month comparison view</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Bar dataKey="income" fill="hsl(var(--income))" name="Income" />
                <Bar dataKey="expenses" fill="hsl(var(--expense))" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Spending Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Spending Pattern</CardTitle>
            <CardDescription>Current month breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Spending']} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Savings Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Rate Over Time</CardTitle>
            <CardDescription>Percentage of income saved monthly</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData.map(d => ({
                ...d,
                savingsRate: ((d.savings / d.income) * 100).toFixed(1)
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Savings Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="savingsRate" 
                  stroke="hsl(var(--savings))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--savings))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category-wise Spending Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Category Spending Trends</CardTitle>
            <CardDescription>Monthly spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jan', Food: 4200, Transport: 2800, Shopping: 3500, Bills: 5200 },
                { month: 'Feb', Food: 4500, Transport: 3200, Shopping: 4200, Bills: 5400 },
                { month: 'Mar', Food: 3800, Transport: 2500, Shopping: 2800, Bills: 5100 },
                { month: 'Apr', Food: 4100, Transport: 2900, Shopping: 3800, Bills: 5600 },
                { month: 'May', Food: 4000, Transport: 2700, Shopping: 3200, Bills: 5300 },
                { month: 'Jun', Food: 4500, Transport: 2800, Shopping: 3200, Bills: 5500 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="Food" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="Transport" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="Shopping" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="Bills" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            AI Analytics Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-primary mb-2">Spending Pattern</h4>
              <p className="text-sm text-muted-foreground">
                Your highest spending typically occurs in the second week of each month, 
                averaging ₹14,200. Consider spreading larger purchases across the month.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-success mb-2">Savings Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                By reducing food expenses by just ₹500/month, you could save an additional 
                ₹6,000 annually without significant lifestyle changes.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-warning mb-2">Budget Alert</h4>
              <p className="text-sm text-muted-foreground">
                Shopping expenses have increased 25% over the last 3 months. 
                Consider setting a monthly shopping budget of ₹2,500.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-medium text-investment mb-2">Investment Tip</h4>
              <p className="text-sm text-muted-foreground">
                With your consistent savings of ₹20K+/month, consider increasing 
                your SIP investments by ₹5,000 to accelerate wealth building.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;