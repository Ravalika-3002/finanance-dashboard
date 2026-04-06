# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
FINANCE DASHBOARD UI – SUBMISSION
🔹 Project Title

Personal Finance Dashboard

🔹 Objective

This project demonstrates the ability to design and build a clean, interactive, and responsive finance dashboard interface using frontend technologies. It focuses on UI design, component structuring, and state management without backend dependency.

🔹 Tech Stack
Frontend: React.js
Styling: Tailwind CSS
Charts: Recharts
State Management: React Context API
Data Handling: Local Storage (for persistence)
🔹 Features Implemented
1️⃣ Dashboard Overview

The dashboard provides a quick summary of financial data:

Total Balance
Total Income
Total Expenses
Savings

✔ Includes:

Time-based visualization: Income vs Expense trend (Bar + Area chart)
Categorical visualization: Expense & Income distribution (Donut / Radar chart)
2️⃣ Transactions Section

Displays all financial transactions with:

Date
Amount
Category
Type (Income / Expense)

✔ Features:

Add transaction (Admin only)
Delete transaction
Filter by type
Search by description
3️⃣ Basic Role-Based UI

Simulated role-based behavior using frontend state:

Admin
Can add/delete transactions
User
Can only view data

✔ Role switching implemented via dropdown in navbar

4️⃣ Insights Section

Provides analytical insights such as:

Monthly financial comparison
Category-wise distribution
Heatmap (Month vs Category)
Green → Income dominant
Blue → Expense dominant

✔ Helps users understand spending patterns visually

5️⃣ State Management

Handled using React Context API:

Transactions data
Role state
Filters

✔ Ensures centralized and clean state handling

6️⃣ UI & UX
Clean and modern UI design
Responsive across mobile, tablet, and desktop
Proper spacing and layout alignment
Smooth user interaction

✔ Handles:

Empty data states
Responsive layouts
🔹 Optional Enhancements Implemented

✔ Data persistence using localStorage
✔ Interactive charts
✔ Heatmap visualization (advanced feature)
✔ Smooth UI layout

🔹 Project Structure
src/
 ├── components/
 │     ├── Navbar.jsx
 │     ├── Sidebar.jsx
 │     ├── CardUI.jsx
 │
 ├── pages/
 │     ├── Dashboard.jsx
 │     ├── Insights.jsx
 │     ├── Transactions.jsx
 │
 ├── context/
 │     └── AppContext.jsx
 │
 ├── App.jsx
 ├── main.jsx
🔹 How to Run the Project
npm install
npm run dev

Open in browser:

http://localhost:5173
Test link: https://finance-dashboard-zeta-two-36.vercel.app
