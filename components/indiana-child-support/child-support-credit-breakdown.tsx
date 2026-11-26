import type { IndianaWorksheet } from '@/lib/indiana-child-support/compute-child-support';
import { PARENT_LABELS } from '@/lib/indiana-child-support/form-helpers';
import { formatUsd } from '@/lib/indiana-child-support/money';

/** Line 7 adjustments for the paying parent, with the parenting time credit worksheets. */
export function ChildSupportCreditBreakdown({
  result,
  childCareCredit,
  healthCredit,
}: {
  result: IndianaWorksheet;
  childCareCredit: number;
  healthCredit: number;
}) {
  return (
    <div className='space-y-3 text-sm'>
      <h3 className='font-semibold text-foreground'>
        Line 7 adjustments for {PARENT_LABELS[result.payor]}
      </h3>
      <ul className='space-y-1 text-muted-foreground'>
        <li>7B. Child care they pay: −{formatUsd(childCareCredit)}</li>
        <li>7C. Health premium they pay: −{formatUsd(healthCredit)}</li>
        <li>7D. Parenting time credit: −{formatUsd(result.parentingTimeCredit)}</li>
      </ul>
      {result.parentingTimeWorksheets.map(sheet => (
        <p key={sheet.overnights} className='text-xs leading-relaxed text-muted-foreground'>
          Credit worksheet at {sheet.overnights} overnights: line 4 ×{' '}
          {sheet.totalFraction.toFixed(3)} = {formatUsd(sheet.totalExpenses)}, minus
          their share of duplicated expenses ({formatUsd(sheet.payorShareOfDuplicated)}{' '}
          of {formatUsd(sheet.duplicatedExpenses)}) = {formatUsd(sheet.credit)}.
        </p>
      ))}
      {result.parentingTimeWorksheets.length > 1 ? (
        <p className='text-xs text-muted-foreground'>
          Children have different overnights, so the credit is the average of the
          amounts above.
        </p>
      ) : null}
    </div>
  );
}
