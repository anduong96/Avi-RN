import type { Money } from '@app/generated/server.gql';

/**
 * It takes a number and returns a string
 * @param {number} amount - The number to format.
 */
export function formatCurrency(
  amount: number | string,
  options?: {
    currency?: string | null;
    withDecimal?: boolean;
  },
) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: options?.currency ?? 'USD',
    minimumFractionDigits: options?.withDecimal ? 2 : 0,
    maximumFractionDigits: options?.withDecimal ? 2 : 0,
  });

  return formatter.format(Number(amount));
}

export function formatMoney(
  total: WithOptional<Money, 'currency'>,
  withDecimal?: boolean,
) {
  return formatCurrency(total.amount, {
    currency: total.currency,
    withDecimal,
  });
}
