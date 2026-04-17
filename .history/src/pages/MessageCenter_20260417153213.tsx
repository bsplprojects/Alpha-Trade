import PageHeader from "@/components/PageHeader";
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
              <SelectItem value="team">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
    </main>
  );
};

export default MessageCenter;
