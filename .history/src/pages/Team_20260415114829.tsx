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
  const [type]
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
    return teams?.data?.filter((t) => Number(t?.Level) === activeLevel);
  }, [teams, activeLevel]);

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
      <div className="mx-3 mt-4 grid grid-cols-2 gap-2">
        {/* Team Size */}
        <div onClick={()=>setType("team")} className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 p-4 text-white shadow-md">
          <p className="text-xs uppercase text-yellow-300">Team Size</p>
          <p className="text-2xl font-bold mt-1">{totalTeams?.length || 0}</p>
          <p className="text-xs text-yellow-300 mt-1">
            Today:{" "}
            <span className="font-semibold text-white">
              {teamToday?.length || 0}
            </span>
          </p>
        </div>

        {/* Deposit Members */}
        <div onClick={()=>setType("deposit")} className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 p-4 text-white shadow-md">
          <p className="text-xs uppercase text-yellow-300">Deposit Members</p>
          <p className="text-2xl font-bold mt-1">
            {depositMembers?.length || 0}
          </p>
          <p className="text-xs text-yellow-300 mt-1">
            Effective Today:{" "}
            <span className="font-semibold text-white">
              {effectiveTeam?.length || 0}
            </span>
          </p>
        </div>

        {/* Team Deposit */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 p-4 text-white shadow-md">
          <p className="text-xs uppercase text-yellow-300">Team Deposit</p>
          <p className="text-xl font-bold mt-1">
            ${depositAmount?.toFixed(2) || 0}
          </p>
          <p className="text-xs text-yellow-300 mt-1">
            Withdrawn:{" "}
            <span className="font-semibold text-white">
              ${dashboardTeam?.TeamTotalDeduction?.toFixed(2) || 0}
            </span>
          </p>
        </div>

        {/* Today Income */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 p-4 text-white shadow-md">
          <p className="text-xs uppercase text-yellow-300">Today’s Income</p>
          {isLoading ? (
            <Loader2 className="animate-spin mt-3 text-yellow-300" />
          ) : (
            <p className="text-2xl font-bold mt-1">
              ${dashboardTeam?.TeamTotalIncome?.toFixed(2) || 0}
            </p>
          )}
        </div>

        {/* Total Revenue */}
        <div className="col-span-2 rounded-2xl border-2 border-yellow-400 p-4 text-blue-900 bg-yellow-50 shadow-md">
          <p className="text-xs uppercase text-center text-blue-900">
            Total Revenue
          </p>
          {isLoading ? (
            <Loader2 className="animate-spin mt-3 mx-auto text-blue-900" />
          ) : (
            <p className="text-3xl font-bold mt-1 text-center">
              ${dashboardTeam?.TeamRevenue?.toFixed(2) || 0}
            </p>
          )}
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
