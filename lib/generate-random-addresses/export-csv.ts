import type { UnparseConfig } from 'papaparse';
import { jsonToCSV } from 'react-papaparse';

import type { GeneratedAddress } from '@/lib/generate-random-addresses/generate';

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
  return `fictional-addresses_${yyyy}${mm}${dd}-${hh}${min}${ss}.csv`;
}

type AddressCsvRow = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formattedAddress: string;
};

function toCsvRows(values: GeneratedAddress[]): AddressCsvRow[] {
  return values.map(value => ({
    streetAddress: value.streetAddress,
    city: value.city,
    state: value.state,
    postalCode: value.postalCode,
    country: value.country,
    formattedAddress: value.formattedAddress,
  }));
}

export function exportAddressesToCsv(values: GeneratedAddress[]): void {
  if (values.length === 0) {
    return;
  }

  const csv = jsonToCSV(toCsvRows(values), UNPARSE);
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
