import { useQuery } from '@tanstack/react-query';
import type { Payment } from './types';
import { http } from '../../utils/http';

async function fetchPaymentById(paymentId: string) {
  const { data } = await http<{ data: Payment }>(`bank-accounts/${paymentId}`);

  return data;
}

export function usePaymentById(paymentId: string, options: any = {}) {
  const data = useQuery(['payment-items', paymentId], () => fetchPaymentById(paymentId), {
    enabled: paymentId !== undefined,
    ...options,
  });

  return data;
}
