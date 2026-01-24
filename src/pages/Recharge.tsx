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
  { id: "pay5", name: "Pay5", range: "1000 ~ 100000" },
  { id: "usdt", name: "USDT" },
];

const quickAmounts = [1000, 2000, 5000, 10000, 50000, 100000];

const Recharge = () => {
  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState("pay1");
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");

  const handleQuickSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleConfirm = () => {
    setShowPopup(true);
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
        <span className="flex-1 text-center">Recharge</span>
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
          <span className="text-xl font-bold text-foreground">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="flex-1 bg-transparent text-lg outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

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
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-full bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition-colors"
        >
          confirm
        </button>
      </div>

      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className="p-2 flex flex-col items-center gap-3 justify-center mt-8">
          {/* QR */}
          <div className="h-56 w-64 max-w-64 border rounded shadow"></div>

          <div className="flex items-center justify-between w-full text-sm gap-2">
            <div className="p-1 px-5 rounded-md border border-primary bg-primary/40 w-1/2 shadow">
              <p className="font-semibold">Amount</p>
              <span>₹ {amount}</span>
            </div>
            <div className="p-1 px-5 rounded-md border border-primary bg-primary/40 w-1/2 shadow">
              <p className="font-semibold">Pay type</p>
              <span>Gpay</span>
            </div>
          </div>

          <span className="w-full font-bold">Hash</span>
          <div className="w-64 p-1 px-5 border rounded-md shadow">
            <p className="break-words">
              asdhafhasfjakjfalksdjasdhafhasfjakjfalksdjasdhafhasfjakjfalksdj
            </p>
          </div>

            <Button className="w-full">Submit</Button>

        </div>
      </Popup>
    </div>
  );
};

export default Recharge;
