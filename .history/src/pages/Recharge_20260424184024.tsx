import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Circle } from "lucide-react";
import Popup from "../components/Popup";
import { Button } from "@/components/ui/button";
import useLiveUsdtRate from "@/hooks/useLiveUsdtRate";
import { toast } from "sonner";

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

const Recharge = () => {
  const navigate = useNavigate();
  const [usdtInput, setUsdtInput] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("pay1");
  const { rate: usdtInrRate } = useLiveUsdtRate();
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  // const handleQuickSelect = (value: number) => {
  //   setAmount(value.toString());
  // };

  const handleConfirm = () => {
    if (+usdtInput < 10) {
      toast.error("Amount should be greater than 10");
      return;
    }

    navigate("/confirm", {
      state: {
        channel: selectedChannel,
        amount,
      },
    });
  };

  return (
    <div className="page-content bg-gradient-to-br from-slate-50 via-white to-emerald-50 min-h-screen pb-8 relative">
      {/* Header with Pista Green Gradient */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-5 flex items-center relative shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft size={26} />
        </button>
        <span className="flex-1 text-center text-xl font-semibold tracking-tight">
          Deposit Funds
        </span>
      </header>

      <div className="px-4 pt-6 space-y-6">
        {/* Channels Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6">
          <h3 className="font-semibold text-lg text-emerald-950 mb-4 flex items-center gap-2">
            <span>Payment Channels</span>
          </h3>

          <div className="space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  selectedChannel === channel.id
                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="font-medium text-emerald-950 text-base">
                    {channel.name}
                  </div>
                  {channel.range && (
                    <div className="text-sm text-emerald-600/80 mt-0.5">
                      Amount range: {channel.range}
                    </div>
                  )}
                </div>

                {selectedChannel === channel.id ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-white" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border-2 border-emerald-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Section */}
        {/* Amount Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6">
          <h3 className="font-semibold text-lg text-emerald-950 mb-5">
            Enter Amount
          </h3>

          {/* Big Display Input - Shows USDT Value */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-3">
            <div className="text-3xl font-bold text-emerald-700">$</div>
            <input
              type="number"
              step="0.01"
              onFocus={(e) => e.target.select()}
              value={usdtInput}
              onChange={(e) => {
                const val = e.target.value;
                setUsdtInput(val);

                const usdt = parseFloat(val);
                if (!isNaN(usdt)) {
                  setAmount(usdt * usdtInrRate);
                }
              }}
              onBlur={() => {
                const num = parseFloat(usdtInput) || 0;
                setUsdtInput(num.toFixed(2));
              }}
              placeholder="0.00"
              className="flex-1 bg-transparent text-4xl font-semibold outline-none text-emerald-950 "
            />
            <div className="text-sm font-medium text-emerald-600">USDT</div>
          </div>

          {/* Quick Selection - INR Buttons */}
          <div className="mt-6">
            <p className="text-center text-emerald-600/70 text-sm mb-4 font-medium">
              Quick Selection (INR)
            </p>

            <div className="grid grid-cols-4 gap-3">
              {quickAmounts.map((inrValue) => {
                const isSelected = Math.round(amount) === inrValue; // Compare with INR amount

                return (
                  <button
                    key={inrValue}
                    onClick={() => {
                      setAmount(inrValue);

                      const usdt = inrValue / usdtInrRate;
                      setUsdtInput(usdt.toFixed(2));
                    }}
                    className={`py-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                        : "border-emerald-100 hover:border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-50"
                    }`}
                  >
                    ₹{inrValue}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="px-1 pt-4">
          <Button
            onClick={handleConfirm}
            disabled={!amount || !selectedChannel}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-60"
          >
            Confirm Deposit
          </Button>

          <p className="text-center text-xs text-emerald-600/60 mt-4">
            Secure & Instant Processing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
