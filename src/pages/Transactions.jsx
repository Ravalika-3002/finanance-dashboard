import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Transactions = () => {
  const { transactions, role, deleteTransaction, addTransaction } =
    useContext(AppContext);

  const [showModal, setShowModal] = useState(false);

  // 🔥 FILTER STATES
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    category: "",
    amount: "",
    type: "income",
    date: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.amount || !form.date || !form.description) {
      toast.error("Fill all fields ❌");
      return;
    }

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    toast.success("Transaction Added ✅");
    setShowModal(false);

    setForm({
      category: "",
      amount: "",
      type: "income",
      date: "",
      description: "",
    });
  };

  // 🔥 UNIQUE VALUES
  const categories = ["all", ...new Set(transactions.map(t => t.category))];

  const months = [
    "all",
    ...new Set(
      transactions.map(t =>
        new Date(t.date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        })
      )
    ),
  ];

  // 🔥 FILTER LOGIC
  const filteredTransactions = transactions.filter((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    return (
      (typeFilter === "all" || t.type === typeFilter) &&
      (categoryFilter === "all" || t.category === categoryFilter) &&
      (monthFilter === "all" || month === monthFilter) &&
      (search === "" ||
        t.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold">Transactions</h2>

        {role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* 🔥 FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        <select
          className="border p-2 rounded w-full"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="border p-2 rounded w-full"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        >
          {months.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          placeholder="Search description..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-md p-4 sm:p-6 rounded-xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4"
            >
              ✖
            </button>

            <h3 className="mb-4 font-semibold">Add Transaction</h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="number"
                placeholder="Amount"
                className="border p-2 w-full rounded"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              <input
                placeholder="Description"
                className="border p-2 w-full rounded"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <select
                className="border p-2 w-full rounded"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option>Salary</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Freelance</option>
              </select>

              <select
                className="border p-2 w-full rounded"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="date"
                className="border p-2 w-full rounded"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
                Add Transaction
              </button>

            </form>
          </div>
        </div>
      )}

      {/* LIST */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">

        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-400">No transactions found</p>
        ) : (
          filteredTransactions.map((t) => (
            <div
              key={t.id}
              className="border-b py-3 flex flex-col sm:flex-row justify-between gap-2"
            >

              <div>
                <p className="font-medium">{t.category}</p>
                <p className="text-sm text-gray-500 italic">
                  {t.description}
                </p>
                <p className="text-xs text-gray-400">{t.date}</p>
              </div>

              <div className="flex justify-between sm:justify-end items-center gap-4">

                <p className={t.type === "income" ? "text-green-500" : "text-red-500"}>
                  {t.amount}
                </p>

                {role === "admin" && (
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-red-500"
                  >
                    ✖
                  </button>
                )}

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Transactions;