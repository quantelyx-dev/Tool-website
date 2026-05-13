<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Coding Rules

When using tailwindcss always use `cn` utility for merging classnames.
Add terniary operators only for if else case. If there are more than 2 conditions always use a cleaner if-else approach.
Use luxon for date and time related tasks.
Make custom hooks if we are calling api in the component.
A component should have no more than 250 lines of code. If a component is becoming large then create sub-components.
Always prioritize using functions which are already defined. Don't define duplicate functions if there are already defined.
Always prioritize defining types in the same file. If they to be used somewhere else then move them to a custom file and reuse them.
Always run lint and build after each feature implementation or fix.
