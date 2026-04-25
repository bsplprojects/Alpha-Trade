import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { set } from "date-fns";
import Loader from "./Loader";

const isWithin24Hours = (latestDeposit) => {
  if (!latestDeposit?.rDate) return false;

  const depositTime = new Date(latestDeposit?.rDate).getTime();
  const now = Date.now();

  const diffInMs = now - depositTime;

  return diffInMs <= 24 * 60 * 60 * 1000; // 24 hrs
};

const ConfirmOrder = ({ data, type }) => {
  const memberId = sessionStorage.getItem("memberId");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: depositHistory } = useQuery({
    queryKey: ["recharge-record"],
    queryFn: async () => {
      const res = await http.get(
        `/GetAddFundRequestForMember/?MID=${memberId}`,
      );
      return res.data;
    },
  });

  const latestDeposit = useMemo(() => {
    if (!depositHistory?.data) return null;

    return (
      depositHistory.data
        .filter((d) => d?.rDate)
        .sort(
          (a, b) => new Date(b?.rDate).getTime() - new Date(a?.rDate).getTime(),
        )[0] || null
    ); // newest one
  }, [depositHistory]);

  const { data: dashboardData, isSuccess } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  const { data: fundWallet, isLoading } = useQuery({
    queryKey: ["fund-wallet"],
    queryFn: async () => {
      const res = await http.post("/MyFundWallet", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setAmount(dashboardData?.data[0]?.TotalMemberDeactive);
    }
  }, [isSuccess, dashboardData]);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await http.post("/InsertOrder", {
        MID: memberId,
        Name: data?.name,
        PhoneNo: "",
        Amount: amount,
        Type: type,
      });
      return res.data;
    },
    onSuccess: () => {
      setLoading(false);
      navigate("/order");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const isRecent = isWithin24Hours(latestDeposit);

  const handleSubmit = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 19 || hour >= 20) {
      toast.error("You can withdraw only between 7 PM to 8 PM");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      mutation.mutate();
    }, 15000);
  };

  // console.log(dashboardData);

  return (
    <div className="mt-4">
      {(!loading || mutation.isPending) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 bg-white/80 px-6 py-5 rounded-2xl shadow-xl">
            <Loader />
            <p className="text-sm font-medium text-gray-700">
              Processing your order...
            </p>
          </div>
        </div>
      )}

      <h1 className="font-semibold text-muted-foreground">{data.name}</h1>

      {/* <small className="ml-1 ">Buy Amount (min : $300)</small> */}
      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        disabled
        onChange={(e) => setAmount(e.target.value)}
      />
      <small className="ml-1">
        Estimated Income : ${((5 * amount) / 100)?.toFixed(2)}
      </small>

      <div className="grid grid-cols-2 gap-2 mt-5">
        <div className="p-2 border bg-white rounded-xl">
          <span className="font-semibold">Balance</span>
          <p>${fundWallet?.data?.Balance}</p>
        </div>
        <div className="p-2 border bg-white rounded-xl">
          <span className="font-semibold">Lockup Time</span>
          <p>1M</p>
        </div>
      </div>

      {isRecent && (
        <div className="mx-4 mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="text-xl">⏳</div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-amber-800">
                Trading Locked Temporarily
              </p>

              <p className="text-sm text-amber-700 mt-1">
                You can start trading{" "}
                <strong>24 hours after your deposit</strong>. Please wait until
                the cooldown period is completed.
              </p>

              {/* Optional extra info */}
              <p className="text-xs text-amber-600 mt-2">
                This is a security measure to prevent fraudulent activity.
              </p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading || mutation.isPending || isRecent}
        className="w-full mt-5"
      >
        Confirm Order
      </Button>
    </div>
  );
};

export default ConfirmOrder;
