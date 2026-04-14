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
import { Loader, Loader2 } from "lucide-react";

const ReferalIncomeReport = () => {
  const memberId = sessionStorage.getItem("memberId");
  const { data, isLoading } = useQuery({
    queryKey: ["trade-income-report"],
    queryFn: async () => {
      const res = await http.get(`/GetSponsorIncomeByMID?MID=${memberId}`);
      return res.data;
    },
  });

  return (
    <main>
      <PageHeader title="Referral Income Report" />
      {isLoading ? (
        <Loader2 className="animate-spin absolute left-[50%] top-[50%]" />
      ) : (
        <section className="">
          <Table className="border ">
            <TableHeader>
              <TableRow className="text-nowrap bg-transparent ">
                <TableHead className="w-[100px]">Sr</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>From Member Id</TableHead>
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
                    <TableCell>{d?.pDAte?.split("T")[0] || "-"}</TableCell>
                    <TableCell>{d?.Amount || "-"}</TableCell>
                    <TableCell>{d?.FromMemberID || "-"}</TableCell>
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

export default ReferalIncomeReport;
