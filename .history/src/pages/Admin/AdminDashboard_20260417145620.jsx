import { Home } from "lucide-react";

const AdminDashboard = () => {
  return (
    <main className="page-content bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
            <Home size={26} />
          </div>
          Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Members */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">
                TOTAL MEMBERS
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                👥
              </div>
            </div>
            <p className="text-5xl font-bold text-gray-900 tracking-tighter">
              0
            </p>
            <div className="mt-1 text-emerald-600 text-sm font-medium flex items-center gap-1">
              <span>↑ 0%</span>
              <span className="text-gray-400">from last month</span>
            </div>
          </div>

          {/* Total Recharge */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">
                TOTAL RECHARGE
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                💰
              </div>
            </div>
            <p className="text-5xl font-bold text-gray-900 tracking-tighter">
              ₹0
            </p>
            <div className="mt-1 text-emerald-600 text-sm font-medium flex items-center gap-1">
              <span>↑ 0%</span>
              <span className="text-gray-400">from last month</span>
            </div>
          </div>

          {/* Active Members */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">
                ACTIVE MEMBERS
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                ✅
              </div>
            </div>
            <p className="text-5xl font-bold text-gray-900 tracking-tighter">
              0
            </p>
            <div className="mt-1 text-emerald-600 text-sm font-medium flex items-center gap-1">
              <span>↑ 0%</span>
              <span className="text-gray-400">from last month</span>
            </div>
          </div>

          {/* Inactive Members */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">
                INACTIVE MEMBERS
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                ⏸️
              </div>
            </div>
            <p className="text-5xl font-bold text-gray-900 tracking-tighter">
              0
            </p>
            <div className="mt-1 text-red-500 text-sm font-medium flex items-center gap-1">
              <span>↓ 0%</span>
              <span className="text-gray-400">from last month</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
