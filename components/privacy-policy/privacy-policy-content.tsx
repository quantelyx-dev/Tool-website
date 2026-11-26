import {
  Mail,
} from "lucide-react";
import {
  linkCn,
} from "@/components/privacy-policy/privacy-policy-elements";
import { BRAND_NAME, CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { PrivacyDataSections } from "@/components/privacy-policy/privacy-policy-data-sections";
import { PrivacyCookieSections } from "@/components/privacy-policy/privacy-policy-cookie-sections";
import { PrivacyRightsSections } from "@/components/privacy-policy/privacy-policy-rights-sections";

export function PrivacyPolicyContent({ className }: { className?: string }) {
  return (
    <div className={cn("max-w-2xl py-6 text-[15px] leading-[1.7]", className)}>
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="mb-1 text-[22px] font-medium">Privacy policy</h1>
        <p className="m-0 text-[13px] text-muted-foreground">
          {BRAND_NAME} · Effective date: {LEGAL_EFFECTIVE_DATE}
        </p>
      </div>

      <PrivacyDataSections />
      <PrivacyCookieSections />
      <PrivacyRightsSections />

      <div className="flex items-center gap-3 rounded-lg bg-muted px-5 py-4">
        <Mail className="size-6 shrink-0 text-muted-foreground" />
        <div>
          <p className="mb-0 text-[15px] font-medium">Contact us</p>
          <p className="mb-0 text-[13px] text-muted-foreground">
            For privacy-related questions, email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkCn}>
              {CONTACT_EMAIL}
            </a>{" "}
            or use the Contact page on {BRAND_NAME}
          </p>
        </div>
      </div>
    </div>
  );
}
