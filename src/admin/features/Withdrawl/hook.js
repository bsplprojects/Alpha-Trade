import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";

export const useWithdrawl = () => {
  const withdrawlHistoryMutation = useMutation({
    mutationFn: async (search) => {
      const res = await http.get(`/GetSendToTrustWallet/?search=${search}`);
      return res.data;
    },
  });

  return { withdrawlHistoryMutation };
};
