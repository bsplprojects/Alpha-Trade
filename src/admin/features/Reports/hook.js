import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";

export const useAdminReports = () => {
  const memberId = sessionStorage.getItem("memberId");
  // activation report details
  const activationDetailsMutation = useMutation({
    mutationFn: async (search) => {
      const response = await http.get(`/GetActivetionDetail/?search=${search}`);
      return response.data;
    },
  });

  // joining report members
  const reportMembers = useMutation({
    mutationFn: async (search) => {
      const response = await http.get(`/GetJoiningMember/?search=${search}`);
      return response.data;
    },
  });

  // ledger report details
  const ledgerDetailsMutation = useMutation({
    mutationFn: async (search) => {
      const response = await http.get(`/Getledger/?search=${search}`);
      return response.data;
    },
  });

  return {
    activationDetailsMutation,
    reportMembers,
    ledgerDetailsMutation,
  };
};
