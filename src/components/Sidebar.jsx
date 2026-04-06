import { Link } from "react-router-dom";
import { Home, BarChart2, Wallet } from "lucide-react";

const Sidebar = ({ open }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-52 
        bg-white dark:bg-gray-900 
        p-4 shadow z-50
        flex flex-col gap-6

        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
      `}
    >
      <h2 className="text-xl font-bold text-black dark:text-white">
        ⚡ Banku
      </h2>

      <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">

        <Link to="/" className="flex items-center gap-2 hover:text-purple-500">
          <Home size={18} /> Home
        </Link>

        <Link to="/insights" className="flex items-center gap-2 hover:text-purple-500">
          <BarChart2 size={18} /> Insights
        </Link>

        <Link to="/transactions" className="flex items-center gap-2 hover:text-purple-500">
          <Wallet size={18} /> Transactions
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;