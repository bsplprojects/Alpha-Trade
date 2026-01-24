import PageHeader from "@/components/PageHeader";
import { CreditCard, ArrowDownToLine, RefreshCw, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";

const Assets = () => {
  return (
    <div className="page-content bg-background">
      <PageHeader title="Assets" />

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 py-6 px-4 bg-card border-b border-border">
        <Link to={"/recharge"} className="flex flex-col items-center gap-2 text-muted-foreground">
          <CreditCard size={24} />
          <span className="text-sm">Recharge</span>
        </Link>
        <Link to={"/withdraw"} className="flex flex-col items-center gap-2 text-muted-foreground">
          <ArrowDownToLine size={24} />
          <span className="text-sm">Withdraw</span>
        </Link>
        <button className="flex flex-col items-center gap-2 text-muted-foreground">
          <RefreshCw size={24} />
          <span className="text-sm">Acc change</span>
        </button>
      </div>

      {/* Assets Card */}
      <div className="mx-4 mt-6">
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold">₹3,971.82</div>
              <div className="text-sm opacity-80 mt-1">Total assets</div>
            </div>
            <button className="opacity-80 hover:opacity-100 transition-opacity">
              <RotateCw size={20} />
            </button>
          </div>

          <div className="border-t border-white/20 mt-4 pt-4 grid grid-cols-2 text-center">
            <div>
              <div className="text-white text-xl font-bold">₹2000</div>
              <div className="text-sm opacity-80">Total recharge</div>
            </div>
            <div>
              <div className="text-white text-xl font-bold">₹0</div>
              <div className="text-sm opacity-80">Total withdraw</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
