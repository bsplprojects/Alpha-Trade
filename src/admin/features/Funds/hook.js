import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "../../../utils/http";
export const useFunds = (search) => {
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

  return {
    transferMutation,
    fundHistoryMutation,
    data,
    isLoading,
  };
};
