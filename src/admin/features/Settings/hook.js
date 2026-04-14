import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "../../../utils/http";

export const useAdminSettings = () => {
  const { data } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const response = await http.get(`/GetControlPanelList`);
      return response.data;
    },
  });

  const saveSettings = useMutation({
    mutationFn: async (data) => {
      const response = await http.post(`/UpdateControlPanelStatus`, {
        UserId: data.ID,
        Status: data.Status,
      });
      return response.data;
    },
  });

  return {
    controlPanelList: data,
    saveSettings,
  };
};
