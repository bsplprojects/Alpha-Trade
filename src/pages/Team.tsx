import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Team = () => {
  const [activeLevel, setActiveLevel] = useState(1);
  const memberId = sessionStorage.getItem("memberId");

  const { data: teams } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await http.post("/MyLevelTeamWithDirect", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  const filteredTeams = useMemo(() => {
    return teams?.data?.filter((t) => Number(t?.Level) === activeLevel - 1);
  }, [teams, activeLevel]);

  return (
    <div className="page-content bg-background">
      <PageHeader title="My team" />

      {/* Stats Card */}
      <div className="stat-card mx-3 mt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm opacity-80">Teams size</div>
            <div className="text-2xl font-bold">{teams?.data?.length || 0}</div>
            <div className="text-xs opacity-70 mt-1">Team size today</div>
            <div className="font-semibold">0</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Deposit members</div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs opacity-70 mt-1">Effective size today</div>
            <div className="font-semibold">0</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Team deposit</div>
            <div className="text-2xl font-bold">₹0.00</div>
            <div className="text-xs opacity-70 mt-1">Team withdrawal</div>
            <div className="font-semibold">₹0.00</div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-4 pt-4 grid grid-cols-2 text-center">
          <div>
            <div className="text-sm opacity-80">Today's Income</div>
            <div className="text-xl font-bold">0.00</div>
          </div>
          <div className="border-l border-white/20">
            <div className="text-sm opacity-80">Total Revenue</div>
            <div className="text-xl font-bold">0.00</div>
          </div>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="flex border-b border-border mt-6 bg-card">
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`flex-1 py-4 text-center font-medium transition-colors  ${
              activeLevel === level
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:border-b"
            }`}
          >
            Level {level}
          </button>
        ))}
      </div>

      {filteredTeams?.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead className="w-[100px]">Sr.</TableHead>
                <TableHead className="text-nowrap">Invitation Id</TableHead>
                <TableHead className="text-nowrap">Sponsor Id</TableHead>
                <TableHead className="text-nowrap">Joining Date</TableHead>
                <TableHead className="text-nowrap">Activation Date</TableHead>
                <TableHead className="text-nowrap">Mobile</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams?.map((d, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{d?.ConsumerId}</TableCell>
                  <TableCell>{d?.SponsorId}</TableCell>
                  <TableCell>{d?.JoiningDate}</TableCell>
                  <TableCell>{d?.ActiveDate}</TableCell>
                  <TableCell>{d?.Mobile}</TableCell>
                  <TableCell className="text-right">{d?.Amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {/* Empty State */}
      {filteredTeams?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <FileText size={40} className="opacity-50" />
          </div>
          <span>No data found</span>
        </div>
      )}
    </div>
  );
};

export default Team;
