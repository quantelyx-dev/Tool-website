<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Frontend Coding rules

1. When using tailwindcss always use `cn` utility for merging classnames.
2. Add terniary operators only for if else case. If there are more than 2 conditions always use a cleaner if-else approach.
3. Use luxon for date and time related tasks.
4. Make custom hooks if we are calling api in the component.
5. A component should have no more than 250 lines of code. If a component is becoming large then create sub-components.
6. Always prioritize using functions/types/interfaces which are already defined. Don't define duplicate functions/types/interfaces if there are already defined.
7. Always prioritize defining types in the same file. If they to be used somewhere else then move them to a custom file and reuse them.
8. Always run lint and build after each feature implementation or fix.
9. Whenever your creating a new component always implement proper accessibility for it as well.
10. Every tool we create must also add GA4 events. Wrap the tool's orchestrator component with `useAnalytics('<tool-slug>')` from `hooks/use-analytics.ts` and call `onUse`/`onResult`/`onCopy`/`onDownload`/`onReset` from `lib/analytics.ts` at the same points every existing tool does (generate click, successful result, copy action, file download, reset). Pass mode-specific context (e.g. selected variant/version, count) as extra params on `onUse`/`onResult` rather than inventing new event names — reuse the existing `GAEventName` set in `lib/analytics.ts` unless a genuinely new interaction type is being tracked.
11. After adding a tool, in addition to lint and build (rule 8), you must actually test it end-to-end in headless Chrome via the DevTools Protocol (CDP) — don't just eyeball the code or curl the page. Workflow:
    - Start the dev server (`npm run dev`), poll `http://localhost:3000` until it responds.
    - Launch headless Chrome: `chrome.exe --headless=new --disable-gpu --no-first-run --no-default-browser-check --remote-debugging-port=9222 --user-data-dir=<scratch dir>`. On this Windows machine the executable is normally at `C:\Program Files\Google\Chrome\Application\chrome.exe`; if that path is missing, check `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe` and `%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe` before asking the user. The `--user-data-dir` flag is what makes this instance isolated from the user's real Chrome profiles — never omit it.
    - Drive it with a small Node script (Node has a built-in `WebSocket` — no Playwright/Puppeteer install needed): fetch `http://localhost:9222/json/new?<url>` to open a tab and get its `webSocketDebuggerUrl`, connect, then use `Page.enable`/`Runtime.enable`/`Log.enable`, `Page.navigate` + wait for `Page.loadEventFired` on the first load, `Runtime.evaluate` to read/query the DOM, `Input.dispatchMouseEvent` (moved/pressed/released at an element's `getBoundingClientRect()` center) to click things — real dispatched clicks are required for Radix UI components (trigger dropdowns, select items), plain `element.click()` is not reliable for them. Use `Page.setDownloadBehavior` to capture CSV exports to a scratch folder and verify the file contents. Take `Page.captureScreenshot` at key steps and actually look at them.
    - After the first full page load, in-app navigation via Next.js `<Link>` is client-side (no new `Page.loadEventFired`) — poll the DOM/URL instead of waiting on that event again, or you'll get a false-failure timeout.
    - Cover: the tool's default happy path, switching every mode/variant option, bulk generation, single-value copy, CSV export (bulk), reset, and the blog promo link if present. Assert on actual rendered values (e.g. regex-validate generated data format), not just "no error thrown". Check for console/runtime errors via `Log.entryAdded` / `Runtime.exceptionThrown`.
    - Clean up: **never run `taskkill //IM chrome.exe //F`** (or any kill-by-image-name equivalent) — it kills every Chrome process on the machine, including the user's real browser windows and profiles, not just the headless test instance. Instead close only the instance you launched: fetch `http://localhost:9222/json/version` for its browser-level `webSocketDebuggerUrl`, connect, and send `{"method":"Browser.close"}` over CDP — this cleanly shuts down just that headless instance. Also stop the dev server: `curl -s -o /dev/null -w "%{http_code}" --max-time 2 http://localhost:3000` should fail/timeout once it's down; if a stray server is still holding the port, find the real owning PID with `powershell -Command "Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess"` and `taskkill //PID <pid> //F` — `lsof`-based port kills have proven unreliable in this Git-Bash-on-Windows setup. Always re-check both are actually down before ending the turn.

## SEO & blog rules (required for every new tool)

Every tool we ship must be paired with an SEO-optimized blog post and correct search-engine metadata. This is not optional polish — it's how we rank and get discovered, so treat it as part of "done" for the feature, not a follow-up task.

1. Every new tool page must use `createPageMetadata` from `lib/seo/metadata.ts` for its `Metadata` export — never hand-roll an inline `Metadata` object. Provide `title` (concise, keyword-led), `description` (benefit-focused, under 160 chars before truncation), `path` (the tool's route), and a `keywords` array covering realistic search queries for that tool.
2. Every new tool must ship with a companion SEO blog post in `lib/blogs/posts/<slug>-guide.ts`, built with the helpers in `lib/blogs/post-helpers.ts` (`h2`, `h3`, `p`, `ul`, `ol`, `callout`, `toolCta`) and typed as `BlogPost` from `lib/blogs/types.ts`. Register the new post in the `ALL_BLOG_POSTS` array in `lib/blogs/index.ts` — a post that isn't registered there will never render or appear in the sitemap.
3. The blog post's `toolLink` must exactly match the tool page's route so `ToolBlogPromo` (rendered on the tool page) can find and link to it, and set `relatedSlugs` to 2-3 topically related posts for internal linking.
4. Add a FAQ array for the tool in `lib/tool-faqs.ts` (5 Q&As, matching the tone/depth of existing entries) and reuse the exact same array for both the tool page's `<ToolFaqSection faqs={...}>` and the blog post's `faqs` field — this keeps the FAQ accordion and the FAQPage JSON-LD on the blog post in sync.
5. Register every new tool in the `TOOL_GROUPS` array in `lib/tools-data.ts` (name, description, link) so it appears in site search, navigation, and category filters — an unregistered tool page is effectively orphaned even if the route works.
6. Do not add JSON-LD to tool pages themselves — structured data (`BlogPosting`, `FAQPage`) lives only on `/blog/[slug]` via `components/blog/blog-article-json-ld.tsx` and `components/blog/blog-faq-json-ld.tsx`. Tool pages get the visual FAQ accordion only.
7. No manual sitemap registration is needed — `next-sitemap` auto-discovers new `/tools/*` and `/blog/*` routes at build time from `next-sitemap.config.js`.

## Backend Coding rules
