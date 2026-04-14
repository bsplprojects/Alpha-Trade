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

const TradeIncomeReport = () => {
  const memberId = sessionStorage.getItem("memberId");
  const { data, isLoading } = useQuery({
    queryKey: ["trade-income-report"],
    queryFn: async () => {
      const res = await http.get(`/GetGrowthIncomeByMID?MID=${memberId}`);
      return res.data;
    },
  });

  return (
    <main>
      <PageHeader title="Trade Income Report" />
      {isLoading ? (
        <Loader2 className="animate-spin absolute left-[50%] top-[50%]" />
      ) : (
        <section className="">
          <Table className="border  ">
            <TableHeader>
              <TableRow className="text-nowrap bg-transparent ">
                <TableHead className="w-[100px]">Sr</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
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
                    <TableCell>{d?.pDate?.split("T")[0] || "-"}</TableCell>
                    <TableCell>
                      {Number(d?.Amount)?.toFixed(2) || "-"}
                    </TableCell>
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

export default TradeIncomeReport;
