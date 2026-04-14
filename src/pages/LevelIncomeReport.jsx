import React from "react";
import PageHeader from "@/components/PageHeader";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const LevelIncomeReport = () => {
  const memberId = sessionStorage.getItem("memberId");
  const { data, isLoading } = useQuery({
    queryKey: ["trade-income-report"],
    queryFn: async () => {
      const res = await http.get(`/GetCommissionByMID?MID=${memberId}`);
      return res.data;
    },
  });

  return (
    <main>
      <PageHeader title="Level Income Report" />
      {isLoading ? (
        <Loader2 className="animate-spin absolute left-[50%] top-[50%]" />
      ) : (
        <section className="">
          <Table className="border  ">
            <TableHeader>
              <TableRow className="text-nowrap ">
                <TableHead className="w-[100px]">Sr</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Payout Date</TableHead>
                <TableHead>Level Income</TableHead>
                <TableHead>From Consumer Id</TableHead>
              </TableRow>
            </TableHeader>
            {data?.data?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No Data Found
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {data?.data?.map((d, index) => (
                  <TableRow key={index} className="bg-white">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{d?.Lavel || "-"}</TableCell>
                    <TableCell>{d?.Payoutdate?.split("T")[0] || "-"}</TableCell>
                    <TableCell>
                      {Number(d?.Levelincome)?.toFixed(2) || "-"}
                    </TableCell>
                    <TableCell>{d?.lavelcosumied || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </section>
      )}
    </main>
  );
};

export default LevelIncomeReport;
