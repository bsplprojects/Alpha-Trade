import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const Vip = () => {
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("memberId");

  const { data, isLoading } = useQuery({
    queryKey: ["vip"],
    queryFn: async () => {
      const res = await http.post("/MyDeilyBouns", {
        UserID: memberId,
      });
      return res.data?.data;
    },
  });

  return (
    <main className="page-content">
      <header className="header-gradient flex items-center gap-2">
        <ArrowLeft onClick={() => navigate(-1)} />
        <h1 className="text-lg text-white">VIP</h1>
      </header>

      {isLoading && <Loader2 className="animate-spin" />}

      <Table>
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-nowrap">Daily Bonus</TableHead>
            <TableHead>Level 1</TableHead>
            <TableHead>Level 123</TableHead>
            <TableHead>Active </TableHead>
            <TableHead className="text-right">Achieved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((d, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{d?.VipName}</TableCell>
              <TableCell className="font-medium">₹{d?.RewardAmount}</TableCell>
              <TableCell className="font-medium">
                {d?.CurrentLevel1}/{d?.RequiredLevel1}
              </TableCell>
              <TableCell className="font-medium">
                {d?.CurrentLevel123}/{d?.RequiredLevel123}
              </TableCell>
              <TableCell className="font-medium">
                {d?.CurrentActive}/{d?.RequiredActive}
              </TableCell>
              <TableCell
                className={`font-medium ${d?.Achieved === false ? "text-red-500" : "text-indigo-500"}`}
              >
                {d?.Achieved === false ? "PENDING" : "ACHIEVED"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default Vip;
