import type { Money } from '@app/generated/server.gql';

/**
 * It takes a number and returns a string
 * @param {number} amount - The number to format.
 */
export function formatCurrency(
  amount: number | string,
  options?: {
    currency?: null | string;
    withDecimal?: boolean;
  },
) {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: options?.currency ?? 'USD',
    maximumFractionDigits: options?.withDecimal ? 2 : 0,
    minimumFractionDigits: options?.withDecimal ? 2 : 0,
    style: 'currency',
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
