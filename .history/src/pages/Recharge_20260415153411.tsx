import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Circle } from "lucide-react";
import Popup from "../components/Popup";
import { Button } from "@/components/ui/button";

interface PaymentChannel {
  id: string;
  name: string;
  range?: string;
}

const channels: PaymentChannel[] = [
  { id: "pay1", name: "Pay1", range: "1000 ~ 100000" },
  { id: "pay2", name: "Pay2", range: "1000 ~ 100000" },
  { id: "pay3", name: "pay3", range: "1000 ~ 50000" },
  { id: "pay4", name: "pay4", range: "1000 ~ 50000" },
  { id: "pay5", name: "Pay5", range: "500000 ~ 1000000" },
  // { id: "usdt", name: "USDT" },
];

const quickAmounts = [
  1000, 2000, 5000, 10000, 50000, 100000, 500000, 1000000, 1500000, 2000000,
  2500000, 3000000,
];

const rupeesWordsMap = {
  1000: "one thousand",
  2000: "two thousand",
  5000: "five thousand",
  10000: "ten thousand",
  50000: "fifty thousand",
  100000: "one lakh",
  500000: "five lakh",
  1000000: "Ten lakh",
  1500000: "Fifteen lakh",
  2000000: "Twenty lakh",
  2500000: "Twenty five lakh",
  3000000: "Thirty lakh",
};

const Recharge = () => {
  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState("pay1");
  const { rate: usdtInrRate } = useLiveUsdtRate();
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");

  const handleQuickSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleConfirm = () => {
    navigate("/confirm", {
      state: {
        channel: selectedChannel,
        amount,
      },
    });
  };

  return (
    <div className="page-content bg-background relative">
      {/* Header with back button */}
      <header className="header-gradient flex items-center px-4 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="flex-1 text-center">Deposit</span>
      </header>

      {/* Channels Section */}
      <div className="mx-4 mt-4 bg-card rounded-xl p-4 ">
        <h3 className="font-bold text-foreground mb-3 pb-3 border-b border-border">
          Channels
        </h3>
        <div className="space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              className="w-full flex items-center justify-between py-3 text-left"
            >
              <div>
                <div className="font-medium text-foreground">
                  {channel.name}
                </div>
                {channel.range && (
                  <div className="text-sm text-muted-foreground">
                    Amount range: {channel.range}
                  </div>
                )}
              </div>
              {selectedChannel === channel.id ? (
                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              ) : (
                <Circle size={24} className="text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Section */}
      <div className="mx-4 mt-4 bg-card rounded-xl p-4">
        <h3 className="font-bold text-foreground mb-3">Amount</h3>
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-3">
          <span className="text-xl font-bold text-foreground">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="flex-1 bg-transparent text-lg outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <p className="text-muted-foreground mt-1 uppercase font-semibold">
          {rupeesWordsMap[Number(amount)]} {amount ? "only" : ""}
        </p>

        {/* Quick Selection */}
        <div className="mt-4">
          <p className="text-center text-muted-foreground text-sm mb-3">
            Quick Selection
          </p>
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.slice(0, 4).map((value) => (
              <button
                key={value}
                onClick={() => handleQuickSelect(value)}
                className={`py-2 rounded-full border text-sm font-medium transition-colors ${
                  amount === value.toString()
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {quickAmounts.slice(4).map((value) => (
              <button
                key={value}
                onClick={() => handleQuickSelect(value)}
                className={`py-2 rounded-full border text-sm font-medium transition-colors ${
                  amount === value.toString()
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mx-4 mt-6">
        <Button onClick={handleConfirm} disabled={!amount} className="w-full">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Recharge;
