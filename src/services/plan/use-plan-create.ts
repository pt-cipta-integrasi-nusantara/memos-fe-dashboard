import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface StorePlanParams {
    name?: string;
    description?: string;
    price?: number;
    duration?: string;
    discount?: number
}

export function useCreatePlan() {
    const navigate = useNavigate()
    return useMutation(
      async (formData: StorePlanParams) => {
        const {name, description, price, duration, discount} = formData
        return http(`plans`, {
          data: {
            name,
            description,
            price,
            duration,
            discount
          }
        },);
      },
    )
  }
  