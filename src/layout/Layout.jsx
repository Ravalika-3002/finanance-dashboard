import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 p-4 lg:ml-52">

        <Navbar toggleSidebar={() => setOpen(true)} />

        <div className="mt-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Layout;