import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { toast } from "sonner";

export const useFunds = (search) => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["request-history"],
    queryFn: async () => {
      const res = await http.get(`/GetAddFundRequest/?search=${search}`);
      return res.data;
    },
  });

  const transferMutation = useMutation({
    mutationFn: async (data) => {
      const res = await http.post(`/InsertSendFund`, {
        UserId: data.memberId,
        News: data.paymentType,
        NewPin: data.amount,
      });
      return res.data;
    },
  });

  const fundHistoryMutation = useMutation({
    mutationFn: async (search) => {
      const res = await http.get(`/GetSendFund/?search=${search}`);
      return res.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ val, id }) => {
      const res = await http.post(`/UpdateFundById`, {
        Id: id,
        Status: val,
      });
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries(["request-history"]);
    },
  });

  const addfundMutation = useMutation({
    mutationFn: async ({ memberId, amount }) => {
      const res = await http.post(`/InsertRoyaltyIncome`, {
        MID: memberId,
        Amount: amount,
      });
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries(["request-history"]);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return {
    transferMutation,
    fundHistoryMutation,
    data,
    isLoading,
    updateStatus,
    addfundMutation,
  };
};
