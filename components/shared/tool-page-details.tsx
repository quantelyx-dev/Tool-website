import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import type { ToolFaq } from '@/components/shared/faq-list';
import { ToolContentSection } from '@/components/shared/tool-content-section';
import { ToolDisclaimer } from '@/components/shared/tool-disclaimer';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { getToolContent } from '@/lib/tool-content';

type ToolPageDetailsProps = {
  toolLink: string;
  faqs: ToolFaq[];
};

/** Everything below the interactive tool: notice, explainer, guide promo, and FAQ. */
export function ToolPageDetails({ toolLink, faqs }: ToolPageDetailsProps) {
  const content = getToolContent(toolLink);

  return (
    <>
      {content?.disclaimer ? (
        <ToolDisclaimer toolLink={toolLink} variant={content.disclaimer} />
      ) : null}
      {content ? <ToolContentSection content={content} /> : null}
      <ToolBlogPromo toolLink={toolLink} />
      <ToolFaqSection faqs={faqs} />
    </>
  );
}
