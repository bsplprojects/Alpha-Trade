import PageHeader from "@/components/PageHeader";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, ArrowDownToLine, RefreshCw, RotateCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Assets = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("memberId");
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordData", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  return (
    <div className="page-content bg-background">
      <PageHeader title="Assets" />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 mt-5 mx-3 gap-4 py-2 px-4 bg-card border-b border-border bg-gradient-to-r from-orange-500 to-red-500">
        <Link
          to={"/recharge"}
          className="flex flex-col items-center gap-2 text-black  transition"
        >
          <CreditCard size={24} />
          <span className="text-sm">Deposit</span>
        </Link>

        <Link
          to={"/withdraw"}
          className="flex flex-col items-center gap-2 text-black transition"
        >
          <ArrowDownToLine size={24} />
          <span className="text-sm">Payout</span>
        </Link>
      </div>

      {/* Assets Card */}
      <div className="mx-4 mt-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-700 p-6 text-black shadow-2xl overflow-hidden">
          {/* Shiny White Diagonal Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.25) 25%,
            rgba(255, 255, 255, 0.08) 45%,
            transparent 65%
          )
        `,
              transform: "rotate(18deg) translate(-25%, -30%)",
              filter: "blur(1px)",
            }}
          />

          {/* Second subtle shine layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background: `
          linear-gradient(
            120deg,
            transparent 30%,
            rgba(255, 255, 255, 0.35) 45%,
            transparent 60%
          )
        `,
              transform: "rotate(-10deg) translate(15%, 20%)",
            }}
          />

          {/* HEADER - Total Assets */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex shadow-lg shadow-orange-700 border border-white/30  items-start justify-between bg-white/10 backdrop-blur-md p-5 rounded-2xl mb-6 relative z-10">
              <div>
                <div className="text-4xl font-bold tracking-tight">
                  ${data?.data[0]?.LevelIncome || 0}
                </div>
                <div className="text-sm text-black/80 mt-1">Total Assets</div>
              </div>
            </div>
            <Link
              to="/fixed-deposit"
              className="flex shadow-lg shadow-orange-700 border border-white/30  items-start justify-between bg-white/10 backdrop-blur-md p-5 rounded-2xl mb-6 relative z-10"
            >
              <div>
                <div className="text-4xl font-bold tracking-tight">
                  ${data?.data[0]?.BinaryIncome || 0}
                </div>
                <div className="text-sm text-black/80 mt-1">Fixed Deposit</div>
              </div>
            </Link>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {/* Total Deposit */}
            <div className="bg-white/10 backdrop-blur-md border border-white/30 shadow-lg shadow-orange-700  p-4 rounded-2xl text-center">
              <div className="text-3xl font-bold">
                ${data?.data[0]?.Airdrop || 0}
              </div>
              <div className="text-xs uppercase tracking-tight text-black/80 mt-2">
                Total Deposit
              </div>
            </div>

            {/* Total Payout */}
            <div className="bg-white/10 backdrop-blur-md border border-white/30 shadow-lg shadow-orange-700  p-4 rounded-2xl text-center">
              <div className="text-3xl font-bold">
                ${data?.data[0]?.TotalDeduction || 0}
              </div>
              <div className="text-xs uppercase tracking-tight text-black/80 mt-2">
                Total Payout
              </div>
            </div>

            {/* Trade Income */}
            <button
              onClick={() => navigate("/trade-income-report")}
              className="bg-white/10 backdrop-blur-md p-4 shadow-lg border border-white/30 shadow-orange-700  rounded-2xl text-center hover:bg-white/15 transition-all active:scale-[0.98]"
            >
              <div className="text-3xl font-bold">
                ${data?.data[0]?.ROIIncome || 0}
              </div>
              <div className="text-xs uppercase tracking-tight text-black/80 mt-2">
                Trade Income
              </div>
            </button>

            {/* Referral Income */}
            <button
              onClick={() => navigate("/referal-income-report")}
              className="bg-white/10 backdrop-blur-md p-4 shadow-lg border border-white/30 shadow-orange-700  rounded-2xl text-center hover:bg-white/15 transition-all active:scale-[0.98]"
            >
              <div className="text-3xl font-bold">
                ${data?.data[0]?.SponsorIncome || 0}
              </div>
              <div className="text-xs uppercase tracking-tight text-black/80 mt-2">
                Referral Income
              </div>
            </button>

            {/* Level Income - Full Width */}
            <button
              onClick={() => navigate("/level-income-report")}
              className="col-span-2 bg-white/10 border border-white/30 backdrop-blur-md shadow-lg shadow-orange-700  p-4 rounded-2xl text-center hover:bg-white/15 transition-all active:scale-[0.98]"
            >
              <div className="text-3xl font-bold">
                ${data?.data[0]?.BCLevelIncome || 0}
              </div>
              <div className="text-xs uppercase tracking-tight text-black/70 mt-2">
                Level Income
              </div>
            </button>

            {/* Total Income - Highlighted */}
            <div className="col-span-2 bg-white/15 backdrop-blur-md border shadow-lg shadow-orange-700  border-white/30 p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-black">
                ${data?.data[0]?.TotalIncome || 0}
              </div>
              <div className="text-sm font-semibold uppercase tracking-tight text-black mt-1">
                Total Income
              </div>
            </div>
          </div>

          {/* Bottom Branding */}
          <div className="flex justify-center mt-8 opacity-75 shadow-lg  relative z-10">
            <div className="text-xs flex items-center gap-2 text-orange-100">
              <span>POWERED BY AI</span>
              <div className="w-px h-3 bg-white/40" />
              <span>Smart Trading System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
