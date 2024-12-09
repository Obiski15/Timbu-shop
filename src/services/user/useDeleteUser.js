import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { deleteUser as deleteUserAPI } from "./userApi";

function useDeleteUser() {
  const navigate = useNavigate();

  const {
    mutate: deleteUser,
    isPending: isDeletingUser,
    error,
  } = useMutation({
    mutationFn: deleteUserAPI,
    mutationKey: ["user"],

    onSuccess: () => {
      toast.success("Account Deleted Successfully");
      navigate(0);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteUser, isDeletingUser, error };
}

export default useDeleteUser;
