import { useContext } from "react";
import { Menu } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Navbar = ({ toggleSidebar }) => {
  const { role, setRole } = useContext(AppContext);

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu size={22} />
        </button>

        <h1 className="font-semibold">
          Welcome Admin 👋
        </h1>
      </div>

      {/* RIGHT */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

    </div>
  );
};

export default Navbar;