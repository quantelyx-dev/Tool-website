import type { UnparseConfig } from 'papaparse';
import { jsonToCSV } from 'react-papaparse';

import type { GeneratedFakeCreditCard } from '@/lib/generate-random-credit-cards/generate';

const UNPARSE: UnparseConfig = {
  newline: '\r\n',
};

function buildFilename(): string {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `random-credit-cards_${yyyy}${mm}${dd}-${hh}${min}${ss}.csv`;
}

type CreditCardCsvRow = {
  holder_name: string;
  issuer: string;
  number: string;
  expiry_month: string;
  expiry_year: string;
  expiry: string;
  cvv: string;
};

function toCsvRows(cards: GeneratedFakeCreditCard[]): CreditCardCsvRow[] {
  return cards.map(card => ({
    holder_name: card.holderName,
    issuer: card.issuer,
    number: card.number,
    expiry_month: card.expiryMonth,
    expiry_year: card.expiryYear,
    expiry: card.expiry,
    cvv: card.cvv,
  }));
}

export function exportCreditCardsToCsv(cards: GeneratedFakeCreditCard[]): void {
  if (cards.length === 0) {
    return;
  }

  const csv = jsonToCSV(toCsvRows(cards), UNPARSE);
  const blob = new Blob([`\uFEFF${csv}`], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = buildFilename();
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}

