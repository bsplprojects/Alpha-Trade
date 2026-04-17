import { Home } from "lucide-react";

const AdminDashboard = () => {
  return (
    <main className="page-content">
      <h1 className="text-lg font-medium uppercase flex items-center gap-2">
        <Home size={21} />
        Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-2 mt-5">
        <div className="p-2 rounded-lg shadow-md bg-gradient-to-r from-orange-500 to-red-500 text-black px-4 action-card text-left ">
          Total Members
          <p className="text-left text-3xl text-black font-semibold">0</p>
        </div>
        <div className="p-2 rounded-lg shadow-md bg-gradient-to-r from-orange-500 to-red-500 px-4 action-card text-left text-black">
          Total Recharge
          <p className="text-left text-3xl text-black font-semibold">0</p>
        </div>
        <div className="p-2 rounded-lg shadow-md bg-gradient-to-r from-orange-500 to-red-500 px-4 action-card text-left text-black">
          Active Members
          <p className="text-left text-3xl text-black font-semibold">0</p>
        </div>
        <div className="p-2 rounded-lg shadow-md bg-gradient-to-r from-orange-500 to-red-500 px-4 action-card text-left text-black">
          Inactive Members
          <p className="text-left text-3xl text-black font-semibold">0</p>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
