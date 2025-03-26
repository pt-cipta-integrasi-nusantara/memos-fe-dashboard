import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";


interface ResetPasswordParams {
  password: string
}

export function useResetPassword() {
  return useMutation(
    async (formData: ResetPasswordParams) => {
      const { password} = formData
    
      return http(`account/reset-password`, {
        data: {
          password
        }
      });
    },
  );
}