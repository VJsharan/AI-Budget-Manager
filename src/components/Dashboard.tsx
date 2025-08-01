import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target, CreditCard, PiggyBank } from "lucide-react";

// Sample data for demo
const expenseData = [
  { name: 'Food & Dining', value: 4500, color: '#ef4444' },
  { name: 'Transportation', value: 2800, color: '#f97316' },
  { name: 'Entertainment', value: 1900, color: '#eab308' },
  { name: 'Shopping', value: 3200, color: '#22c55e' },
  { name: 'Bills & Utilities', value: 5500, color: '#3b82f6' },
  { name: 'Healthcare', value: 1200, color: '#8b5cf6' },
];

const monthlyTrend = [
  { month: 'Jan', income: 65000, expenses: 45000, savings: 20000 },
  { month: 'Feb', income: 68000, expenses: 48000, savings: 20000 },
  { month: 'Mar', income: 62000, expenses: 44000, savings: 18000 },
  { month: 'Apr', income: 70000, expenses: 52000, savings: 18000 },
  { month: 'May', income: 72000, expenses: 49000, savings: 23000 },
  { month: 'Jun', income: 75000, expenses: 51000, savings: 24000 },
];

const Dashboard = () => {
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  const totalIncome = 75000; // Current month
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your financial overview for June 2024</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-income">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-income" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">₹{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-expense">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-expense" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">-2.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-savings">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-savings" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-savings">₹{totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{savingsRate}% of income</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">85%</div>
            <p className="text-xs text-muted-foreground">Within budget limits</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Your spending categories this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseData.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>6-Month Trend</CardTitle>
            <CardDescription>Income vs Expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="hsl(var(--income))" 
                  strokeWidth={3}
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--expense))" 
                  strokeWidth={3}
                  name="Expenses"
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="hsl(var(--savings))" 
                  strokeWidth={3}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            AI Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-card rounded-lg border">
            <p className="text-sm">
              <strong>Great job!</strong> Your food expenses decreased by 15% this month. 
              You saved ₹800 by cooking at home more often.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <p className="text-sm">
              <strong>Opportunity:</strong> You spent ₹3,200 on shopping this month. 
              Consider setting a monthly shopping budget of ₹2,500 to save an extra ₹8,400 annually.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <p className="text-sm">
              <strong>Investment Tip:</strong> With your current savings rate of {savingsRate}%, 
              you could invest ₹10,000 monthly in SIPs for long-term wealth building.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;