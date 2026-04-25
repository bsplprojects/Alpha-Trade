import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../utils/http";
import { toast } from "sonner";

export function useMember(memberId) {
  const client = useQueryClient();
 
  const { data, isLoading, error } = useQuery({
    queryKey: ["member-details", memberId],
    queryFn: async () => {
      const response = await http.post("/MemberInfoData", {
        UserID: memberId,
      });
      return response.data?.data;
    },
    enabled: Boolean(memberId),
  });

  // admin/member-details/modify
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await http.post("/UpdateChargesData", {
        UserID: data.ConsumerID,
        Name: data.Name,
        SponsId: data.ReferralId,
        Sponsname: data.ReferralName,
        Phonen: data.MobileNo,
        Email: data.PhoneNo,
        Price: data.Price,
        mStatus: data.mStatus,
        Wallet: data.Password,
        PtoP: data.Nominee_Relation,
        Widh: data.Nominee,
        Fname: data.Fname,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Updated Successfully");
      client.invalidateQueries({ queryKey: ["member-details", memberId] });
    },
  });

  // admin/member-details/change-password
  const allMembersInAdmin = useMutation({
    mutationFn: async (search) => {
      const response = await http.get(`/GetMemberPinList/?search=${search}`);
      return response.data;
    },
  });

  // admin/member-details/change-password
  const updateMemberPassword = useMutation({
    mutationFn: async (data) => {
      const response = await http.post("/ChangePasswordConfirm", {
        UserID: data?.memberId,
        NewPass: data?.newPassword,
      });
      return response.data;
    },
  });

  // admin/member-details/activation
  const memberActivation = useMutation({
    mutationFn: async (data) => {
      const res = await http.post("/InvestNowByAdmin", {
        MID: data?.memberId,
        Amount: data?.amount,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Activated Successfully");
    },
  });

  // admin/profile/change-password
  const updateAdminPassword = useMutation({
    mutationFn: async (data) => {
      const response = await http.post("/AdminChargesPass", {
        UserId: data?.memberId,
        NewPin: data?.newPass,
      });
      return response.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["member-details", memberId] });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateMutation,
    allMembersInAdmin,
    updateMemberPassword,
    updateAdminPassword,
    memberActivation,
  };
}
