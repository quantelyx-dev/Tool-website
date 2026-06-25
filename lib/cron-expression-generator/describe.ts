import cronstrue from "cronstrue";

export function describeCronExpression(expression: string): string {
  try {
    return cronstrue.toString(expression, {
      use24HourTimeFormat: false,
      verbose: true,
    });
  } catch {
    return "Unable to describe this cron expression.";
  }
}
