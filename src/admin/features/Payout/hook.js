import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";

export const usePayout = () => {
  const stakingBonusMutation = useMutation({
    mutationFn: async (search) => {
      const res = await http.get(`/GetGrowth_Income/?search=${search}`);
      return res;
    },
  });

  const sponsorBonusMutation = useMutation({
    mutationFn: async (search) => {
      const res = await http.get(`/GetSponsorIncome/?search=${search}`);
      return res;
    },
  });

  const walletBonusMutation = useMutation({
    mutationFn: async (search) => {
      const res = await http.get(`/GetComission/?search=${search}`);
      return res;
    },
  });

  const performanceBonusMutation = useMutation({
    mutationFn: async (search) => {
      const res = await http.get(`/GetComissionRef/?search=${search}`);
      return res;
    },
  });

  const rewardsMutation = useMutation({
    mutationFn: async (search) => {
      const res = await http.get(`/GetRoyaltyIncome/?search=${search}`);
      return res;
    },
  });

  return {
    stakingBonusMutation,
    sponsorBonusMutation,
    walletBonusMutation,
    performanceBonusMutation,
    rewardsMutation,
  };
};
