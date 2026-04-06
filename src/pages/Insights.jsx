import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, Line,
  RadialBarChart, RadialBar, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

const Insights = () => {
  const { transactions, monthlyData } = useContext(AppContext);

  const income = transactions.filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const graphData = monthlyData.map(d => ({
    ...d,
    expense: -d.expense
  }));

  // CATEGORY MAPS
  const incomeMap = {};
  const expenseMap = {};

  transactions.forEach(t => {
    if (t.type === "income") {
      incomeMap[t.category] = (incomeMap[t.category] || 0) + t.amount;
    } else {
      expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
    }
  });

  const incomeData = Object.keys(incomeMap).map(k => ({
    name: k,
    value: incomeMap[k]
  }));

  const expenseData = Object.keys(expenseMap).map(k => ({
    name: k,
    value: expenseMap[k]
  }));

  const radarData = Object.keys({ ...incomeMap, ...expenseMap }).map(k => ({
    category: k,
    value: (incomeMap[k] || 0) + (expenseMap[k] || 0)
  }));

  // HEATMAP
  const heatmapMap = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });

    if (!heatmapMap[month]) heatmapMap[month] = {};
    if (!heatmapMap[month][t.category]) {
      heatmapMap[month][t.category] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      heatmapMap[month][t.category].income += t.amount;
    } else {
      heatmapMap[month][t.category].expense += t.amount;
    }
  });

  const categories = [...new Set(transactions.map(t => t.category))];
  const months = Object.keys(heatmapMap);

  return (
    <div className="space-y-6 w-full px-4">

      <h1 className="text-2xl font-bold">Insights</h1>

      {/* TOP */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-4">
          <Stat title="Income" value={income} color="from-green-500 to-emerald-400" />
          <Stat title="Expense" value={expense} color="from-red-500 to-pink-500" />
          <Stat title="Savings" value={balance} color="from-purple-500 to-indigo-500" />
          <Stat title="Transactions" value={transactions.length} color="from-blue-500 to-cyan-400" />
        </div>

        {/* SEMICIRCLE */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-center font-semibold mb-2">Income vs Expense</h3>

          <div className="grid grid-cols-2 gap-2">
            <SemiCircle data={expenseData} colors={["#ef4444","#f97316","#fb7185","#dc2626"]} label="Outgoing" />
            <SemiCircle data={incomeData} colors={["#22c55e","#16a34a","#4ade80","#065f46"]} label="Incoming" />
          </div>
        </div>

      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">

        {/* LEFT */}
        <div className="space-y-4">

          {/* BAR CHART */}
          <div className="bg-white p-4 rounded-2xl shadow h-[280px]">
            <h3 className="font-semibold mb-2 text-gray-700">Revenue vs Profit</h3>

            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                <XAxis
                  dataKey="name"
                  tick={{ fill: "#374151", fontSize: 12 }}
                  axisLine={{ stroke: "#9ca3af" }}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "#374151", fontSize: 12 }}
                  axisLine={{ stroke: "#9ca3af" }}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    borderRadius: "8px",
                    color: "white"
                  }}
                />

                <Bar dataKey="income" fill="#fde68a" radius={[6,6,0,0]} />
                <Bar dataKey="expense" fill="#60a5fa" radius={[6,6,0,0]} />

                <Line dataKey="income" stroke="#111827" strokeWidth={2} dot={{ r: 4 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* HEATMAP */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-3 text-gray-700">Monthly Category Heatmap</h3>

            <div className="overflow-x-auto">
              <div
                className="grid"
                style={{ gridTemplateColumns: `100px repeat(${categories.length}, 1fr)` }}
              >
                <div></div>

                {categories.map((cat, i) => (
                  <div key={i} className="text-xs text-center font-semibold">
                    {cat}
                  </div>
                ))}

                {months.map((month, i) => (
                  <>
                    <div key={i} className="text-xs font-semibold">
                      {month}
                    </div>

                    {categories.map((cat, j) => {
                      const data = heatmapMap[month][cat] || { income: 0, expense: 0 };
                      const total = data.income + data.expense;

                      return (
                        <div
                          key={j}
                          className="h-10 flex items-center justify-center text-[10px] rounded m-1 text-white"
                          style={{
                            background:
                              data.income > data.expense
                                ? `rgba(34,197,94, ${Math.min(total / 80000, 1)})`
                                : `rgba(59,130,246, ${Math.min(total / 80000, 1)})`
                          }}
                        >
                          {total > 0 ? total : ""}
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {/* MONTHLY FLOW */}
          <div className="bg-white p-4 rounded-2xl shadow h-[280px]">
            <h3 className="text-center font-semibold text-gray-700">Monthly Flow</h3>

            <ResponsiveContainer>
              <BarChart data={graphData} layout="vertical">

                <XAxis
                  type="number"
                  tick={{ fill: "#374151", fontSize: 12 }}
                />

                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: "#374151", fontSize: 12 }}
                  width={80}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    borderRadius: "8px",
                    color: "white"
                  }}
                />

                <Bar dataKey="expense" fill="#ef4444" radius={[0,6,6,0]} />
                <Bar dataKey="income" fill="#22c55e" radius={[0,6,6,0]} />

              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* RADAR */}
          <div className="bg-white p-4 rounded-2xl shadow h-[300px]">
            <h3 className="text-center font-semibold text-gray-700">Category Distribution</h3>

            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <Radar
                  dataKey="value"
                  stroke="#4f46e5"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Insights;

////////////////////////////////////////////////////////////////

const SemiCircle = ({ data, colors, label }) => (
  <div className="flex flex-col items-center">

    <p className="text-sm">{label}</p>

    <div className="w-full h-[120px]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="100%"
          innerRadius="40%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
          barSize={8}
          data={data}
        >
          <RadialBar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </RadialBar>
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>

    <div className="flex flex-wrap justify-center gap-2 text-xs mt-2">
      {data.map((d, i) => (
        <span key={i} className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: colors[i % colors.length] }}
          ></span>
          {d.name}
        </span>
      ))}
    </div>

  </div>
);

////////////////////////////////////////////////////////////////

const Stat = ({ title, value, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white p-4 rounded-2xl shadow`}>
    <p>{title}</p>
    <h2 className="font-bold text-lg">{value}</h2>
  </div>
);