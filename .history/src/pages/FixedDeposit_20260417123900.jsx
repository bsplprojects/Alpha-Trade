import React from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FixedDeposit = () => {
  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div className="w-full max-w-full rounded-2xl p-5 bg-background text-black shadow-xl">
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
