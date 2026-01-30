import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { http } from "@/utils/http";

const MyOrder = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("memberId");
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await http.get(`/GetOrdersReport?MID=${memberId}`);
      return res.data;
    },
    enabled: !!memberId,
  });

  return (
    <main className="page-content">
      <header className="header-gradient flex items-center gap-2">
        <ArrowLeft onClick={() => navigate(-1)} />
        <h1 className="text-lg text-white">Orders</h1>
      </header>

      <h1 className="px-5 mt-3 text-muted-foreground">
        Showing <span className="font-semibold">{orders?.data?.length}</span>{" "}
        orders
      </h1>

      <div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <>
            {orders?.data?.length > 0 ? (
              <div className="p-3 space-y-4 ">
                {orders?.data?.map((d, index) => (
                  <div
                    key={index}
                    className="rounded-xl border bg-white px-5 py-3 shadow-sm hover:shadow-md transition"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="font-semibold text-lg text-zinc-800">
                          {d?.Name}
                        </h2>
                        <p className="text-sm text-zinc-500">
                          Order No:{" "}
                          <span className="font-medium">{d?.OrderNo}</span>
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border header-gradient`}
                      >
                        {d?.Status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Order Time</span>
                        <span className="font-medium text-zinc-700">
                          {d?.OrderTime?.split("T")[0]},{" "}
                          {d?.OrderTime?.split("T")[1]?.split(".")[0]}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Settled Time</span>
                        <span className="font-medium text-zinc-700">
                          {d?.SettledTime?.split("T")[0]},{" "}
                          {d?.SettledTime?.split("T")[1]?.split(".")[0]}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Amount</span>
                        <span className="font-semibold text-zinc-800">
                          ₹{d?.Amount}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Earnings</span>
                        <span className="font-semibold text-green-600">
                          ₹{d?.Earnings}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Type</span>
                        <span
                          className={`font-semibold ${d?.BuySale === "BUY" ? "text-green-600" : d?.BuySale === "SELL" ? "text-red-500" : ""} ${d?.BuySale === "SELL" && "text-red-500"} `}
                        >
                          {d?.BuySale || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 mt-5 text-zinc-500">
                No records found
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default MyOrder;
