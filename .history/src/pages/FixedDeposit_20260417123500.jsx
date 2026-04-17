import React from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@";

const FixedDeposit = () => {
  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section>
        <div>
          <label>Id</label>
          <Input type="text" />
        </div>
      </section>
    </main>
  );
};

export default FixedDeposit;
