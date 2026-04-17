import { Home, PiggyBank, User, UserCheck, Users, UserX } from "lucide-react";

const AdminDashboard = () => {
  return (
    <main className="page-content bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3 mb-10">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white">
            <Home size={28} />
          </div>
          Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Members */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="inline-block px-5 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full mb-6">
              Total Members
            </div>
            <p className="text-6xl font-bold text-gray-900 tracking-tighter">
              0
            </p>
          </div>

          {/* Total Recharge */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="inline-block px-5 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full mb-6">
              Total Recharge
            </div>
            <p className="text-6xl font-bold text-gray-900 tracking-tighter">
              ₹0
            </p>
          </div>

          {/* Active Members */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="inline-block px-5 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full mb-6">
              Active Members
            </div>
            <p className="text-6xl font-bold text-gray-900 tracking-tighter">
              0
            </p>
          </div>

          {/* Inactive Members */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="inline-block px-5 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full mb-6">
              Inactive Members
            </div>
            <p className="text-6xl font-bold text-gray-900 tracking-tighter">
              0
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
