export function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <h2 className="mb-2 flex items-center gap-2 text-base font-medium">
        <Icon className="size-4.5 text-muted-foreground" />
        {title}
      </h2>
      {children}
    </div>
  );
}

export function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-md bg-muted px-5 py-4">
      <p className="m-0 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export function Divider() {
  return <hr className="my-6 border-t border-border" />;
}

export const linkCn =
  "text-blue-700 underline underline-offset-2 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300";
