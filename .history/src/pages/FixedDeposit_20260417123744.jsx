import React from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FixedDeposit = () => {
  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div>
          <h1>Available Amount</h1>
          <h1>$</h1>
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
