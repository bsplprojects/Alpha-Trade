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
    <main>
      <PageHeader title="Message Center" />
      <section className="p-3">
        <div className="flex items-start gap-3 max-w-md mt-10">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200">
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Message Content */}
          <div className="flex flex-col">
            <div className="bg-white border border-gray-200 rounded-3xl rounded-tl-none px-5 py-3 shadow-sm">
              <p className="text-gray-800 text-[15px] leading-relaxed">
                Hello! How are you doing today? I wanted to check on the latest
                dashboard updates.
              </p>
            </div>

            {/* Optional Timestamp */}
            <span className="text-xs text-gray-400 mt-1 ml-2">10:32 AM</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MessageCenter;
