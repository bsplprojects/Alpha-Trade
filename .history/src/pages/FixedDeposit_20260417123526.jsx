import React from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";

const FixedDeposit = () => {
  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8">
        <div>
          <label>ID</label>
          <Input type="text" />
        </div>
      </section>
    </main>
  );
};

export default FixedDeposit;
