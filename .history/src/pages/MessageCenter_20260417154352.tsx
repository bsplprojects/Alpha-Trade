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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageCenter = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const memberId = sessionStorage.getItem("memberId");

  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await http.get(`/message/${memberId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return http.post("/message", {
        type,
        message,
      });
    },
  });

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Message Center"
        
      />

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#f8f9fa] pb-24">
        {/* Received Message */}
        <div className="flex items-start gap-3 max-w-[75%]">
          <div className="w-9 h-9 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200 mt-1">
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="bg-white border border-gray-200 rounded-3xl rounded-tl-none px-5 py-3 shadow-sm">
              <p className="text-gray-800 text-[15.5px] leading-relaxed">
                Hello! How are you doing today? I wanted to check on the latest
                dashboard updates.
              </p>
            </div>
            <span className="text-xs text-gray-400 mt-1.5 ml-3">10:32 AM</span>
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex items-start justify-end gap-3 max-w-[75%] ml-auto">
          <div className="flex flex-col items-end">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-3xl rounded-tr-none px-5 py-3 shadow-sm">
              <p className="text-[15.5px] leading-relaxed">
                Hi! The dashboard is looking much better now. I just updated the
                cards with the new gradient style you wanted.
              </p>
            </div>
            <span className="text-xs text-gray-400 mt-1.5 mr-3">10:33 AM</span>
          </div>
          <div className="w-9 h-9 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200 mt-1">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Another Received Message */}
        <div className="flex items-start gap-3 max-w-[75%]">
          <div className="w-9 h-9 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200 mt-1">
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="bg-white border border-gray-200 rounded-3xl rounded-tl-none px-5 py-3 shadow-sm">
              <p className="text-gray-800 text-[15.5px] leading-relaxed">
                Great! Can you also make the message input area look more
                modern?
              </p>
            </div>
            <span className="text-xs text-gray-400 mt-1.5 ml-3">10:35 AM</span>
          </div>
        </div>
      </div>

      {/* Message Input Area - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <Select>
            <SelectTrigger className="w-40 bg-gray-50 border-gray-200">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Message Type</SelectLabel>
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

          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-5 py-2 border border-gray-200 focus-within:border-orange-400 transition-colors">
            <Input
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-[15px] placeholder:text-gray-400"
            />
          </div>

          <Button
            onClick={() => mutation.mutate()}
            size="icon"
            className="bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full w-11 h-11"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default MessageCenter;
