import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import TransactionForm from "@/components/TransactionForm";
import Analytics from "@/components/Analytics";
import BudgetGoals from "@/components/BudgetGoals";
import AIAdvisor from "@/components/AIAdvisor";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);

  const handleTransactionAdded = (transaction: any) => {
    setTransactions([...transactions, transaction]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <TransactionForm onTransactionAdded={handleTransactionAdded} />;
      case "analytics":
        return <Analytics />;
      case "budget":
        return <BudgetGoals />;
      case "ai-advisor":
        return <AIAdvisor />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="lg:pl-64">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
