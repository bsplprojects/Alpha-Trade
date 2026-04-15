import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, AlertTriangle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Withdraw = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"bank" | "usdt">("bank");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const memberId = sessionStorage.getItem("memberId");

  const { data: bankDetails } = useQuery({
    queryKey: ["bank-details"],
    queryFn: async () => {
      const res = await http.post("/BankDetails", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  const { data: dashboardData } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  const fee = (2 * Number(amount)) / 100;

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await http.post("/InsertBankTransfer", {
        MID: memberId,
        Amount: amount,
        Password: password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        navigate("/withdrawal-record");
        toast.success(data?.message);
      }
    },
  });

  const handleConfirm = () => {
    // check for bank details
    if (bankDetails?.status === "FAILURE") {
      navigate("/bank");
    }

    if (!amount) {
      toast.error("Please enter amount");
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      return;
    }

    if (Number(amount) < 500 || Number(amount) >= 5001) {
      toast.error("Please enter amount between 500 to 5000");
      return;
    }

    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();

    // if (day === 6 || day === 0) {
    //   toast.error("You can withdraw only on Monday to Friday");
    //   return;
    // }

    if (hours < 7 || hours >= 8) {
      toast.error("You can withdraw only between 7 AM and 8 AM");
      return;
    }

    mutation.mutate();
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
        <span className="flex-1 text-center">Payout</span>
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
            <span className="font-bold">
              ${dashboardData?.data[0]?.Balance}
            </span>
          </div>
          <div className="text-foreground">
            <span className="font-medium">Fee: </span>
            <span className="font-bold">
              $
              {fee ? (
                <>
                  {" "}
                  {fee?.toFixed(2)}{" "}
                  <span className="text-xs text-muted-foreground">
                    (2%)
                  </span>{" "}
                </>
              ) : (
                0
              )}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-3 mb-3">
          <span className="text-xl font-bold text-primary">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              if (
                Number(e.target.value) > Number(dashboardData?.data[0]?.Balance)
              )
                return;
              setAmount(e.target.value);
            }}
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
            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold mr-1">
              1
            </span>{" "}
            Withdrawal time:{" "}
            <span className="text-primary font-semibold underline">
              24 X 7
            </span>
            <br />
             amount range:{" "}
            <span className="text-primary font-semibold">$500 - $5,000</span>.
          </p>

          <p className="text-foreground">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold mr-1">
              2
            </span>{" "}
            Handling fee: 20% tax on each withdrawal (paid to the Indian
            Monetary Authority)
          </p>

          <p className="text-destructive font-medium">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs font-bold mr-1">
              3
            </span>{" "}
            Important reminder: If the withdrawal fails, please check whether
            the bank information is correct.
          </p>

          <p className="text-destructive font-medium flex items-start gap-1">
            <AlertTriangle
              size={18}
              className="text-amber-500 mt-0.5 flex-shrink-0"
            />
            Please make sure the information is accurate to avoid affecting your
            account!
          </p>
        </div>

        {/* <div className="mt-4 bg-muted rounded-lg px-4 py-3">
          <span className="text-foreground font-medium">Withdrawal time: </span>
          <span className="text-foreground">07:00 am - 08:00 am</span>
        </div> */}
        <div className="mt-4 bg-muted rounded-lg px-4 py-3">
          <span className="text-foreground font-medium">
            Withdrawal credit under 24hr to 48hr{" "}
          </span>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mt-6 w-full flex items-center justify-center px-8">
        <Button
          disabled={!amount || mutation.isPending}
          onClick={handleConfirm}
          className="w-full"
        >
          {mutation.isPending ? "Please Wait..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default Withdraw;
