import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, AlertTriangle } from "lucide-react";

const Withdraw = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"bank" | "usdt">("bank");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    // Handle withdrawal confirmation
    console.log("Withdraw:", { method: activeTab, amount, password: "***" });
  };

  return (
    <div className="page-content bg-background">
      {/* Header with back button */}
      <header className="header-gradient flex items-center px-4 relative">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="flex-1 text-center">Withdraw</span>
      </header>

      {/* Main Card */}
      <div className="mx-4 mt-4 bg-card rounded-xl p-4">
        {/* Tabs */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("bank")}
            className={`flex-1 py-2 text-center font-semibold transition-colors ${
              activeTab === "bank"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-muted-foreground"
            }`}
          >
            BANK
          </button>
          <button
            onClick={() => setActiveTab("usdt")}
            className={`flex-1 py-2 text-center font-semibold transition-colors ${
              activeTab === "usdt"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-muted-foreground"
            }`}
          >
            USDT
          </button>
        </div>

        {/* Amount Info */}
        <div className="space-y-1 mb-4">
          <div className="text-foreground">
            <span className="font-medium">Amount available: </span>
            <span className="font-bold">₹0</span>
          </div>
          <div className="text-foreground">
            <span className="font-medium">Fee: </span>
            <span className="font-bold">₹0</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-3 mb-3">
          <span className="text-xl font-bold text-primary">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 bg-transparent text-lg outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-3">
          <Lock size={20} className="text-primary" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="flex-1 bg-transparent text-lg outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* TIP Section */}
      <div className="mx-4 mt-4 bg-card rounded-xl p-4">
        <h3 className="font-bold text-foreground mb-3">TIP</h3>
        
        <div className="bg-red-50 rounded-lg p-4 space-y-4">
          <p className="text-foreground">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold mr-1">1</span>
            {" "}Withdrawal time: <span className="text-primary font-semibold underline">Monday to Friday</span>。
            amount range: <span className="text-primary font-semibold">₹300 - ₹30,000</span>.
          </p>

          <p className="text-foreground">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold mr-1">2</span>
            {" "}Handling fee: 20% tax on each withdrawal (paid to the Indian Monetary Authority)
          </p>

          <p className="text-destructive font-medium">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold mr-1">3</span>
            {" "}Important reminder: If the withdrawal fails, please check whether the bank information is correct.
          </p>

          <p className="text-destructive font-medium flex items-start gap-1">
            <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
            Please make sure the information is accurate to avoid affecting your account!
          </p>
        </div>

        <div className="mt-4 bg-muted rounded-lg px-4 py-3">
          <span className="text-foreground font-medium">Withdrawal time: </span>
          <span className="text-foreground">08:00 am - 09:00 am</span>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mx-4 mt-6 mb-4">
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-full bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition-colors"
        >
          confirm
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
