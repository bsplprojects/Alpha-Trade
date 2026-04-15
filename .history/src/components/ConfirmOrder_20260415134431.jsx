import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ConfirmOrder = ({ data, type }) => {
  const memberId = sessionStorage.getItem("memberId");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: dashboardData, isSuccess } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setAmount(dashboardData?.data[0]?.LevelIncome);
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
      navigate("/order");
    },
  });

  const handleSubmit = () => {
    const now = new Date();
    const hour = now.getHours();

    // if (hour < 19 || hour >= 20) {
    //   toast.error("You can withdraw only between 7 PM to 8 PM");
    //   return;
    // }

    setTimeout(() => {
      mutation.mutate();
    }, 30 * 1000);

    mutation.mutate();
  };

  return (
    <div className="mt-4">
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
          <p>${dashboardData?.data[0]?.LevelIncome}</p>
        </div>
        <div className="p-2 border bg-white rounded-xl">
          <span className="font-semibold">Lockup Time</span>
          <p>1M</p>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={mutation.isPending}
        className="w-full mt-5"
      >
        {mutation.isPending ? "Please wait..." : "Confirm Order"}
      </Button>
    </div>
  );
};

export default ConfirmOrder;
