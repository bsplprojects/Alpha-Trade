import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface RecordCardProps {
  amount: number;
  orderNo: string;
  state: "pending" | "success" | "failed";
  time: string;
  expireTime: string;
}

const RecordCard = ({ amount, orderNo, state, time, expireTime }: RecordCardProps) => {
  const stateStyles = {
    pending: "text-foreground font-semibold",
    success: "text-success font-semibold",
    failed: "text-destructive font-semibold",
  };

  const stateLabels = {
    pending: "pending",
    success: "Succed",
    failed: "Failed",
  };

  return (
    <div className="bg-muted rounded-xl p-4 space-y-2 animate-fade-in">
      <div className="flex gap-2">
        <span className="text-muted-foreground">Recharge Amount:</span>
        <span className="text-primary font-bold">{amount}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">Order No.:</span>
        <span className="font-semibold text-foreground">{orderNo}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">State:</span>
        <span className={stateStyles[state]}>{stateLabels[state]}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">Time:</span>
        <span className="text-muted-foreground">{time}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-muted-foreground">Expire Time:</span>
        <span className="text-muted-foreground">{expireTime}</span>
      </div>
    </div>
  );
};

const rechargeRecords: RecordCardProps[] = [
  {
    amount: 1000,
    orderNo: "26109153148it8",
    state: "pending",
    time: "2026-01-09 15:31:48",
    expireTime: "2027-01-09 15:31:48",
  },
  {
    amount: 2000,
    orderNo: "25A09170835naf",
    state: "success",
    time: "2025-10-09 17:08:35",
    expireTime: "2026-10-09 17:08:35",
  },
];

const RechargeRecord = () => {
  const navigate = useNavigate();

  return (
    <div className="page-content bg-background">
      {/* Header with back button */}
      <header className="header-gradient flex items-center px-4">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="flex-1 text-center">Recharge record</span>
      </header>

      {/* Records List */}
      <div className="p-4 space-y-4">
        {rechargeRecords.map((record, index) => (
          <RecordCard key={index} {...record} />
        ))}
      </div>
    </div>
  );
};

export default RechargeRecord;
