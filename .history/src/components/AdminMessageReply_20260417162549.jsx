import { useState } from "react";
import { Send, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

const AdminMessageList = ({ data = [], onReply }) => {
  const [replies, setReplies] = useState({});
  const [activeId, setActiveId] = useState(null); // 👈 only one active reply

  const handleChange = (id, value) => {
    setReplies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => {
        const res = await http
    }
  })

  const handleReply = async (item) => {
    const message = replies[item.ID];
    if (!message) return;

    setActiveId(item.ID); // lock UI

    try {
      await onReply?.(item, message); // API call
      setReplies((prev) => ({ ...prev, [item.ID]: "" }));
    } finally {
      setActiveId(null); // unlock UI
    }
  };

  console.log(replies);

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const isActive = activeId === item.ID;
        const isDisabled = activeId !== null && !isActive;

        return (
          <div
            key={item.ID}
            className="p-4 rounded-2xl border bg-white shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User size={16} />
                <span>{item.Name}</span>
                <span className="text-xs text-muted-foreground">
                  ({item.Mobile})
                </span>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.Status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.Status}
              </span>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-800 mb-2">{item.Message}</p>

            {/* Existing Reply */}
            {item.AdminReply && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 mb-3">
                <p className="text-xs text-green-600 mb-1">Your Reply</p>
                <p className="text-sm">{item.AdminReply}</p>
              </div>
            )}

            {/* Reply Box */}
            {!item.AdminReply && (
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Type reply..."
                  value={replies[item.ID] || ""}
                  onChange={(e) => handleChange(item.ID, e.target.value)}
                  disabled={isDisabled}
                  className="flex-1 h-10 px-3 rounded-lg border bg-muted outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                />

                <button
                  onClick={() => handleReply(item)}
                  disabled={isDisabled || !replies[item.ID]}
                  className={`h-10 px-4 rounded-lg flex items-center gap-1 ${
                    isActive
                      ? "bg-gray-400"
                      : "bg-gradient-to-r from-orange-400 to-red-500 text-black"
                  }`}
                >
                  <Send size={16} />
                  {isActive ? "Sending..." : "Reply"}
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="text-xs text-muted-foreground mt-2">
              {item.reqDate}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminMessageList;
