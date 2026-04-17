import React from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";

const FixedDeposit = () => {
  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div>
          <label>ID</label>
          <Input type="text" />
        </div>
        <div>
          <label>Name</label>
          <Input type="text" />
        </div>
        <div>
          <label>Amount</label>
          <Input type="number" />
        </div>
        <div>
          <label>Status</label>
          <Input type="text" />
        </div>
        <Button
      </section>
    </main>
  );
};

export default FixedDeposit;
