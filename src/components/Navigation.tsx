import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  PlusCircle, 
  BarChart3, 
  Target, 
  Brain,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "transactions", label: "Add Transaction", icon: PlusCircle },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "budget", label: "Budget Goals", icon: Target },
    { id: "ai-advisor", label: "AI Advisor", icon: Brain },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">BudgetAI</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-card w-64 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-primary">BudgetAI</h1>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </Button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r">
        <div className="flex items-center px-6 py-4 border-b">
          <Brain className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-xl font-bold text-primary">BudgetAI</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} className="mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="bg-gradient-to-r from-primary to-primary-hover p-4 rounded-lg text-white">
            <p className="text-sm font-medium">💡 Pro Tip</p>
            <p className="text-xs opacity-90 mt-1">
              Track daily expenses to see patterns in your spending habits.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;