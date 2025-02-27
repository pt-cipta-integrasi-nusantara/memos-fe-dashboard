import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import type { Bank } from "./types";


async function fetchBankList() {
  const baseUrl = window.location.origin;
  const endpointUrl = new URL('/bank-accounts', baseUrl);



  const { data } = await http<{data: Bank[]}>(
    endpointUrl.toString().replace(baseUrl, '')
  )

  return data
  }

  export function useBankList() {
    const data = useQuery(
      ['bank-list'],
      () => fetchBankList()
    );
  
    return data;
  }
