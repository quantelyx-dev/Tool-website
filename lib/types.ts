/** Props shared by contact transactional templates */
export type ContactEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/** Props shared by request-a-tool transactional templates */
export type RequestToolEmailProps = {
  name: string;
  email: string;
  toolName: string;
  message: string;
};

export type ToolEntry = {
  name: string;
  description: string;
  link: string;
  /** Last content or behaviour change (YYYY-MM-DD); used as the sitemap lastmod. */
  updatedAt: string;
};

export type ToolGroup = {
  type: string;
  tools: readonly ToolEntry[];
};
