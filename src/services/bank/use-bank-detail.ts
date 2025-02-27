import { useQuery } from '@tanstack/react-query';
import type { Bank } from './types';
import { http } from '../../utils/http';

async function fetchBankById(bankId: string) {
  const { data } = await http<{ data: Bank }>(`bank-accounts/${bankId}`);

  return data;
}

export function useBankById(bankId: string, options: any = {}) {
  const data = useQuery(['bank-items', bankId], () => fetchBankById(bankId), {
    enabled: bankId !== undefined,
    ...options,
  });

  return data;
}
