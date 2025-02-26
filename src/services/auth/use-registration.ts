import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface RegistrationParams {
    email: string
}

export function useRegisterEmail() {
    const queryClient = useQueryClient();
    return useMutation(
      async (formData: RegistrationParams) => {
        const { email} = formData
      
        return http(`account/register-email`, {
          data: {
            email
          }
        });
      },
      {
        onSuccess: () => {
        },
        onError: (error) => {
          const reason =
            error instanceof Error ? error.message : 'Something went wrong';
  
        },
      }
    );
  }

  interface RequestAuthParams {
    contact_type: string;
    contact_value: string;
    token_type: string
  }
  
export function useRequestAuthCode() {
    const queryClient = useQueryClient();
    return useMutation(
      async (formData: RequestAuthParams) => {
        const { contact_type, contact_value , token_type} = formData
        return http(`request-auth-code`, {
          data: {
            contact_type,
            contact_value,
            token_type
          }
        });
      },
      {
          onSuccess: () => {
        },
        onError: (error) => {
          const reason =
            error instanceof Error ? error.message : 'Something went wrong';
  
        },
      }
    );
  }
  
  
export function useVerifyAuthCode() {
    const queryClient = useQueryClient();
    return useMutation(
      async (formData: RequestAuthParams & {token: string}) => {
        const { contact_type, contact_value , token_type, token} = formData
        return http(`verify-auth-code`, {
          data: {
            contact_type,
            contact_value,
            token_type,
            token
          }
        });
      },
      {
          onSuccess: () => {
        },
        onError: (error) => {
          const reason =
            error instanceof Error ? error.message : 'Something went wrong';
  
        },
      }
    );
  }

  
export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation(
    async (formData: any) => {
      return http(`account/register-clinix`, {
        data: formData
      });
    },
    {
        onSuccess: () => {
      },
      onError: (error) => {
        const reason =
          error instanceof Error ? error.message : 'Something went wrong';

      },
    }
  );
}
  
  