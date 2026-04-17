import PageHeader from "@/components/PageHeader";
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

const MessageCenter = () => {
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

        <Input placeholder="Enter your message" />
      </section>
    </main>
  );
};

export default MessageCenter;
