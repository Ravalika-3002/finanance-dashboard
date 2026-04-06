import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import CardUI from "../components/CardUI";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  AreaChart, Area, Line,
  PieChart, Pie, Cell
} from "recharts";

import { FaWallet, FaArrowUp, FaArrowDown, FaPiggyBank } from "react-icons/fa";

const Dashboard = () => {
  const { transactions, monthlyData } = useContext(AppContext);
  const [filter, setFilter] = useState("this");

  // CALCULATIONS
  const income = transactions.filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  // FILTER
  const filteredTransactions = transactions.filter(t => {
    if (filter === "all") return true;

    const month = new Date(t.date).getMonth();
    const currentMonth = new Date().getMonth();

    if (filter === "this") return month === currentMonth;
    if (filter === "last") return month === currentMonth - 1;
  });

  // EXPENSE DATA
  const expenseMap = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
    }
  });

  const expenseData = Object.keys(expenseMap).map(k => ({
    name: k,
    value: expenseMap[k],
  }));

  // INCOME DATA
  const incomeMap = {};
  transactions.forEach(t => {
    if (t.type === "income") {
      incomeMap[t.category] = (incomeMap[t.category] || 0) + t.amount;
    }
  });

  const incomeData = Object.keys(incomeMap).map(k => ({
    name: k,
    value: incomeMap[k],
  }));

  const COLORS = ["#22c55e", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8">

      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>

      {/* 🔥 TOP CARDS (FIXED RESPONSIVE GRID) */}
      <div className="flex gap-6 w-full">

  {/* SUMMARY CARDS */}
  <div className="flex-1 min-w-0">
    <Stat title="Balance" value={balance} icon={<FaWallet />} color="from-purple-500 to-indigo-500" />
  </div>

  <div className="flex-1 min-w-0">
    <Stat title="Income" value={income} icon={<FaArrowUp />} color="from-green-500 to-emerald-400" />
  </div>

  <div className="flex-1 min-w-0">
    <Stat title="Expense" value={expense} icon={<FaArrowDown />} color="from-red-500 to-pink-500" />
  </div>

  <div className="flex-1 min-w-0">
    <Stat title="Savings" value={balance} icon={<FaPiggyBank />} color="from-yellow-500 to-orange-400" />
  </div>

  {/* 💳 BANK CARD (BIGGER) */}
  <div className="flex-[2] min-w-0">
    <CardUI gradient="bg-gradient-to-r from-pink-500 to-purple-600" />
  </div>

</div>
      {/* 🔥 MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-3 space-y-6">

          {/* CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* STACKED BAR CHART */}
            <ChartCard title="Income vs Expense">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey="income" stackId="a" fill="#22c55e" />
                  <Bar dataKey="expense" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* AREA CHART */}
            <ChartCard title="Income Trend">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#6366f1"
                    fill="#6366f133"
                  />

                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#4f46e5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>

          {/* TRANSACTIONS */}
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h3 className="font-semibold text-base sm:text-lg">Recent Transactions</h3>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm w-full sm:w-auto dark:bg-gray-800 dark:text-white"
              >
                <option value="this">This Month</option>
                <option value="last">Last Month</option>
                <option value="all">All</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[500px] w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-left border-b dark:border-gray-700">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="py-3 font-medium">{t.category}</td>
                      <td className="py-3 text-gray-500 dark:text-gray-300">{t.date}</td>
                      <td className={`py-3 font-semibold ${
                        t.type === "income" ? "text-green-500" : "text-red-500"
                      }`}>
                        {t.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6 xl:col-span-1">

          <DonutChart title="Expense" data={expenseData} total={expense} colors={COLORS} />
          <DonutChart title="Income" data={incomeData} total={income} colors={COLORS} />

        </div>

      </div>
    </div>
  );
};

export default Dashboard;

/* STAT */
const Stat = ({ title, value, icon, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white p-4 rounded-xl shadow flex flex-col justify-between h-[170px] w-full`}>
    <div className="flex justify-between text-sm">
      <span>{title}</span>
      <span>{icon}</span>
    </div>
    <h2 className="text-lg font-bold">{value}</h2>
  </div>
);

/* CHART CARD */
const ChartCard = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow min-h-[300px] flex flex-col">
    <h3 className="mb-4 font-semibold text-sm sm:text-base">{title}</h3>
    <div className="flex-1 w-full h-full">{children}</div>
  </div>
);

/* DONUT */
const DonutChart = ({ title, data, total, colors }) => (
  <div className="bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-2xl shadow">

    <h3 className="text-sm font-semibold mb-3">{title}</h3>

    <div className="relative w-full max-w-[250px] mx-auto">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={60} outerRadius={85}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <p className="text-gray-400 text-xs">Total</p>
        <h2 className="text-base font-bold">{total}</h2>
      </div>
    </div>

    <div className="mt-4 space-y-2 text-sm">
      {data.map((item, i) => (
        <div key={i} className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
            <span>{item.name}</span>
          </div>
          <span>{item.value}</span>
        </div>
      ))}
    </div>

  </div>
);