import React, { useState } from 'react';
import { Home, CreditCard, Target, Bell, TrendingUp, DollarSign, Zap, Award, ChevronRight, Plus, CheckCircle, AlertCircle, Calendar, PieChart, ArrowUpRight, ArrowDownRight, Wallet, Building, Smartphone, X, Moon, Sun, BarChart3, Activity, BarChart, LineChart } from 'lucide-react';

const GoalWise = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showLinkAccountModal, setShowLinkAccountModal] = useState(false);
  const [showScenariosModal, setShowScenariosModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', monthly: '', icon: '🎯', color: 'from-blue-500 to-cyan-500', contributions: [] });
  const [addFundsAmount, setAddFundsAmount] = useState('');
  const [linkAccountData, setLinkAccountData] = useState({ name: '', type: 'bank', balance: '' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartType, setChartType] = useState('pie'); // pie, bar, histogram, trend
  const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false);
  const [newInvestment, setNewInvestment] = useState({ name: '', symbol: '', type: 'stock', amount: '', shares: '', currentPrice: '' });

  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Chase Checking', type: 'bank', balance: 3240.50, icon: 'Building', color: 'bg-blue-500' },
    { id: 2, name: 'Discover Card', type: 'credit', balance: -850.20, icon: 'CreditCard', color: 'bg-orange-500' },
    { id: 3, name: 'PayPal', type: 'digital', balance: 456.80, icon: 'Wallet', color: 'bg-indigo-500' },
    { id: 4, name: 'Cash App', type: 'digital', balance: 180.00, icon: 'Smartphone', color: 'bg-green-500' }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 6420, monthly: 450, icon: '🛡️', color: 'from-blue-500 to-cyan-500',
      contributions: [
              { date: 'Oct 15, 2025', amount: 300 },
              { date: 'Oct 1, 2025', amount: 300 },
              { date: 'Sep 15, 2025', amount: 300 }
            ]
     },
    { id: 2, name: 'Vacation to Japan', target: 5000, current: 2100, monthly: 300, icon: '✈️', color: 'from-purple-500 to-pink-500',
      contributions: [
              { date: 'Oct 15, 2025', amount: 300 },
              { date: 'Oct 1, 2025', amount: 300 },
              { date: 'Sep 15, 2025', amount: 300 }
            ]
        },
    { id: 3, name: 'New Laptop', target: 2000, current: 1650, monthly: 200, icon: '💻', color: 'from-green-500 to-emerald-500',
      contributions: [
              { date: 'Oct 15, 2025', amount: 300 },
              { date: 'Oct 1, 2025', amount: 300 },
              { date: 'Sep 15, 2025', amount: 300 }
            ] }
  ]);


  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Netflix', amount: 15.99, nextBill: 'Oct 24', category: 'Entertainment' },
    { id: 2, name: 'Spotify', amount: 10.99, nextBill: 'Oct 18', category: 'Entertainment' },
    { id: 3, name: 'Apple iCloud', amount: 2.99, nextBill: 'Oct 20', category: 'Storage' },
    { id: 4, name: 'Adobe Creative', amount: 54.99, nextBill: 'Oct 25', category: 'Productivity' },
    { id: 5, name: 'Planet Fitness', amount: 24.99, nextBill: 'Nov 1', category: 'Health' }
  ]);

  const [investments, setInvestments] = useState([
    { id: 1, name: 'Apple Inc.', symbol: 'AAPL', type: 'stock', shares: 10, currentPrice: 175.50, purchasePrice: 150.00, amount: 1755.00, change: 25.50, changePercent: 14.5 },
    { id: 2, name: 'Bitcoin', symbol: 'BTC', type: 'crypto', shares: 0.5, currentPrice: 45000, purchasePrice: 40000, amount: 22500, change: 2500, changePercent: 12.5 },
    { id: 3, name: 'Tesla Inc.', symbol: 'TSLA', type: 'stock', shares: 5, currentPrice: 250.00, purchasePrice: 200.00, amount: 1250.00, change: 250.00, changePercent: 25.0 },
    { id: 4, name: 'Ethereum', symbol: 'ETH', type: 'crypto', shares: 2, currentPrice: 3000, purchasePrice: 2500, amount: 6000, change: 1000, changePercent: 20.0 }
  ]);

  const [transactions, setTransactions] = useState([
    { name: 'Whole Foods', amount: -67.43, category: 'Groceries', type: 'spending', date: 'Today' },
    { name: 'Netflix', amount: -15.99, category: 'Subscription', type: 'subscription', date: 'Today' },
    { name: 'Paycheck', amount: 3200.00, category: 'Income', type: 'income', date: 'Yesterday' },
    { name: 'Rent Payment', amount: -1500.00, category: 'Housing', type: 'transfer', date: '2 days ago' },
    { name: 'Discover Payment', amount: -250.00, category: 'Credit Card', type: 'loan', date: '3 days ago' },
    { name: 'AAPL Stock Purchase', amount: -1500.00, category: 'Investment', type: 'investment', date: '1 week ago' },
    { name: 'BTC Purchase', amount: -20000.00, category: 'Investment', type: 'investment', date: '2 weeks ago' },
    { name: 'AAPL Dividend', amount: 25.00, category: 'Investment', type: 'dividend', date: '3 weeks ago' }
  ]);

  // Function to add new goal
  /*
  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.monthly) {
      const goal = {
        id: Math.max(...goals.map(g => g.id)) + 1,
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        current: 0,
        monthly: parseFloat(newGoal.monthly),
        icon: newGoal.icon,
        color: newGoal.color
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: '', target: '', monthly: '', icon: '🎯', color: 'from-blue-500 to-cyan-500' });
      setShowAddGoalModal(false);
    }
  };
  */

  // Function to add funds to goal
  /*
  const handleAddFunds = () => {
    if (addFundsAmount && selectedGoal) {
      const amount = parseFloat(addFundsAmount);
      setGoals(goals.map(goal =>
        goal.id === selectedGoal.id
          ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
          : goal
      ));
      setAddFundsAmount('');
      setShowAddFundsModal(false);
    }
  };
  */

  // Function to edit goal
  /*
  const handleEditGoal = () => {
    if (selectedGoal) {
      setGoals(goals.map(goal =>
        goal.id === selectedGoal.id
          ? { ...goal, ...newGoal, target: parseFloat(newGoal.target), monthly: parseFloat(newGoal.monthly) }
          : goal
      ));
      setShowEditGoalModal(false);
    }
  };
*/

  // Function to link new account
  /*
  const handleLinkAccount = () => {
    if (linkAccountData.name && linkAccountData.balance) {
      const account = {
        id: Math.max(...accounts.map(a => a.id)) + 1,
        name: linkAccountData.name,
        type: linkAccountData.type,
        balance: parseFloat(linkAccountData.balance),
        icon: linkAccountData.type === 'bank' ? 'Building' : linkAccountData.type === 'credit' ? 'CreditCard' : 'Wallet',
        color: linkAccountData.type === 'bank' ? 'bg-blue-500' : linkAccountData.type === 'credit' ? 'bg-orange-500' : 'bg-indigo-500'
      };
      setAccounts([...accounts, account]);
      setLinkAccountData({ name: '', type: 'bank', balance: '' });
      setShowLinkAccountModal(false);
    }
  };
*/

  // Function to cancel subscription
  const handleCancelSubscription = (subscriptionId) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
  };

  // Function to add new investment
  /*
  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.symbol && newInvestment.amount && newInvestment.shares) {
      const investment = {
        id: Math.max(...investments.map(i => i.id)) + 1,
        name: newInvestment.name,
        symbol: newInvestment.symbol,
        type: newInvestment.type,
        shares: parseFloat(newInvestment.shares),
        currentPrice: parseFloat(newInvestment.currentPrice || newInvestment.amount / parseFloat(newInvestment.shares)),
        purchasePrice: parseFloat(newInvestment.amount) / parseFloat(newInvestment.shares),
        amount: parseFloat(newInvestment.amount),
        change: 0,
        changePercent: 0
      };
      setInvestments([...investments, investment]);
      setNewInvestment({ name: '', symbol: '', type: 'stock', amount: '', shares: '', currentPrice: '' });
      setShowAddInvestmentModal(false);
    }
  };
  */

  // Calculate total investment value and gains
  const getTotalInvestmentValue = () => {
    return investments.reduce((total, inv) => total + inv.amount, 0);
  };

  const getTotalInvestmentGains = () => {
    return investments.reduce((total, inv) => total + inv.change, 0);
  };

  const getTotalInvestmentGainsPercent = () => {
    const totalValue = getTotalInvestmentValue();
    const totalGains = getTotalInvestmentGains();
    return totalValue > 0 ? (totalGains / (totalValue - totalGains)) * 100 : 0;
  };

  // Calculate spending by category
  const getSpendingByCategory = () => {
    const categories = {};
    transactions.forEach(tx => {
      if (tx.amount < 0) { // Only spending transactions
        const category = tx.category;
        if (!categories[category]) {
          categories[category] = 0;
        }
        categories[category] += Math.abs(tx.amount);
      }
    });

    const total = Object.values(categories).reduce((sum, amount) => sum + amount, 0);
    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount,
      percent: total > 0 ? (amount / total) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);
  };

  // Calculate monthly spending data
  const getMonthlySpendingData = () => {
    return [
      { month: 'Aug', spending: 2100, income: 3000, savings: 900 },
      { month: 'Sep', spending: 2300, income: 3100, savings: 800 },
      { month: 'Oct', spending: 2800, income: 3200, savings: 400 },
      { month: 'Nov', spending: 2600, income: 3200, savings: 600 },
      { month: 'Dec', spending: 2400, income: 3200, savings: 800 },
      { month: 'Jan', spending: 2200, income: 3200, savings: 1000 }
    ];
  };

  // Calculate spending distribution
  const getSpendingDistribution = () => {
    const spendingAmounts = transactions
      .filter(tx => tx.amount < 0)
      .map(tx => Math.abs(tx.amount));

    const ranges = [
      { range: '$0-50', count: 0, min: 0, max: 50 },
      { range: '$50-100', count: 0, min: 50, max: 100 },
      { range: '$100-200', count: 0, min: 100, max: 200 },
      { range: '$200-500', count: 0, min: 200, max: 500 },
      { range: '$500-1000', count: 0, min: 500, max: 1000 },
      { range: '$1000+', count: 0, min: 1000, max: Infinity }
    ];

    spendingAmounts.forEach(amount => {
      const range = ranges.find(r => amount >= r.min && amount < r.max);
      if (range) range.count++;
    });

    return ranges;
  };

  const upcomingBills = [
    { name: 'Discover Card', amount: 850.20, dueDate: 'Oct 22', streak: 12, status: 'upcoming' },
    { name: 'Electric Bill', amount: 145.00, dueDate: 'Oct 25', streak: 8, status: 'upcoming' },
    { name: 'Internet', amount: 79.99, dueDate: 'Oct 28', streak: 15, status: 'paid' }
  ];

  const getIcon = (iconName) => {
    const icons = {
      Building: Building,
      CreditCard: CreditCard,
      Wallet: Wallet,
      Smartphone: Smartphone
    };
    return icons[iconName] || Wallet;
  };

  // Remove error highlight from valid input fields
  const unhighlightValidInput = (e) => {
    if (e.target.value) {
      e.target.classList.remove('border-red-500', 'focus:ring-red-500');
      e.target.removeEventListener('input', unhighlightValidInput);
    }
  };

  // Modal Components
  const AddGoalModal = ({  }) => {
    const [newGoal, setNewGoal] = useState({
      name: '',
      target: '',
      monthly: '',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500',
      contributions: []
    });

    const handleAddGoal = () => {
      if (newGoal.name && newGoal.target && newGoal.monthly) {
        const goal = {
          id: Math.max(0, ...goals.map(g => g.id)) + 1,
          name: newGoal.name,
          target: parseFloat(newGoal.target),
          current: 0,
          monthly: parseFloat(newGoal.monthly),
          icon: newGoal.icon,
          color: newGoal.color,
          contributions: []
        };

        setGoals(prev => [...prev, goal]);
        setShowAddGoalModal(false);
        
        if (activeScreen === 'goals') {
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }, 10);
        }
      } else {
        const inputs = document.querySelectorAll('input[required]');
        inputs.forEach(input => {
          if (!input.value) {
            input.classList.add('border-red-500', 'focus:ring-red-500');
            
            input.addEventListener('input', unhighlightValidInput);
          }
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className={`${isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700' : 'bg-white/95 backdrop-blur-xl border border-white/20'} rounded-3xl p-6 w-full max-w-md shadow-2xl`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Add New Goal</h2>
            <button onClick={() => setShowAddGoalModal(false)} className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full transition-all`}>
              <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Goal Name <span className="text-red-500">* <sup>(required)</sup></span> </label>
              <input
                required
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
                placeholder="e.g., Emergency Fund"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Target Amount ($) <span className="text-red-500">* <sup>(required)</sup></span> </label>
              <input
                required
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
                placeholder="10000"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Monthly Savings ($) <span className="text-red-500">* <sup>(required)</sup></span></label>
              <input
                required
                type="number"
                value={newGoal.monthly}
                onChange={(e) => setNewGoal({ ...newGoal, monthly: e.target.value })}
                className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
                placeholder="500"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Icon</label>
              <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {['🎯', '🛡️', '✈️', '💻', '🏠', '🚗', '🎓', '💍', '💰', '📱', '🎮', '📚', '🏖️', '🎨', '🍕', '☕'].map(icon => (
                  <button
                    key={icon}
                    onClick={() => setNewGoal({ ...newGoal, icon })}
                    className={`p-3 rounded-xl text-2xl backdrop-blur-sm transition-all ${newGoal.icon === icon
                      ? `${isDarkMode ? 'bg-blue-500/30 border-2 border-blue-400' : 'bg-blue-100 border-2 border-blue-500'}`
                      : `${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600' : 'bg-gray-100 hover:bg-gray-200'} border border-gray-200`}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Color Theme</label>
              <div className="flex gap-2">
                {[
                  { name: 'Blue', value: 'from-blue-500 to-cyan-500' },
                  { name: 'Purple', value: 'from-purple-500 to-pink-500' },
                  { name: 'Green', value: 'from-green-500 to-emerald-500' },
                  { name: 'Orange', value: 'from-orange-500 to-red-500' }
                ].map(color => (
                  <button
                    key={color.value}
                    onClick={() => setNewGoal({ ...newGoal, color: color.value })}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.value} backdrop-blur-sm transition-all ${newGoal.color === color.value ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowAddGoalModal(false)}
              className={`flex-1 py-3 px-4 ${isDarkMode ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-xl font-semibold backdrop-blur-sm transition-all`}
            >
              Cancel
            </button>
            <button
              onClick={handleAddGoal}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 backdrop-blur-sm transition-all shadow-lg"
            >
              Add Goal
            </button>
          </div>
        </div>
      </div>
    );
  }

  const AddFundsModal = () => {
    const [addFundsAmount, setAddFundsAmount] = useState('');

    const handleAddFunds = () => {
    if (addFundsAmount && selectedGoal) {
      const [_, month, day, year] = (new Date().toString()).split(" ");
      const date = `${month} ${day}, ${year}`;

      let amount = parseFloat(addFundsAmount);
      amount = Math.min(amount, selectedGoal.target - selectedGoal.current);
      setGoals(goals.map(goal =>
        goal.id === selectedGoal.id
          ? { ...goal, current: Math.min(goal.current + amount, goal.target), 
            contributions: [{ date, amount }, ...goal.contributions] }
          : goal
      ));
      setAddFundsAmount('');
      setShowAddFundsModal(false);
    } else {
      const input = document.querySelector('input[type="number"]');
      if (input) {
        input.classList.add('border-red-500', 'focus:ring-red-500');
        input.addEventListener('input', unhighlightValidInput);
      }
    }
  };

    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700' : 'bg-white/95 backdrop-blur-xl border border-white/20'} rounded-3xl p-6 w-full max-w-md`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Add Funds</h2>
          <button onClick={() => setShowAddFundsModal(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${selectedGoal?.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3`}>
            {selectedGoal?.icon}
          </div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedGoal?.name}</h3>
          <p className="text-sm text-gray-500">Current: ${selectedGoal?.current.toLocaleString()} / ${selectedGoal?.target.toLocaleString()}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Amount to Add ($) <span className="text-red-500">* <sup>(required)</sup></span></label>
            <input
              required
              type="number"
              value={addFundsAmount}
              onChange={(e) => setAddFundsAmount(e.target.value)}
              className={`w-full p-3 border rounded-xl focus:ring-2 focus:border-transparent ${isDarkMode ? 'bg-gray-800/50 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} backdrop-blur-sm transition-all`}
              placeholder="500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowAddFundsModal(false)}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${isDarkMode ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} backdrop-blur-sm`}
          >
            Cancel
          </button>
          <button
            onClick={handleAddFunds}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
  }

  const LinkAccountModal = () => {
    const[linkAccountData, setLinkAccountData] = useState({ name: '', type: 'bank', balance: '' });
    
    const handleLinkAccount = () => {
    if (linkAccountData.name && linkAccountData.balance) {
      const account = {
        id: Math.max(...accounts.map(a => a.id)) + 1,
        name: linkAccountData.name,
        type: linkAccountData.type,
        balance: parseFloat(linkAccountData.balance),
        icon: linkAccountData.type === 'bank' ? 'Building' : linkAccountData.type === 'credit' ? 'CreditCard' : 'Wallet',
        color: linkAccountData.type === 'bank' ? 'bg-blue-500' : linkAccountData.type === 'credit' ? 'bg-orange-500' : 'bg-indigo-500'
      };
      setAccounts([...accounts, account]);
      setLinkAccountData({ name: '', type: 'bank', balance: '' });
      setShowLinkAccountModal(false);
    } else {
      const inputs = document.querySelectorAll('input[required]');
      inputs.forEach(input => {
        if (!input.value) {
          input.classList.add('border-red-500', 'focus:ring-red-500');
          input.addEventListener('input', unhighlightValidInput);
        }
      });
    }
  };
    
    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700' : 'bg-white /95 backdrop-blur-xl border border-white/20'} rounded-3xl p-6 w-full max-w-md`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold  ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Link Account</h2>
          <button onClick={() => setShowLinkAccountModal(false)} className={`p-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Account Name <span className="text-red-500">* <sup>(required)</sup></span></label>
            <input
              required
              type="text"
              value={linkAccountData.name}
              onChange={(e) => setLinkAccountData({ ...linkAccountData, name: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm transition-all`}
              placeholder="e.g., Chase Checking"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Account Type</label>
            <select
              value={linkAccountData.type}
              onChange={(e) => setLinkAccountData({ ...linkAccountData, type: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm transition-all`}
            >
              <option className={`${isDarkMode ? 'bg-gray-900 border-gray-600 text-white' : ''}`} value="bank">Bank Account</option>
              <option className={`${isDarkMode ? 'bg-gray-900 border-gray-600 text-white' : ''}`} value="credit">Credit Card</option>
              <option className={`${isDarkMode ? 'bg-gray-900 border-gray-600 text-white' : ''}`} value="digital">Digital Wallet</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Current Balance ($) <span className="text-red-500">* <sup>(required)</sup></span></label>
            <input
              required
              type="number"
              step="0.01"
              value={linkAccountData.balance}
              onChange={(e) => setLinkAccountData({ ...linkAccountData, balance: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm transition-all`}
              placeholder="3240.50"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowLinkAccountModal(false)}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${isDarkMode ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Cancel
          </button>
          <button
            onClick={handleLinkAccount}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Link Account
          </button>
        </div>
      </div>
    </div>
  );
}

  const EditGoalModal = () => {
    const [newGoal, setNewGoal] = useState({
      name: selectedGoal?.name || '',
      target: selectedGoal?.target || '',
      monthly: selectedGoal?.monthly || '',
      icon: selectedGoal?.icon || '🎯',
      color: selectedGoal?.color || 'from-blue-500 to-cyan-500'
    });
    
    const handleEditGoal = () => {
      if (selectedGoal) {
        newGoal.name = (newGoal.name) ? newGoal.name : selectedGoal.name;
        newGoal.target = (newGoal.target) ? newGoal.target : selectedGoal.target;
        newGoal.monthly = (newGoal.monthly) ? newGoal.monthly : selectedGoal.monthly;
        setGoals(goals.map(goal =>
          goal.id === selectedGoal.id
            ? { ...goal, ...newGoal, target: parseFloat(newGoal.target), monthly: parseFloat(newGoal.monthly) }
            : goal
        ));
        setShowEditGoalModal(false);
      }
  };

    return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700' : 'bg-white/95 backdrop-blur-xl border border-white/20'} rounded-3xl p-6 w-full max-w-md shadow-2xl`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Edit Goal</h2>
          <button onClick={() => setShowEditGoalModal(false)} className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full transition-all`}>
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Goal Name</label>
            <input
              type="text"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
              placeholder={selectedGoal.name}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Target Amount ($)</label>
            <input
              type="number"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
              placeholder={selectedGoal.target}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Monthly Savings ($)</label>
            <input
              type="number"
              value={newGoal.monthly}
              onChange={(e) => setNewGoal({ ...newGoal, monthly: e.target.value })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
              placeholder={selectedGoal.monthly}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Icon</label>
            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
              {['🎯', '🛡️', '✈️', '💻', '🏠', '🚗', '🎓', '💍', '💰', '📱', '🎮', '📚', '🏖️', '🎨', '🍕', '☕'].map(icon => (
                <button
                  key={icon}
                  onClick={() => setNewGoal({ ...newGoal, icon })}
                  className={`p-3 rounded-xl text-2xl backdrop-blur-sm transition-all ${newGoal.icon === icon
                    ? `${isDarkMode ? 'bg-blue-500/30 border-2 border-blue-400' : 'bg-blue-100 border-2 border-blue-500'}`
                    : `${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600' : 'bg-gray-100 hover:bg-gray-200'} border border-gray-200`}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Color Theme</label>
            <div className="flex gap-2">
              {[
                { name: 'Blue', value: 'from-blue-500 to-cyan-500' },
                { name: 'Purple', value: 'from-purple-500 to-pink-500' },
                { name: 'Green', value: 'from-green-500 to-emerald-500' },
                { name: 'Orange', value: 'from-orange-500 to-red-500' }
              ].map(color => (
                <button
                  key={color.value}
                  onClick={() => setNewGoal({ ...newGoal, color: color.value })}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.value} backdrop-blur-sm transition-all ${newGoal.color === color.value ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowEditGoalModal(false)}
            className={`flex-1 py-3 px-4 ${isDarkMode ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-xl font-semibold backdrop-blur-sm transition-all`}
          >
            Cancel
          </button>
          <button
            onClick={handleEditGoal}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 backdrop-blur-sm transition-all shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
  }

  const ScenariosModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-3xl p-6 w-full max-w-md ${isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700' : 'bg-white/95 backdrop-blur-xl border border-white/20'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>What-If Scenarios</h2>
          <button onClick={() => setShowScenariosModal(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 mb-2">Reduce Dining Out</h3>
            <p className="text-sm text-gray-600 mb-3">Cut dining expenses by 30%</p>
            <div className="text-lg font-bold text-green-600">+$135/month saved</div>
            <div className="text-xs text-gray-500 mt-1">Reach Japan goal 2 months earlier</div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 mb-2">Switch to Annual Plans</h3>
            <p className="text-sm text-gray-600 mb-3">Netflix & Spotify annual subscriptions</p>
            <div className="text-lg font-bold text-blue-600">+$20/month saved</div>
            <div className="text-xs text-gray-500 mt-1">Reach Emergency Fund 1 month earlier</div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 mb-2">Increase Monthly Savings</h3>
            <p className="text-sm text-gray-600 mb-3">Boost Emergency Fund contribution by $100</p>
            <div className="text-lg font-bold text-purple-600">+$100/month saved</div>
            <div className="text-xs text-gray-500 mt-1">Reach goal 2 months earlier</div>
          </div>
        </div>

        <button
          onClick={() => setShowScenariosModal(false)}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all mt-6"
        >
          Close
        </button>
      </div>
    </div>
  );

  const AddInvestmentModal = () => { 
    const [newInvestment, setNewInvestment] = useState({ name: '', symbol: '', type: 'stock', amount: '', shares: '', currentPrice: '' });

    const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.symbol && newInvestment.amount && newInvestment.shares) {
      const investment = {
        id: Math.max(...investments.map(i => i.id)) + 1,
        name: newInvestment.name,
        symbol: newInvestment.symbol,
        type: newInvestment.type,
        shares: parseFloat(newInvestment.shares),
        currentPrice: parseFloat(newInvestment.currentPrice || newInvestment.amount / parseFloat(newInvestment.shares)),
        purchasePrice: parseFloat(newInvestment.amount) / parseFloat(newInvestment.shares),
        amount: parseFloat(newInvestment.amount),
        change: 0,
        changePercent: 0
      };
      setInvestments([...investments, investment]);
      setNewInvestment({ name: '', symbol: '', type: 'stock', amount: '', shares: '', currentPrice: '' });
      setShowAddInvestmentModal(false);

      if (activeScreen == "investments") {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight - window.innerHeight - 150, behavior: 'smooth' });
        }, 10);
      }
    } else {
      const inputs = document.querySelectorAll('input[required]');
      inputs.forEach(input => {
        if (!input.value) {
          input.classList.add('border-red-500', 'focus:ring-red-500');
          input.addEventListener('input', unhighlightValidInput);
        }
      });
    }
  };
  
    return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700' : 'bg-white/95 backdrop-blur-xl border border-white/20'} rounded-3xl p-6 w-full max-w-md shadow-2xl`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Add Investment</h2>
          <button onClick={() => setShowAddInvestmentModal(false)} className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-full transition-all`}>
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Company/Asset Name <span className="text-red-500">* <sup>(required)</sup></span></label>
            <input
              required
              type="text"
              value={newInvestment.name}
              onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
              placeholder="e.g., Apple Inc."
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Symbol <span className="text-red-500">* <sup>(required)</sup></span></label>
            <input
              required
              type="text"
              value={newInvestment.symbol}
              onChange={(e) => setNewInvestment({ ...newInvestment, symbol: e.target.value.toUpperCase() })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
              placeholder="e.g., AAPL"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Type</label>
            <select
              value={newInvestment.type}
              onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
            >
              <option value="stock">Stock</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="etf">ETF</option>
              <option value="bond">Bond</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Shares/Amount <span className="text-red-500">* <sup>(required)</sup></span></label>
            <input
              required
              type="number"
              step="0.000001"
              value={newInvestment.shares}
              onChange={(e) => setNewInvestment({ ...newInvestment, shares: e.target.value })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
              placeholder="e.g., 10"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Total Investment ($) <span className="text-red-500">* <sup>(required)</sup></span></label>
            <input
              required
              type="number"
              step="0.01"
              value={newInvestment.amount}
              onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
              className={`w-full p-3 ${isDarkMode ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'} border rounded-xl backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all`}
              placeholder="e.g., 1500.00"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowAddInvestmentModal(false)}
            className={`flex-1 py-3 px-4 ${isDarkMode ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-xl font-semibold backdrop-blur-sm transition-all`}
          >
            Cancel
          </button>
          <button
            onClick={handleAddInvestment}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 backdrop-blur-sm transition-all shadow-lg"
          >
            Add Investment
          </button>
        </div>
      </div>
    </div>
  );
  }

  const HomeScreen = () => (
    <div className="space-y-6 pb-24">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-200 text-sm mb-1">Total Balance</p>
            <h1 className="text-4xl font-bold">$3,027.10</h1>
            <p className="text-blue-200 text-sm mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +$420 this month
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="bg-white/20 backdrop-blur p-3 rounded-xl hover:bg-white/30 transition-all">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setActiveScreen('notifications')} className="bg-white/20 backdrop-blur p-3 rounded-xl hover:bg-white/30 transition-all">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-blue-200">Income</p>
            <p className="text-lg font-bold">$3.2k</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-blue-200">Spending</p>
            <p className="text-lg font-bold">$2.1k</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-blue-200">Saved</p>
            <p className="text-lg font-bold">$950</p>
          </div>
        </div>
      </div>

      {/* Robinhood-style Investment Card */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Investments</h2>
            <p className="text-green-200 text-sm">Portfolio Value</p>
          </div>
          <button onClick={() => setActiveScreen('investments')} className="bg-white/20 backdrop-blur p-2 rounded-lg hover:bg-white/30 transition-all">
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-3xl font-bold">${getTotalInvestmentValue().toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-1">
            {getTotalInvestmentGains() >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-200" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-200" />
            )}
            <span className={`text-sm font-semibold ${getTotalInvestmentGains() >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {getTotalInvestmentGains() >= 0 ? '+' : ''}${getTotalInvestmentGains().toLocaleString()} ({getTotalInvestmentGainsPercent().toFixed(1)}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <p className="text-xs text-green-200">Top Performer</p>
            <p className="text-sm font-bold">{investments.find(inv => inv.changePercent === Math.max(...investments.map(i => i.changePercent)))?.symbol || 'N/A'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <p className="text-xs text-green-200">Total Holdings</p>
            <p className="text-sm font-bold">{investments.length}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Active Goals</h2>
          <button onClick={() => setActiveScreen('goals')} className="text-blue-600 text-sm font-semibold flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {goals.slice(0, 2).map(goal => (
            <div key={goal.id} onClick={() => { setSelectedGoal(goal); setActiveScreen('goalDetail'); }} className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white'} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{goal.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  {Math.round((goal.current / goal.target) * 100)}%
                </span>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
                <div className={`bg-gradient-to-r ${goal.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${(goal.current / goal.target) * 100}%` }}></div>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mt-2`}>Save ${goal.monthly}/month • {Math.ceil((goal.target - goal.current) / goal.monthly)} months remaining</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setShowAddGoalModal(true)} className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all">
            <Plus className="w-6 h-6 mb-2" />
            <p className="font-semibold">Add Goal</p>
          </button>
          <button onClick={() => setActiveScreen('bills')} className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all">
            <Calendar className="w-6 h-6 mb-2" />
            <p className="font-semibold">View Bills</p>
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activity</h2>
          <button onClick={() => setActiveScreen('accounts')} className="text-blue-600 text-sm font-semibold">View All</button>
        </div>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md divide-y overflow-hidden`}>
          {transactions.slice(0, 3).map((tx, i) => (
            <div key={i} className={`p-4 flex justify-between items-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} transition-colors`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' :
                    tx.type === 'subscription' ? 'bg-purple-100' :
                      tx.type === 'transfer' ? 'bg-blue-100' :
                        tx.type === 'loan' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                  <DollarSign className={`w-5 h-5 ${tx.type === 'income' ? 'text-green-600' :
                      tx.type === 'subscription' ? 'text-purple-600' :
                        tx.type === 'transfer' ? 'text-blue-600' :
                          tx.type === 'loan' ? 'text-orange-600' : 'text-gray-600'
                    }`} />
                </div>
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{tx.name}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.category} • {tx.date}</p>
                </div>
              </div>
              <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AccountsScreen = () => (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Accounts</h1>
        <button onClick={() => setShowLinkAccountModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> Link Account
        </button>
      </div>

      <div className="space-y-3">
        {accounts.map((account, i) => {
          const IconComponent = getIcon(account.icon);
          return (
            <div key={i} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`${account.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{account.name}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} capitalize`}>{account.type} Account</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${account.balance < 0 ? 'text-red-600' :  isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Available</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>All Transactions</h2>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md divide-y overflow-hidden`}>
          {transactions.map((tx, i) => (
            <div key={i} className={`p-4 flex justify-between items-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} transition-colors cursor-pointer`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' :
                    tx.type === 'subscription' ? 'bg-purple-100' :
                      tx.type === 'transfer' ? 'bg-blue-100' :
                        tx.type === 'loan' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                  {tx.type === 'income' ? <ArrowDownRight className="w-5 h-5 text-green-600" /> :
                    tx.type === 'subscription' ? <Zap className="w-5 h-5 text-purple-600" /> :
                      tx.type === 'transfer' ? <ArrowUpRight className="w-5 h-5 text-blue-600" /> :
                        tx.type === 'loan' ? <CreditCard className="w-5 h-5 text-orange-600" /> :
                          <DollarSign className="w-5 h-5 text-gray-600" />}
                </div>
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{tx.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.category}</span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>•</span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.date}</span>
                  </div>
                </div>
              </div>
              <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' :  isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GoalsScreen = () => (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold  ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Financial Goals</h1>
        <button onClick={() => setShowAddGoalModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all">
          <Plus className="w-4 h-4" /> New Goal
        </button>
      </div>

      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-white/20 backdrop-blur p-2 rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold mb-1">AI Insight</h3>
            <p className="text-sm text-purple-100">Based on your spending patterns, you can save an extra $150/month by reducing dining out expenses. This could help you reach your Japan vacation goal 2 months earlier!</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} onClick={() => { setSelectedGoal(goal); setActiveScreen('goalDetail'); }} className={`rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                  {goal.icon}
                </div>
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} text-lg`}>{goal.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold">
                {Math.round((goal.current / goal.target) * 100)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className={`bg-gradient-to-r ${goal.color} h-3 rounded-full transition-all duration-500 shadow-sm`} style={{ width: `${(goal.current / goal.target) * 100}%` }}></div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className={` ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-2`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monthly</p>
                <p className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>${goal.monthly}</p>
              </div>
              <div className={` ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-2`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remaining</p>
                <p className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>${(goal.target - goal.current).toLocaleString()}</p>
              </div>
              <div className={` ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-2`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                <p className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{Math.ceil((goal.target - goal.current) / goal.monthly)}mo</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getTargetDate = (monthsRemaining) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthsRemaining);
    return currentDate.toLocaleString('default', { month: 'short', year: 'numeric' });
  }

  const GoalDetailScreen = () => {
    const [selectedGoalState, setSelectedGoalState] = useState(goals.find(g => g.id === selectedGoal.id));

    if (!selectedGoal) return null;
    const progress = (selectedGoalState.current / selectedGoalState.target) * 100;
    const remaining = selectedGoalState.target - selectedGoalState.current;
    const monthsRemaining = Math.ceil(remaining / selectedGoalState.monthly);

    return (
      <div className="space-y-6 pb-24">
        <button onClick={() => setActiveScreen('goals')} className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          <ChevronRight className="w-5 h-5 rotate-180" /> Back to Goals
        </button>

        <div className={`bg-gradient-to-br ${selectedGoalState.color} rounded-3xl p-6 text-white shadow-xl`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-4xl">
              {selectedGoalState.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{selectedGoalState.name}</h1>
              <p className="text-white/80">Target: ${selectedGoalState.target.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Progress</span>
              <span className="font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>${selectedGoalState.current.toLocaleString()}</span>
              <span>${selectedGoalState.target.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <p className="text-xs text-white/70">Monthly Savings</p>
              <p className="text-2xl font-bold">${selectedGoalState.monthly}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <p className="text-xs text-white/70">Months Left</p>
              <p className="text-2xl font-bold">{monthsRemaining}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Smart Suggestions</h2>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Boost Your Savings</h3>
                  <p className="text-sm text-gray-600">Save an extra $100/month to reach your goal 1 month earlier</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">On Track</h3>
                  <p className="text-sm text-gray-600">You're saving consistently! Keep it up to reach your goal by {getTargetDate(monthsRemaining)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Recent Contributions</h2>
          <div className={`rounded-2xl shadow-md divide-y ${isDarkMode ? 'bg-gray-800 border' : 'bg-white'}`}>
            {selectedGoalState.contributions.map((contribution, i) => (
              <div key={i} className="p-4 flex justify-between items-center">
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Manual Contribution</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{contribution.date}</p>
                </div>
                <p className="font-bold text-green-600">+${contribution.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setShowAddFundsModal(true)} className="bg-blue-600 text-white rounded-xl p-4 font-semibold hover:bg-blue-700 transition-all">
            Add Funds
          </button>
          <button onClick={() => { setNewGoal({ ...selectedGoalState, name: selectedGoalState.name, target: selectedGoalState.target.toString(), monthly: selectedGoalState.monthly.toString(), icon: selectedGoalState.icon, color: selectedGoalState.color }); setShowEditGoalModal(true); }} className="bg-gray-100 text-gray-700 rounded-xl p-4 font-semibold hover:bg-gray-200 transition-all">
            Edit Goal
          </button>
        </div>
      </div>
    );
  };

  const BillsScreen = () => (
    <div className="space-y-6 pb-24">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Bills & Credit</h1>

      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6" />
              <h2 className="text-xl font-bold">Payment Streak</h2>
            </div>
            <p className="text-white/90 text-sm">Keep your streak alive!</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">12</div>
            <p className="text-xs text-white/80">Months</p>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
          <p className="text-sm">🔥 All bills paid on time for 12 months straight</p>
        </div>
      </div>

      <div>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Upcoming Bills</h2>
        <div className="space-y-3">
          {upcomingBills.map((bill, i) => (
            <div key={i} className={`rounded-2xl p-4 shadow-md border-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} ${bill.status === 'paid' ? `${isDarkMode ? 'border-green-700 bg-green-900' : 'border-green-200 bg-green-50'}` : `${isDarkMode ? 'border-orange-700' : 'border-orange-200'}`}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{bill.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Due {bill.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>${bill.amount.toFixed(2)}</p>
                  {bill.status === 'paid' ? (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Paid
                    </span>
                  ) : (
                    <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded-full font-medium">
                      5 days
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
                <Award className="w-4 h-4 text-amber-600" />
                <p className="text-xs text-amber-800 font-medium">{bill.streak} month payment streak</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white shadow-xl">
        <h3 className="font-bold text-lg mb-3">Credit Score</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-bold">742</p>
            <p className="text-indigo-200 text-sm mt-1">Good • +8 this month</p>
          </div>
          <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <TrendingUp className="w-12 h-12" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Active Subscriptions</h2>
          <button onClick={() => setActiveScreen('subscriptions')} className="text-blue-600 text-sm font-semibold">View All</button>
        </div>
        <div className={`rounded-2xl shadow-md p-4 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-3">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Monthly Cost</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>${subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            {subscriptions.slice(0, 3).map((sub, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{sub.name}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>${sub.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SubscriptionsScreen = () => (
    <div className="space-y-6 pb-24">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Subscriptions</h1>

      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-5 text-white shadow-xl">
        <h3 className="font-semibold mb-2">Total Monthly Spend</h3>
        <p className="text-4xl font-bold mb-1">${subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}</p>
        <p className="text-purple-100 text-sm">{subscriptions.length} active subscriptions</p>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="bg-amber-500 p-2 rounded-lg">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Optimization Tip</h3>
            <p className="text-sm text-gray-600">You could save $20/month by switching to an annual plan for Netflix and Spotify</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Active Subscriptions</h2>
        <div className="space-y-3">
          {subscriptions.map((sub, i) => (
            <div key={i} className={`rounded-2xl p-4 shadow-md hover:shadow-lg transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{sub.name}</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{sub.category}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>${sub.amount}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>per month</p>
                </div>
              </div>
              <div className={`flex justify-between items-center mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Next billing: {sub.nextBill}</p>
                <button onClick={() => handleCancelSubscription(sub.id)} className="text-xs text-red-600 font-semibold hover:text-red-700">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const InsightsScreen = () => (
    <div className="space-y-6 pb-24">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Insights & Analytics</h1>

      {/* Chart Type Toggle */}
      <div className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Chart Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { type: 'pie', label: 'Pie Chart', icon: PieChart },
            { type: 'bar', label: 'Bar Chart', icon: BarChart3 },
            { type: 'histogram', label: 'Histogram', icon: BarChart },
            { type: 'trend', label: 'Trend Line', icon: LineChart }
          ].map(chart => (
            <button
              key={chart.type}
              onClick={() => setChartType(chart.type)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${chartType === chart.type
                  ? 'bg-blue-600 text-white'
                  : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }`}
            >
              <chart.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{chart.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Chart Display */}
      <div className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          {chartType === 'pie' && 'Spending by Category'}
          {chartType === 'bar' && 'Monthly Spending Comparison'}
          {chartType === 'histogram' && 'Spending Distribution'}
          {chartType === 'trend' && 'Spending Trends'}
        </h3>

        {chartType === 'pie' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {(() => {
                    const spendingData = getSpendingByCategory();
                    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
                    let cumulativePercentage = 0;

                    return spendingData.map((item, index) => {
                      const percentage = item.percent;
                      const circumference = 2 * Math.PI * 45; // radius = 45
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((cumulativePercentage / 100) * circumference);
                      cumulativePercentage += percentage;

                      return (
                        <circle
                          key={item.category}
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={colors[index % colors.length]}
                          strokeWidth="8"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      ${getSpendingByCategory().reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Spending</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {getSpendingByCategory().map((item, index) => {
                const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
                return (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        ${item.amount.toLocaleString()}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-2`}>
                        ({item.percent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {chartType === 'bar' && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>6-Month Spending vs Income</p>
            </div>

            <div className="space-y-6">
              {getMonthlySpendingData().map((month, index) => {
                const maxValue = Math.max(...getMonthlySpendingData().map(m => Math.max(m.spending, m.income)));
                const spendingHeight = (month.spending / maxValue) * 80; // Fixed height calculation
                const incomeHeight = (month.income / maxValue) * 80; // Fixed height calculation

                return (
                  <div key={month.month} className="space-y-3">
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {month.month}
                      </p>
                    </div>

                    <div className="flex items-end justify-center gap-6 h-24">
                      {/* Spending Bar */}
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500 shadow-md"
                          style={{ height: `${Math.max(spendingHeight, 8)}px` }}
                        ></div>
                        <div className="text-center">
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Spending</p>
                          <p className="text-xs font-bold text-red-500">${month.spending.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Income Bar */}
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 shadow-md"
                          style={{ height: `${Math.max(incomeHeight, 8)}px` }}
                        ></div>
                        <div className="text-center">
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Income</p>
                          <p className="text-xs font-bold text-green-500">${month.income.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs px-4">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Savings: ${month.savings.toLocaleString()}
                      </span>
                      <span className={`font-semibold ${month.savings > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {((month.savings / month.income) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {chartType === 'histogram' && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Spending Distribution by Amount</p>
            </div>

            <div className="space-y-4">
              {getSpendingDistribution().map((range, index) => {
                const maxCount = Math.max(...getSpendingDistribution().map(r => r.count));
                const height = maxCount > 0 ? (range.count / maxCount) * 100 : 0;
                const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

                return (
                  <div key={range.range} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {range.range}
                      </span>
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {range.count} transactions
                      </span>
                    </div>
                    <div className="flex items-end gap-1 h-8">
                      <div
                        className="flex-1 bg-gradient-to-t rounded-t-sm transition-all duration-500"
                        style={{
                          height: `${Math.max(height, 5)}%`,
                          background: `linear-gradient(to top, ${colors[index % colors.length]}, ${colors[index % colors.length]}80)`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total transactions analyzed: {getSpendingDistribution().reduce((sum, range) => sum + range.count, 0)}
              </p>
            </div>
          </div>
        )}

        {chartType === 'trend' && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>6-Month Financial Trends</p>
            </div>

            <div className={`relative h-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
              <svg className="w-full h-full" viewBox="0 0 400.5 200.5">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke={ `${isDarkMode ? '#E5E7EB' : '#374151'}`} strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Spending trend line */}
                <polyline
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  points="20,160 80,140 140,120 200,100 260,80 320,60"
                  className="drop-shadow-sm"
                />

                {/* Income trend line */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  points="20,140 80,130 140,120 200,110 260,100 320,90"
                  className="drop-shadow-sm"
                />

                {/* Savings trend line */}
                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  points="20,180 80,170 140,160 200,150 260,140 320,130"
                  className="drop-shadow-sm"
                />

                {/* Data points */}
                {getMonthlySpendingData().map((month, index) => {
                  const x = 20 + (index * 60);
                  const spendingY = 160 - (index * 20);
                  const incomeY = 140 - (index * 10);
                  const savingsY = 180 - (index * 10);

                  return (
                    <g key={month.month}>
                      <circle cx={x} cy={spendingY} r="4" fill="#EF4444" />
                      <circle cx={x} cy={incomeY} r="4" fill="#10B981" />
                      <circle cx={x} cy={savingsY} r="4" fill="#3B82F6" />
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full grid grid-cols-3 justify-items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Spending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Savings</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Spending Trend</p>
                <p className="font-bold text-red-500">↓ Decreasing</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>-8.3% avg</p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Income Trend</p>
                <p className="font-bold text-green-500">↑ Increasing</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1.3% avg</p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Savings Trend</p>
                <p className="font-bold text-blue-500">↑ Improving</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+11.1% avg</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Month-over-Month Comparison */}
      <div className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Month-over-Month Comparison</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Income Change</span>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="font-bold text-green-500">+$200 (+6.7%)</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Spending Change</span>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-red-500" />
              <span className="font-bold text-red-500">+$500 (+17.9%)</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Savings Change</span>
            <div className="flex items-center gap-2">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              <span className="font-bold text-red-500">-$300 (-24.0%)</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Investment Growth</span>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="font-bold text-green-500">+$1,250 (+5.9%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* What-If Scenarios */}
      <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex items-start gap-3">
          <div className="bg-white/20 backdrop-blur p-2 rounded-lg">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold mb-1">What-If Scenario</h3>
            <p className="text-sm text-cyan-100 mb-3">If you reduce dining out by 30%, you could save an additional $135/month</p>
            <button onClick={() => setShowScenariosModal(true)} className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-white/30 transition-all">
              Explore Scenarios
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const InvestmentsScreen = () => (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Investments</h1>
        <button onClick={() => setShowAddInvestmentModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-green-700 transition-all">
          <Plus className="w-4 h-4" /> Add Investment
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Portfolio Value</h2>
            <p className="text-green-200 text-sm">Total Investment</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">${getTotalInvestmentValue().toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-1">
              {getTotalInvestmentGains() >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-200" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-200" />
              )}
              <span className={`text-sm font-semibold ${getTotalInvestmentGains() >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                {getTotalInvestmentGains() >= 0 ? '+' : ''}${getTotalInvestmentGains().toLocaleString()} ({getTotalInvestmentGainsPercent().toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-green-200">Total Holdings</p>
            <p className="text-lg font-bold">{investments.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-green-200">Top Performer</p>
            <p className="text-lg font-bold">{investments.find(inv => inv.changePercent === Math.max(...investments.map(i => i.changePercent)))?.symbol || 'N/A'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-xs text-green-200">Avg Return</p>
            <p className="text-lg font-bold">{investments.length > 0 ? (investments.reduce((sum, inv) => sum + inv.changePercent, 0) / investments.length).toFixed(1) : 0}%</p>
          </div>
        </div>
      </div>

      {/* Investment Holdings */}
      <div>
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Holdings</h2>
        <div className="space-y-3">
          {investments.map(investment => (
            <div key={investment.id} className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white'} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${investment.type === 'crypto' ? 'bg-gradient-to-br from-orange-500 to-yellow-500' : 'bg-gradient-to-br from-blue-500 to-indigo-500'} rounded-xl flex items-center justify-center text-white font-bold`}>
                    {investment.symbol}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{investment.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{investment.shares} {investment.type === 'crypto' ? 'coins' : 'shares'} • ${investment.currentPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>${investment.amount.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    {investment.change >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${investment.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {investment.change >= 0 ? '+' : ''}${investment.change.toLocaleString()} ({investment.changePercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <div className={`${investment.change >= 0 ? 'bg-green-500' : 'bg-red-500'} h-2 rounded-full transition-all duration-500`} style={{ width: `${Math.min(Math.abs(investment.changePercent) * 2, 100)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Performance Chart */}
      <div className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white'} rounded-2xl p-5 shadow-md`}>
        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Performance Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Portfolio Growth</span>
            <span className={`font-bold ${getTotalInvestmentGains() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {getTotalInvestmentGains() >= 0 ? '+' : ''}{getTotalInvestmentGainsPercent().toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Best Performer</span>
            <span className="font-bold text-green-500">
              {investments.find(inv => inv.changePercent === Math.max(...investments.map(i => i.changePercent)))?.symbol || 'N/A'} (+{Math.max(...investments.map(i => i.changePercent)).toFixed(1)}%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Asset Allocation</span>
            <span className="font-bold text-blue-500">
              {investments.filter(inv => inv.type === 'stock').length} Stocks, {investments.filter(inv => inv.type === 'crypto').length} Crypto
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsScreen = () => (
    <div className="space-y-6 pb-24">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h1>

      <div className="space-y-3">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">Goal Milestone</h3>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              <p className="text-sm text-gray-600">Congratulations! You've reached 80% of your Emergency Fund goal</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">Bill Reminder</h3>
                <span className="text-xs text-gray-500">5h ago</span>
              </div>
              <p className="text-sm text-gray-600">Discover Card payment of $850.20 is due in 5 days</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-purple-500 p-2 rounded-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">Achievement Unlocked</h3>
                <span className="text-xs text-gray-500">1d ago</span>
              </div>
              <p className="text-sm text-gray-600">12-month payment streak! You're a financial rockstar 🌟</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">AI Insight</h3>
                <span className="text-xs text-gray-500">2d ago</span>
              </div>
              <p className="text-sm text-gray-600">Your spending on entertainment is 20% lower this month. Great job!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen />;
      case 'accounts': return <AccountsScreen />;
      case 'goals': return <GoalsScreen />;
      case 'goalDetail': return <GoalDetailScreen />;
      case 'bills': return <BillsScreen />;
      case 'subscriptions': return <SubscriptionsScreen />;
      case 'insights': return <InsightsScreen />;
      case 'investments': return <InvestmentsScreen />;
      case 'notifications': return <NotificationsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <div className={`max-w-md mx-auto min-h-screen relative transition-all duration-300 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="p-6">
          {renderScreen()}
        </div>

        <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto ${isDarkMode ? 'bg-gray-900/95 backdrop-blur-xl border-t border-gray-700' : 'bg-white/95 backdrop-blur-xl border-t border-gray-200'} px-6 py-3 shadow-lg transition-all duration-300`}>
          <div className="flex justify-around items-center">
            <button onClick={() => setActiveScreen('home')} className={`flex flex-col items-center gap-1 transition-all ${activeScreen === 'home' ? 'text-blue-600' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button onClick={() => setActiveScreen('accounts')} className={`flex flex-col items-center gap-1 transition-all ${activeScreen === 'accounts' ? 'text-blue-600' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              <Wallet className="w-6 h-6" />
              <span className="text-xs font-medium">Accounts</span>
            </button>
            <button onClick={() => setActiveScreen('goals')} className={`flex flex-col items-center gap-1 transition-all ${activeScreen === 'goals' || activeScreen === 'goalDetail' ? 'text-blue-600' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              <Target className="w-6 h-6" />
              <span className="text-xs font-medium">Goals</span>
            </button>
            <button onClick={() => setActiveScreen('insights')} className={`flex flex-col items-center gap-1 transition-all ${activeScreen === 'insights' ? 'text-blue-600' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-medium">Insights</span>
            </button>
            <button onClick={() => setActiveScreen('investments')} className={`flex flex-col items-center gap-1 transition-all ${activeScreen === 'investments' ? 'text-blue-600' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              <Activity className="w-6 h-6" />
              <span className="text-xs font-medium">Invest</span>
            </button>
            <button onClick={() => setActiveScreen('notifications')} className={`flex flex-col items-center gap-1 transition-all ${activeScreen === 'notifications' ? 'text-blue-600' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              <Bell className="w-6 h-6" />
              <span className="text-xs font-medium">Alerts</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Modals */}
      {showAddGoalModal && <AddGoalModal />}
      {showAddFundsModal && <AddFundsModal />}
      {showEditGoalModal && <EditGoalModal />}
      {showLinkAccountModal && <LinkAccountModal />}
      {showAddInvestmentModal && <AddInvestmentModal />}
      {showScenariosModal && <ScenariosModal />}
    </div>
  );
};

export default GoalWise;

