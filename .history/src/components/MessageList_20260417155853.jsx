import { MessageSquare, Clock } from "lucide-react";

const MessageList = ({ data = [] }) => {
  return (
    <div className="space-y-4 px-3">
      {data.map((item) => (
        <div
          key={item.ID}
          className=" rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare size={16} />
              <span className="capitalize">{item.rType}</span>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                item.Status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {item.Status}
            </span>
          </div>

          {/* Message */}
          <p className="text-sm font-medium text-gray-800">{item.Message}</p>

          {/* Admin Reply */}
          {item.AdminReply && (
            <div className="mt-3 p-3 rounded-xl bg-orange-50 border border-orange-200">
              <p className="text-xs text-orange-600 mb-1">Admin Reply</p>
              <p className="text-sm text-gray-800">{item.AdminReply}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{item.RequestDate}</span>
            </div>

            {item.ReplyDate && <span>Replied: {item.ReplyDate}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
