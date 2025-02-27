import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import type{ Payment } from "./types";


async function fetchPaymentList() {
  const baseUrl = window.location.origin;
  const endpointUrl = new URL('/payments', baseUrl);



  const { data } = await http<{data: Payment[]}>(
    endpointUrl.toString().replace(baseUrl, '')
  )

  return data
  }

  export function usePaymentList() {
    const data = useQuery(
      ['payment-list'],
      () => fetchPaymentList()
    );
  
    return data;
  }
