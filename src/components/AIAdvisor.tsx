import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, PiggyBank, Target, Lightbulb } from "lucide-react";

const AIAdvisor = () => {
  const insights = [
    {
      icon: <TrendingUp className="h-5 w-5 text-success" />,
      title: "Spending Pattern Analysis",
      description: "You spend 23% more on weekends. Planning meals and entertainment in advance could save ₹3,200 monthly.",
      priority: "high"
    },
    {
      icon: <PiggyBank className="h-5 w-5 text-savings" />,
      title: "Savings Optimization",
      description: "Increase your SIP by ₹5,000/month. With your current savings rate, you could build ₹50L corpus in 10 years.",
      priority: "medium"
    },
    {
      icon: <Target className="h-5 w-5 text-primary" />,
      title: "Budget Rebalancing",
      description: "Consider reallocating ₹1,000 from shopping to healthcare budget based on your actual spending patterns.",
      priority: "low"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            AI Financial Advisor
          </h1>
          <p className="text-muted-foreground">Personalized insights and recommendations</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {insight.icon}
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{insight.description}</p>
              <Button variant="outline" size="sm">
                Apply Suggestion
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Financial Tip */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Weekly Financial Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            🏆 <strong>The 50/30/20 Rule:</strong> Allocate 50% for needs, 30% for wants, and 20% for savings. 
            You're currently at 68/20/12 - try reducing wants by 10% to boost savings!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAdvisor;