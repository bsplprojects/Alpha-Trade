import { Home } from "lucide-react";

const AdminDashboard = () => {
  return (
    <main className="page-content">
      <h1 className="text-lg font-medium uppercase flex items-center gap-2">
        <Home size={21} />
        Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-2 mt-5">
        <div className="p-2 rounded-lg shadow-md bg-gradient-to-r from-orange-500 to-red-500 text-black px-4 action-card text-left text-white">
          Total Members
          <p className="text-left text-3xl text-white font-semibold">0</p>
        </div>
        <div className="p-2 rounded-lg shadow-md bg-background px-4 action-card text-left text-white">
          Total Recharge
          <p className="text-left text-3xl text-white font-semibold">0</p>
        </div>
        <div className="p-2 rounded-lg shadow-md bg-background px-4 action-card text-left text-white">
          Active Members
          <p className="text-left text-3xl text-white font-semibold">0</p>
        </div>
        <div className="p-2 rounded-lg shadow-md bg-background px-4 action-card text-left text-white">
          Inactive Members
          <p className="text-left text-3xl text-white font-semibold">0</p>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
