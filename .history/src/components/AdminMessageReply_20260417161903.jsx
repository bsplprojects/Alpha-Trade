import { useState } from "react";
import { Send, User } from "lucide-react";

const AdminMessageList = ({ data = [], onReply }) => {
  const [replies, setReplies] = useState({});

  const handleChange = (id, value) => {
    setReplies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleReply = (item) => {
    const message = replies[item.ID];
    if (!message) return;

    onReply?.(item, message); // send to API
    setReplies((prev) => ({ ...prev, [item.ID]: "" }));
  };

  console.log(replies)

  return (
    <div className="space-y-4">
      {data.map((item) => (
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

          {/* Type */}
          {item.rType && (
            <p className="text-xs text-muted-foreground mb-2">
              Type: {item.rType}
            </p>
          )}

          {/* Existing Reply */}
          {item.AdminReply && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs text-green-600 mb-1">Your Reply</p>
              <p className="text-sm">{item.AdminReply}</p>
            </div>
          )}

          {/* Reply Input */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="text"
              placeholder="Type reply..."
              value={replies[item.ID] || ""}
              onChange={(e) => handleChange(item.ID, e.target.value)}
              className="flex-1 h-10 px-3 rounded-lg border bg-muted outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              onClick={() => handleReply(item)}
              className="h-10 px-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-black flex items-center gap-1"
            >
              <Send size={16} />
              Reply
            </button>
          </div>

          {/* Footer */}
          <div className="text-xs text-muted-foreground mt-2">
            {item.reqDate?.split(" ")[0]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMessageList;
