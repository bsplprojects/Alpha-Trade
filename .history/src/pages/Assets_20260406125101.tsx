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
      <div className="grid grid-cols-3 gap-4 py-6 px-4 bg-card border-b border-border">
        <Link
          to={"/recharge"}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <CreditCard size={24} />
          <span className="text-sm">Recharge</span>
        </Link>
        <Link
          to={"/withdraw"}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <ArrowDownToLine size={24} />
          <span className="text-sm">Withdraw</span>
        </Link>
        <button className="flex flex-col items-center gap-2 text-muted-foreground">
          <RefreshCw size={24} />
          <span className="text-sm">Acc change</span>
        </button>
      </div>

      {/* Assets Card */}
      <div className="mx-4 mt-6">
        <div className="  p-5">
          {/* HEADER */}
          <div className="flex items-start justify-between bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg">
            <div>
              <div className="text-3xl font-bold">
                ₹{data?.data[0]?.LevelIncome}
              </div>
              <div className="text-sm opacity-80 mt-1">Total assets</div>
            </div>

            <button className="opacity-80 hover:opacity-100 transition">
              <RotateCw size={20} />
            </button>
          </div>

          {/* STATS GRID */}
          <div className="border-t border-white/20  pt-5 grid grid-cols-2 gap-4 text-center">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg">
              <div className="text-xl font-bold">₹{data?.data[0]?.Airdrop}</div>
              <div className="text-xs opacity-80">Total recharge</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg">
              <div className="text-xl font-bold">
                ₹{data?.data[0]?.TotalDeduction}
              </div>
              <div className="text-xs opacity-80">Total withdraw</div>
            </div>

            <button
              onClick={() => navigate("/trade-income-report")}
              className=" bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg"
            >
              <div className="text-xl font-bold">
                ₹{data?.data[0]?.ROIIncome}
              </div>
              <div className="text-xs opacity-80">Trade income</div>
            </button>

            <button
              onClick={() => navigate("/referal-income-report")}
              className="bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg"
            >
              <div className="text-xl font-bold">
                ₹{data?.data[0]?.SponsorIncome}
              </div>
              <div className="text-xs opacity-80">Referral income</div>
            </button>

            {/* <div className="bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg">
              <div className="text-xl font-bold">
                ₹{data?.data[0]?.ROILevelIncome}
              </div>
              <div className="text-xs opacity-80">Trading income</div>
            </div> */}

            <button
              onClick={() => navigate("/level-income-report")}
              className="col-span-2 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg"
            >
              <div className="text-xl font-bold">
                ₹{data?.data[0]?.BCLevelIncome}
              </div>
              <div className="text-xs opacity-80">Level income</div>
            </button>

            <div className="col-span-2 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-4 rounded-2xl shadow-lg">
              <div className="text-xl font-bold">
                ₹{data?.data[0]?.TotalIncome}
              </div>
              <div className="text-xs opacity-80">Total income</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
