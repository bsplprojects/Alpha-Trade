import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { useState } from "react";
const ConfirmOrder = ({ data }) => {
  const memberId = sessionStorage.getItem("memberId");
  const [amount, setAmount] = useState("");

  const { data: dashboardData } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  return (
    <div className="mt-4">
      <h1 className="font-semibold text-muted-foreground">{data.name}</h1>

      <small className="ml-1 ">Buy Amount (min : ₹300)</small>
      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <small className="ml-1">Estimated Income : ₹{amount}</small>

      <div className="grid grid-cols-2 gap-2 mt-5">
        <div className="p-2 border bg-white rounded-xl">
          <span className="font-semibold">Balance</span>
          <p>₹{dashboardData?.data[0]?.Balance}</p>
        </div>
        <div className="p-2 border bg-white rounded-xl">
          <span className="font-semibold">Lockup Time</span>
          <p>5M</p>
        </div>
      </div>

      <Button className="w-full mt-5">Confirm Order</Button>
    </div>
  );
};

export default ConfirmOrder;
