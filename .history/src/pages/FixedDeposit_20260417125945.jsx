import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { toast } from "sonner";
import { use } from "react";

const FixedDeposit = () => {
  const [amount, setAmount] = useState();
  const client = use
  const memberId = sessionStorage.getItem("memberId");
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  const { data: fds } = useQuery({
    queryKey: ["fixed-deposit"],
    queryFn: async () => {
      const res = await http.get(`/FixedDepositReport/?MID=${memberId}`);
      return res.data;
    },
  });

  console.log(fds);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await http.post(
        `/FixedDepositInsert/?MID=${memberId}&Amount=${amount}`,
      );
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
        setAmount("");
      }
    },
  });

  const handleSubmit = () => {
    if (+amount > +data?.data?.[0]?.TotalMemberDeactive) {
      toast.error("Insufficient Balance");
      return;
    }
    mutation.mutate();
  };

  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div className="w-full max-w-full rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-red-600 text-black shadow-xl">
          {/* Top Label */}
          <p className="text-sm font-medium opacity-80">Available Amount</p>

          {/* Amount */}
          <h1 className="text-3xl font-bold mt-2">
            $ {data?.data?.[0]?.TotalMemberDeactive}
          </h1>
        </div>

        <div>
          <label>Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>
      </section>
    </main>
  );
};

export default FixedDeposit;
