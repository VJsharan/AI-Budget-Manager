# Financier AI v1.0

**Intelligent Personal Finance Tracker** - Take control of your finances with a smart budget manager that leverages AI to provide actionable insights, spending forecasts, and personalized recommendations.

## ✨ Core Features

### 💵 Financial Management
- **Transaction Logging** - Easily add, edit, and delete your income and expenses.
- **Budget Tracking** - Set monthly budgets for different categories (e.g., Groceries, Transport, Entertainment) and monitor your spending against them.
- **Interactive Dashboard** - A central hub displaying your financial health at a glance, including current balance, income vs. expense, and budget progress.
- **Transaction History** - A comprehensive and searchable log of all your financial activities.

### 🤖 AI-Powered Insights
- **Smart Categorization** - AI automatically suggests categories for new transactions based on your past habits.
- **Spending Pattern Analysis** - Discovers your unique financial habits, identifies recurring bills, and highlights unusual spending activity.
- **Predictive Forecasting** - AI-driven predictions for your month-end balance and potential category overspending.
- **Savings Recommendations** - Personalized suggestions on where you can cut back to meet your savings goals.

### 🎨 User Experience & Design
- **Clean & Modern UI** - An intuitive and clutter-free interface designed for ease of use.
- **Data Visualization** - Interactive charts and graphs (powered by Chart.js) to help you visualize your spending breakdown and financial trends over time.
- **Fully Responsive** - Flawless experience across all devices, from desktops to mobile phones.
- **Light & Dark Modes** - Switch between themes for your viewing comfort.

### 🛡️ Security & Performance
- **Privacy First** - All your financial data is stored locally in your browser. Nothing is ever sent to a server.
- **Fast & Lightweight** - Optimized for speed with no external libraries or frameworks, ensuring instant load times.
- **Robust Error Handling** - Gracefully manages input errors and edge cases.

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic and accessible markup.
- **CSS3** - Modern styling with custom properties, Flexbox, and Grid.
- **Vanilla JavaScript (ES6+)** - No frameworks, just pure, modular, and efficient JavaScript.
- **Chart.js** - For beautiful and interactive data visualizations.

### Project Architecture
src/
├── js/
│ ├── app.js # Main application logic and event listeners
│ ├── ai-engine.js # Core AI & data analysis functions
│ ├── ui-controller.js # Manages all UI updates and interactions
│ ├── chart-service.js # Configures and renders all charts
│ └── storage-manager.js # Handles local storage for data persistence
│
├── css/
│ ├── main.css # Global styles, variables, and layout
│ ├── dashboard.css # Styles for the main dashboard components
│ └── theme.css # Styles for light and dark modes
│
└── assets/
├── icons/ # SVG icons
└── images/ # Other image assets

## 🚀 How to Use

1. **Set Your Initial Balance** - Enter your starting cash or bank balance.
2. **Log Transactions** - Add your income and expenses as they occur.
3. **Create Budgets** - Go to the budget section and set monthly limits for your spending categories.
4. **Review Your Dashboard** - Check the dashboard regularly for AI insights, budget tracking, and spending charts.

## 🌟 Key Highlights

- **Zero Frameworks** - Built with pure Vanilla JS for maximum performance and learning.
- **AI-Driven Insights** - Goes beyond simple tracking to provide smart financial advice.
- **Privacy-Focused** - Your data is yours alone. Everything stays in your browser.
- **Modern & Responsive** - A beautiful, intuitive design that works everywhere.
- **Extensible Codebase** - Clean, modular, and well-commented code that is easy to build upon.

## 🖥️ Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Running Locally

### 🌐 Live Demo

Experience Financier AI live:  
  *[Live Demo 👉](https://ai-budget-guide.lovable.app)*

### Using Node.js (with serve)
```bash```
```# If you don't have serve, install it globally```<br>
```npm install -g serve```<br>

```# Run the server from the project's root directory```<br>
```serve . -p 5000```<br>

🎯 Future Roadmap

### Phase 1: Data & Integration 🔗
- CSV/JSON transaction import and export.
- Integration with a public banking API (e.g., Plaid) for automatic transaction syncing.

### Phase 2: Advanced Features 📈
- Debt and investment tracking modules.
- Customizable financial report generation (PDF).
- Goal setting for long-term savings (e.g., "Vacation Fund," "New Car").

### Phase 3: Collaboration & Mobile 📱
- Shared budgets for couples or families.
- Progressive Web App (PWA) features for offline access and a native-like experience.

🤝 Contributing  
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License  
This project is licensed under the MIT License. See the LICENSE file for details.

Built with ❤️ and a passion for clean code by VJsharan.
