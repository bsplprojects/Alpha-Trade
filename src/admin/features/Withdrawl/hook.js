import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { toast } from "sonner";

export const useWithdrawl = () => {
  const withdrawlHistoryMutation = useMutation({
    mutationFn: async ({ memberId, status }) => {
      const res = await http.get(`/BankTransferReport?Status=${status}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status === "FAILURE" || data?.status === "NoData") {
        toast(data?.message);
      }
    },
  });

  const addRemarkMutation = useMutation({
    mutationFn: async (data) => {
      const res = await http.post(`/ApproveBankTransfer`, {
        ID: data?.ID,
        Status: data.status,
        Remark: data.remarks,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status === "SUCCESS") {
        toast.success(data?.message);
        withdrawlHistoryMutation.refetch();
      } else {
        toast.error(data?.message);
      }
    },
  });

  return { withdrawlHistoryMutation, addRemarkMutation };
};
