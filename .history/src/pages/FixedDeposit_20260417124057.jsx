import React from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";

const FixedDeposit = () => {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div className="w-full max-w-full rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-red-600 text-black shadow-xl">
          {/* Top Label */}
          <p className="text-sm font-medium opacity-80">Available Amount</p>

          {/* Amount */}
          <h1 className="text-3xl font-bold mt-2">$ 123</h1>
        </div>

        <div>
          <label>Amount</label>
          <Input type="number" />
        </div>
        <Button>Save</Button>
      </section>
    </main>
  );
};

export default FixedDeposit;
