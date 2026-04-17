import { Home, Users } from "lucide-react";

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
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-lg p-6 text-white hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium opacity-90">
                TOTAL MEMBERS
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-3xl"><Users/></span>
              </div>
            </div>
            <p className="text-5xl font-bold text-black tracking-tighter">0</p>
            <div className="mt-1 text-white/80 text-sm font-medium">
              Members
            </div>
          </div>

          {/* Total Recharge */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-lg p-6 text-white hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium opacity-90">
                TOTAL RECHARGE
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-3xl">💰</span>
              </div>
            </div>
            <p className="text-5xl font-bold text-black tracking-tighter">₹0</p>
            <div className="mt-1 text-white/80 text-sm font-medium">Amount</div>
          </div>

          {/* Active Members */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-lg p-6 text-white hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium opacity-90">
                ACTIVE MEMBERS
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-3xl">✅</span>
              </div>
            </div>
            <p className="text-5xl font-bold text-black tracking-tighter">0</p>
            <div className="mt-1 text-white/80 text-sm font-medium">
              Currently Active
            </div>
          </div>

          {/* Inactive Members */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-lg p-6 text-white hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium opacity-90">
                INACTIVE MEMBERS
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-3xl">⏸️</span>
              </div>
            </div>
            <p className="text-5xl font-bold text-black tracking-tighter">0</p>
            <div className="mt-1 text-white/80 text-sm font-medium">
              Not Active
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
