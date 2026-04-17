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
import { http } from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import MessageList from "../components/MessageList";

const MessageCenter = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const client = useQueryClient();

  const memberId = sessionStorage.getItem("memberId");

  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await http.get(`/GetUserMessages/?MID=${memberId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return http.post(
        `/InsertMessageBox/?MID=${memberId}&rType=${type}&Message=${message}`,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      client.invalidateQueries({ queryKey: ["messages"] });
      if (data?.data?.status == "SUCCESS") {
        toast.success(data?.message);
      }
    },
  });

  return (
    <main>
      <PageHeader title="Message Center" />

      <section className="p-3 flex flex-col">
        <div>
          <Select onValueChange={(e) => setType(e)}>
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

          <div className="flex items-center gap-1 mt-2">
            <Input
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={() => mutation.mutate()}>
              <Send />
            </Button>
          </div>
        </div>
      </section>

      <MessageList data={data?.data} />
    </main>
  );
};

export default MessageCenter;
