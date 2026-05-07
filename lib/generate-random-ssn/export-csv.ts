import type { UnparseConfig } from 'papaparse';
import { jsonToCSV } from 'react-papaparse';

import type { GeneratedFakeSsn } from '@/lib/generate-random-ssn/generate';

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
  return `random-ssn_${yyyy}${mm}${dd}-${hh}${min}${ss}.csv`;
}

type SsnCsvRow = {
  ssn: string;
  area: string;
  group: string;
  serial: string;
};

function toCsvRows(values: GeneratedFakeSsn[]): SsnCsvRow[] {
  return values.map(value => ({
    ssn: value.ssn,
    area: value.area,
    group: value.group,
    serial: value.serial,
  }));
}

export function exportSsnsToCsv(values: GeneratedFakeSsn[]): void {
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
