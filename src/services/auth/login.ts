import { http } from "../../utils/http";
import { User } from "./types";

export interface LoginCredentialsDTO {
    email: string;
    password: string;
  }

  interface LoginResponse {
   status: string;
   status_code: number;
   message: string;
   timestamp: string;
   data: {
    account: User;
    token: string;
    expires: string;
   }
   metadata: any
  }

  
  export async function loginUser(formData: LoginCredentialsDTO) {
    return http<LoginResponse>('/account/login', {
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
  }