import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FileText } from "lucide-react";

const Team = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="page-content bg-background">
      <PageHeader title="My team" />

      {/* Stats Card */}
      <div className="stat-card mx-3 mt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm opacity-80">Teams size</div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs opacity-70 mt-1">Team size today</div>
            <div className="font-semibold">0</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Deposit members</div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs opacity-70 mt-1">Effective size today</div>
            <div className="font-semibold">0</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Team deposit</div>
            <div className="text-2xl font-bold">₹0.00</div>
            <div className="text-xs opacity-70 mt-1">Team withdrawal</div>
            <div className="font-semibold">₹0.00</div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-4 pt-4 grid grid-cols-2 text-center">
          <div>
            <div className="text-sm opacity-80">Today's Income</div>
            <div className="text-xl font-bold">0.00</div>
          </div>
          <div className="border-l border-white/20">
            <div className="text-sm opacity-80">Total Revenue</div>
            <div className="text-xl font-bold">6146.82</div>
          </div>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="flex border-b border-border mt-6 bg-card">
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeLevel === level
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Level {level}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <FileText size={40} className="opacity-50" />
        </div>
        <span>No more data</span>
      </div>
    </div>
  );
};

export default Team;
