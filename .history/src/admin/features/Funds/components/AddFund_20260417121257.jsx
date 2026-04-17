import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFunds } from "../hook";
import { toast } from "sonner";

const AddFund = () => {
  const [memberId, setMemberId] = useState("");
  const [amount, setAmount] = useState("");

  const { addfundMutation } = useFunds();

  useEffect(() => {
    if (addfundMutation.isSuccess) {
      setMemberId("");
      setAmount("");
      toast.success("Fund Added Successfully");
    }
  }, [addfundMutation.isSuccess]);

  return (
    <main className="px-2">
      <label>Member Id</label>
      <Input
        placeholder="Member ID"
        style={{ margin: "0px 0px 20px 0px" }}
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />

      <label>Amount</label>
      <Input
        type="number"
        placeholder="Amount"
        style={{ margin: "0px 0px 20px 0px" }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button
        className="bg-orange-500"
        disabled={addfundMutation.isLoading}
        onClick={() => addfundMutation.mutate({ memberId, amount })}
      >
        {addfundMutation.isLoading ? "Adding..." : "Add"}
      </Button>
    </main>
  );
};

export default AddFund;
