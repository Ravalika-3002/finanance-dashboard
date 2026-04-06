import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("transactions");

    return data
      ? JSON.parse(data)
      : [
        // ================= NOV 2025 =================
        { id: 1, category: "Salary", amount: 42000, type: "income", date: "2025-11-01", description: "Monthly salary credited" },
        { id: 2, category: "Food", amount: 1500, type: "expense", date: "2025-11-03", description: "Restaurant dinner" },
        { id: 3, category: "Freelance", amount: 8000, type: "income", date: "2025-11-05", description: "Freelance UI project" },
        { id: 4, category: "Shopping", amount: 2500, type: "expense", date: "2025-11-07", description: "Clothes shopping" },
        { id: 5, category: "Travel", amount: 2000, type: "expense", date: "2025-11-10", description: "Cab & fuel" },

        // ================= DEC 2025 =================
        { id: 6, category: "Salary", amount: 65000, type: "income", date: "2025-12-01", description: "Monthly salary credited" },
        { id: 7, category: "Food", amount: 2200, type: "expense", date: "2025-12-03", description: "Party dinner" },
        { id: 8, category: "Freelance", amount: 10000, type: "income", date: "2025-12-05", description: "Client project" },

        // ================= JAN 2026 =================
        { id: 9, category: "Salary", amount: 50000, type: "income", date: "2026-01-01", description: "Monthly salary credited" },
        { id: 10, category: "Shopping", amount: 2000, type: "expense", date: "2026-01-07", description: "Clothing purchase" },

        // ================= FEB 2026 =================
        { id: 11, category: "Salary", amount: 62000, type: "income", date: "2026-02-01", description: "Monthly salary credited" },
        { id: 12, category: "Travel", amount: 3000, type: "expense", date: "2026-02-10", description: "Trip expenses" },

        // ================= MAR 2026 =================
        { id: 13, category: "Salary", amount: 48000, type: "income", date: "2026-03-01", description: "Monthly salary credited" },
        { id: 14, category: "Food", amount: 2200, type: "expense", date: "2026-03-03", description: "Dinner outing" },

        // ================= APR 2026 =================
        { id: 15, category: "Salary", amount: 70000, type: "income", date: "2026-04-01", description: "Monthly salary credited" },
        { id: 16, category: "Food", amount: 1500, type: "expense", date: "2026-04-02", description: "Dinner" },
      ];
  });

  const [role, setRole] = useState("admin");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions(prev => [
      ...prev,
      { ...newTransaction, id: Date.now() }
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // 🔥 AUTO GENERATE MONTHLY DATA
  const monthlyMap = {};

  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric"
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = { name: month, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyMap[month].income += t.amount;
    } else {
      monthlyMap[month].expense += t.amount;
    }
  });

  const monthlyData = Object.values(monthlyMap);

  return (
    <AppContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        role,
        setRole,
        monthlyData, // 🔥 AUTO GENERATED
      }}
    >
      {children}
    </AppContext.Provider>
  );
};