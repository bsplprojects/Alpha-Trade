import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FileText, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Team = () => {
  const [activeLevel, setActiveLevel] = useState(1);
  const [type, setType] = useState("team");
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

  const { data: dashboardTeam, isLoading } = useQuery({
    queryKey: ["dashboardTeam"],
    queryFn: async () => {
      const res = await http.post("/MySpDashbordDataTeam", {
        UserID: memberId,
      });
      return res.data;
    },
  });

  const levels = useMemo(() => {
    const set = new Set<number>();

    teams?.data?.forEach((d) => {
      const level = Number(d?.Level);
      if (level !== 0) {
        set.add(level);
      }
    });

    return Array.from(set);
  }, [teams]);

  const totalTeams = teams?.data?.filter(
    (d, index) => d?.SponsorId !== "Admin",
  );

  const filteredTeams = useMemo(() => {
    return teams?.data?.filter((t) => {
      const isLevelMatch = Number(t?.Level) === activeLevel;

      const isActive = Number(t?.Amount) > 0;

      if (type === "deposit") {
        return isLevelMatch && isActive;
      }

      if (type === "team") {
        return isLevelMatch && !isActive;
      }

      return isLevelMatch;
    });
  }, [teams, activeLevel, type]);

  const depositMembers = useMemo(() => {
    return teams?.data?.filter((t) => Number(t?.Amount) > 0);
  }, [teams]);

  const depositAmount = useMemo(() => {
    return depositMembers?.reduce((acc, d) => acc + Number(d?.Amount), 0);
  }, [depositMembers]);

  const teamToday = useMemo(() => {
    return teams?.data?.filter((t) => {
      const date = new Date();
      const joiningDate = new Date(t?.JoiningDate);
      return date.getDate() === joiningDate.getDate();
    });
  }, [teams]);

  const effectiveTeam = useMemo(() => {
    return teams?.data?.filter((d) => {
      const date = new Date();
      const joiningDate = new Date(d?.ActiveDate);
      return date.getDate() === joiningDate.getDate();
    });
  }, [teams]);

  return (
    <div className="page-content bg-background">
      <PageHeader title="My team" />

      {/* Stats */}
      <div className="mx-3 mt-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-700 p-6 text-white shadow-2xl overflow-hidden">
          {/* Enhanced Shiny White Diagonal Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.25) 40%,
            rgba(255, 255, 255, 0.08) 70%,
            transparent 65%
          )
        `,
              transform: "rotate(18deg) translate(-25%, -30%)",
              filter: "blur(1px)",
            }}
          />

          {/* Optional second subtle shine layer for more depth */}
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

          {/* Top Banner */}
          <div className="flex justify-center mb-4 relative z-10">
            <div className="bg-white/20 backdrop-blur-md text-black/70 text-xs font-medium px-6 py-1.5 rounded-full border border-white/30">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />{" "}
              LIVE TRADING ACTIVE
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8 relative z-10">
            <p className="text-4xl font-bold tracking-tighter text-black *:drop-shadow-sm font-serif">
              Team Dashboard
            </p>
            <p className="text-black/80 mt-1 text-sm">
              Real-time Performance Overview
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            {/* Team Size */}
            <div
              onClick={() => setType("team")}
              className="bg-white/10 backdrop-blur-md border border-white/30 shadow-lg shadow-orange-700  rounded-2xl p-4 cursor-pointer hover:bg-white/15 transition-all active:scale-[0.98]"
            >
              <p className="text-xs uppercase tracking-tight text-black/70">
                Team Size
              </p>
              <p className="text-3xl font-bold mt-2 text-black">
                {totalTeams?.length || 0}
              </p>
              <p className="text-xs text-black mt-3">
                Today:{" "}
                <span className="font-semibold text-black">
                  {teamToday?.length || 0}
                </span>
              </p>
            </div>

            {/* Deposit Members */}
            <div
              onClick={() => setType("deposit")}
              className="bg-white/10 backdrop-blur-md shadow-lg border border-white/30 shadow-orange-700  rounded-2xl p-4 cursor-pointer hover:bg-white/15 transition-all active:scale-[0.98]"
            >
              <p className="text-xs uppercase tracking-tight text-black/70">
                Deposit Members
              </p>
              <p className="text-3xl font-bold mt-2 text-black">
                {depositMembers?.length || 0}
              </p>
              <p className="text-xs text-black mt-3">
                Effective Today:{" "}
                <span className="font-semibold text-black">
                  {effectiveTeam?.length || 0}
                </span>
              </p>
            </div>

            {/* Team Deposit */}
            <div className="bg-white/10 shadow-lg shadow-orange-700 border border-white/30  backdrop-blur-md rounded-2xl p-4">
              <p className="text-xs uppercase tracking-tight text-black/70">
                Team Deposit
              </p>
              <p className="text-3xl font-bold mt-2 text-black">
                ${depositAmount?.toFixed(2) || 0}
              </p>
              <p className="text-xs text-black mt-3">
                Withdrawn:{" "}
                <span className="font-semibold text-black/70">
                  ${dashboardTeam?.TeamTotalDeduction?.toFixed(2) || 0}
                </span>
              </p>
            </div>

            {/* Today’s Income */}
            <div className="bg-white/10 shadow-lg shadow-orange-700 border border-white/30  backdrop-blur-md rounded-2xl p-4">
              <p className="text-xs uppercase tracking-tight text-black/70">
                Today’s Income
              </p>
              {isLoading ? (
                <div className="mt-4">
                  <Loader2 className="animate-spin text-black" size={28} />
                </div>
              ) : (
                <p className="text-3xl font-bold mt-2 text-black">
                  ${dashboardTeam?.TeamTotalIncome?.toFixed(2) || 0}
                </p>
              )}
            </div>
          </div>

          {/* Total Revenue - Highlighted */}
          <div className="mt-6 pt-6 border-t border-white/30  relative z-10">
            <div className="bg-white/20 border border-white/30 shadow-lg shadow-orange-700 backdrop-blur-md rounded-2xl p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-black/70">
                Total Revenue
              </p>
              {isLoading ? (
                <Loader2
                  className="animate-spin mx-auto mt-4 text-black"
                  size={32}
                />
              ) : (
                <p className="text-5xl font-bold mt-2 text-black drop-shadow-sm">
                  ${dashboardTeam?.TeamRevenue?.toFixed(2) || 0}
                </p>
              )}
            </div>
          </div>

          {/* Bottom AI Branding */}
          <div className="flex justify-center mt-6 opacity-75 relative z-10">
            <div className="text-xs flex items-center gap-2 text-orange-100">
              <span>POWERED BY AI</span>
              <div className="w-px h-3 bg-white/40" />
              <span>Smart Trading System</span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Select */}
      <div className="w-full px-3 py-2">
        <Select
          value={activeLevel}
          onValueChange={(val) => setActiveLevel(Number(val))}
        >
          <SelectTrigger className="w-full border-yellow-400 focus:ring-blue-900">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  Level {level}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filteredTeams?.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="bg-yellow-100">
              <TableHead>Sr.</TableHead>
              <TableHead>Invitation Id</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Activation Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTeams?.map((d, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{d?.ConsumerId}</TableCell>
                <TableCell>{d?.JoiningDate}</TableCell>
                <TableCell>{d?.ActiveDate?.split(" ")[0]}</TableCell>

                <TableCell className="text-right">${d?.Amount}</TableCell>

                <TableCell
                  className={`text-right font-medium ${
                    Number(d?.Amount) > 0 ? "text-blue-900" : "text-red-500"
                  }`}
                >
                  {Number(d?.Amount) > 0 ? "Active" : "Deactive"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Empty */}
      {filteredTeams?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="w-20 h-20 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">
            <FileText size={40} className="opacity-50 text-blue-900" />
          </div>
          <span>No data found</span>
        </div>
      )}
    </div>
  );
};

export default Team;
