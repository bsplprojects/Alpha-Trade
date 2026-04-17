import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const MessageCenter = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

    const 



  return (
    <main>
      <PageHeader title="Message Center" />
      <section className="p-3">
        <Select>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="fixed deposit">Fixed Deposit</SelectItem>
              <SelectItem value="payout">Payout</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="order">Order</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div>

        <Input placeholder="Enter your message" className="mt-2" />
        <Button>Send</Button>
        </div>
      </section>
    </main>
  );
};

export default MessageCenter;
