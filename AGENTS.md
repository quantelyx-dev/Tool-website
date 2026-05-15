<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Coding Rules

1. When using tailwindcss always use `cn` utility for merging classnames.
2. Add terniary operators only for if else case. If there are more than 2 conditions always use a cleaner if-else approach.
3. Use luxon for date and time related tasks.
4. Make custom hooks if we are calling api in the component.
5. A component should have no more than 250 lines of code. If a component is becoming large then create sub-components.
6. Always prioritize using functions/types/interfaces which are already defined. Don't define duplicate functions/types/interfaces if there are already defined.
7. Always prioritize defining types in the same file. If they to be used somewhere else then move them to a custom file and reuse them.
8. Always run lint and build after each feature implementation or fix.
9. Whenever your creating a new component always implement proper accessibility for it as well.
