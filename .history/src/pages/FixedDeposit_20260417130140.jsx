import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../utils/http";
import { toast } from "sonner";

const FixedDeposit = () => {
  const [amount, setAmount] = useState();
  const client = useQueryClient();
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

  const { data: fds } = useQuery({
    queryKey: ["fixed-deposit"],
    queryFn: async () => {
      const res = await http.get(`/FixedDepositReport/?MID=${memberId}`);
      return res.data;
    },
  });

  console.log(fds);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await http.post(
        `/FixedDepositInsert/?MID=${memberId}&Amount=${amount}`,
      );
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
        client.invalidateQueries({ queryKey: ["fixed-deposit"] });
        client.invalidateQueries({ queryKey: ["dashboard"] });
        setAmount("");
      }
    },
  });

  const handleSubmit = () => {
    if (+amount > +data?.data?.[0]?.TotalMemberDeactive) {
      toast.error("Insufficient Balance");
      return;
    }
    mutation.mutate();
  };

  return (
    <main>
      <PageHeader title="Fixed Deposit" />

      <section className="mx-4 my-8 flex flex-col gap-4">
        <div className="w-full max-w-full rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-red-600 text-black shadow-xl">
          {/* Top Label */}
          <p className="text-sm font-medium opacity-80">Available Amount</p>

          {/* Amount */}
          <h1 className="text-3xl font-bold mt-2">
            $ {data?.data?.[0]?.TotalMemberDeactive}
          </h1>
        </div>

        <div>
          <label>Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>
      </section>

      <section>
        {withdrawlHistoryMutation.data?.status === "SUCCESS" && (
          <Table className="border mt-5">
            <TableHeader>
              <TableRow className="text-nowrap bg-white ">
                <TableHead className="w-[100px]">Sr</TableHead>
                <TableHead>Invitation ID</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Account No</TableHead>
                <TableHead>IFSC</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Mobile No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Approved Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
                {memberId === "Admin" && (
                  <TableHead className="text-right">Hide/Show</TableHead>
                )}
              </TableRow>
            </TableHeader>
            {filteredMembers?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No Data Found
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {filteredMembers?.map((d, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{d.MID || "-"}</TableCell>
                    <TableCell>{d.Name || "-"}</TableCell>
                    <TableCell>{d.Amount || "-"}</TableCell>
                    <TableCell>{d.ACCNO || "-"}</TableCell>
                    <TableCell>{d.IFSC || "-"}</TableCell>
                    <TableCell>{d.Bank || "-"}</TableCell>
                    <TableCell>{d.PayMobNo || "-"}</TableCell>
                    <TableCell>{d.PDate?.split("T")[0] || "-"}</TableCell>
                    <TableCell>
                      {d.ApprovedDate?.split("T")[0] || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {d.Status || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsOpen(d);
                          setRemarkData((prev) => ({ ...prev, ID: d.ID }));
                        }}
                      >
                        Remark
                      </Button>
                    </TableCell>
                    {memberId === "Admin" && (
                      <TableCell>
                        <Switch
                          size="sm"
                          checked={
                            ids.find((m) => m.id === d.ID)?.status === "OFF"
                          }
                          onCheckedChange={() =>
                            setIDs((prev) => {
                              const exists = prev.find((m) => m.id === d.ID);

                              if (exists) {
                                return prev.map((m) =>
                                  m.id === d.ID
                                    ? {
                                        ...m,
                                        status:
                                          m.status === "ON" ? "OFF" : "ON",
                                      }
                                    : m,
                                );
                              }

                              return [...prev, { id: d.ID, status: "ON" }];
                            })
                          }
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}
      </section>
    </main>
  );
};

export default FixedDeposit;
