import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { cronExpressionFaqs } from "@/lib/tool-faqs";

export const cronExpressionGeneratorPost: BlogPost = {
  slug: "cron-expression-generator-guide",
  title: "Cron Expression Generator Guide: Build Schedules Without Memorizing Syntax",
  excerpt:
    "Learn cron field syntax, 5-field vs 6-field formats, common presets, and how to use generated expressions in crontab, GitHub Actions, and Kubernetes.",
  keywords: [
    "cron expression generator",
    "cron builder",
    "crontab generator",
    "cron schedule syntax",
    "cron expression guide",
    "GitHub Actions cron schedule",
  ],
  toolLink: "/tools/cron-expression-generator",
  toolName: "Cron expression generator",
  publishedAt: "2026-06-26",
  updatedAt: "2026-06-26",
  readTimeMinutes: 12,
  relatedSlugs: [
    "uuid-v7-generator-guide",
    "strong-password-generator-guide",
  ],
  sections: [
    p(
      "Cron expressions power the background jobs that keep production systems running — nightly backups, hourly cache refreshes, weekly report emails, and CI pipelines triggered on a schedule. The syntax is compact but easy to get wrong: swap a field, misplace a step value, or confuse day-of-month with day-of-week and your job runs at the wrong time — or not at all.",
    ),
    p(
      "This guide covers cron field syntax, the difference between 5-field and 6-field formats, common scheduling patterns, and how to use generated expressions across Linux crontab, GitHub Actions, and Kubernetes CronJobs.",
    ),
    h2("What is a cron expression?"),
    p(
      "A cron expression is a space-separated string where each field represents a time unit. Standard Unix cron uses five fields: minute, hour, day of month, month, and day of week. Some runtimes add a sixth seconds field at the beginning. Schedulers evaluate the expression against the current time and fire the job when all fields match.",
    ),
    p(
      "Example: `0 9 * * *` runs at 9:00 AM every day. The first field (minute) is 0, the second (hour) is 9, and the remaining fields are wildcards meaning every day, every month, and every day of the week.",
    ),
    h3("5-field vs 6-field cron"),
    p(
      "Linux crontab, GitHub Actions, and most POSIX schedulers expect five fields. Node.js cron libraries, Spring @Scheduled, and some cloud schedulers expect six fields with seconds first. The 6-field equivalent of daily at 9:00 AM is `0 0 9 * * *` — seconds at 0, minute at 0, hour at 9.",
    ),
    ul([
      "5-field: minute hour day-of-month month day-of-week — Linux crontab, GitHub Actions, Kubernetes CronJob",
      "6-field: second minute hour day-of-month month day-of-week — Node cron, Spring, Quartz-style APIs",
      "Always verify which format your target system expects before deploying",
    ]),
    toolCta(),
    h2("Cron field reference"),
    p(
      "Each field accepts specific values, ranges, lists, or wildcards. Understanding these patterns is the key to reading and writing cron expressions confidently.",
    ),
    ul([
      "* — every value (wildcard)",
      "5 — exactly at value 5",
      "1,15 — at values 1 and 15 (comma-separated list)",
      "9-17 — from 9 through 17 inclusive (range)",
      "*/5 — every 5 units starting from 0 (step)",
      "1-30/5 — every 5 units within the range 1–30",
    ]),
    h3("Day-of-month vs day-of-week"),
    p(
      "These two fields interact in subtle ways. In standard cron, if both day-of-month and day-of-week are restricted (not *), the job runs when either condition matches — an OR relationship. For predictable schedules, keep one field as * and restrict the other. Example: `0 9 * * 1` runs every Monday at 9 AM; `0 9 1 * *` runs on the 1st of every month at 9 AM.",
    ),
    h2("Common cron presets"),
    p(
      "Most production schedules fall into a handful of patterns. Here are the expressions and when to use each.",
    ),
    ol([
      "Every minute — `* * * * *` (5-field) or `0 * * * * *` (6-field at second 0): health checks, polling",
      "Every hour — `0 * * * *`: cache warming, metrics aggregation",
      "Daily at 9 AM — `0 9 * * *`: report generation, log rotation",
      "Weekly on Monday — `0 9 * * 1`: weekly digests, sprint reports",
      "Monthly on the 1st — `0 9 1 * *`: billing cycles, monthly summaries",
      "Weekdays only — `0 9 * * 1-5`: business-hours batch jobs",
    ]),
    callout(
      "Day-of-week numbering varies: 0 or 7 = Sunday in most Unix cron implementations. GitHub Actions and Kubernetes follow this convention. Always test your expression before relying on it in production.",
    ),
    h2("Using cron in Linux crontab"),
    p(
      "Edit your crontab with `crontab -e`. Each line has the expression followed by the command. The cron daemon uses the system timezone unless you set CRON_TZ in the crontab file. Example: `0 2 * * * /usr/local/bin/backup.sh` runs the backup script at 2:00 AM daily.",
    ),
    h3("GitHub Actions schedule"),
    p(
      "GitHub Actions workflows use the `schedule` trigger with a cron expression in UTC. Example: `cron: '0 9 * * 1-5'` runs at 9:00 UTC on weekdays. If your team is in US Eastern time, convert accordingly — 9 AM EST is 14:00 UTC during standard time. GitHub does not support seconds in schedule expressions.",
    ),
    toolCta(),
    h2("Kubernetes CronJob"),
    p(
      "Kubernetes CronJob resources accept standard 5-field cron in the `schedule` field. The controller evaluates schedules in the controller manager's timezone (typically UTC). Example manifest snippet: `schedule: \"0 9 * * *\"` with `timeZone: \"America/New_York\"` (supported in Kubernetes 1.27+) for explicit timezone control.",
    ),
    h2("Timezone pitfalls"),
    p(
      "Cron expressions do not embed timezone information — the scheduler interprets them in its configured timezone. A job scheduled for `0 9 * * *` on a UTC server fires at 9 AM UTC, not 9 AM in your local timezone. Daylight saving time transitions can cause jobs to run twice or skip entirely if the scheduler does not handle DST correctly. Always document the expected timezone alongside the expression in runbooks and infrastructure code.",
    ),
    h2("Testing and validating schedules"),
    p(
      "Before deploying a new schedule, preview the next several run times in your target timezone. Our cron expression generator shows a human-readable summary and the next five execution times so you can catch off-by-one-hour errors, wrong weekday selections, and format mismatches before they reach production.",
    ),
    h2("Free cron expression generator"),
    p(
      "Use our tool to build expressions with presets or custom fields, switch between 5-field and 6-field formats, and copy the result directly into crontab, CI configs, or Kubernetes manifests — no install, no sign-up, all in the browser.",
    ),
  ],
  faqs: cronExpressionFaqs,
};
