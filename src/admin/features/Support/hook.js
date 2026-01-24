import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";

export const useSupport = () => {
  const mutation = useMutation({
    mutationFn: async (status = "Pending") => {
      const res = await http.get(`/GetMessage_Box/?search=${status}`);
      return res.data;
    },
  });

  const messageReplyMutation = useMutation({
    mutationFn: async () => {
      const res = await http.post(``);
      return res.data;
    },
  });

  return { mutation, messageReplyMutation };
};
