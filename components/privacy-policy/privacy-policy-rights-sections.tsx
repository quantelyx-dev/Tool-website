import {
  Shield,
  Users,
  Globe,
  RefreshCw,
} from "lucide-react";
import {
  Section,
  Divider,
} from "@/components/privacy-policy/privacy-policy-elements";
import { BRAND_NAME } from "@/lib/site-config";

export function PrivacyRightsSections() {
  return (
    <>
      <Section icon={Shield} title="Data security">
        <p className="mb-3 text-muted-foreground">
          We implement appropriate technical measures to protect your
          information. Our website uses HTTPS encryption for all data
          transmitted between your browser and our servers. However, no method
          of internet transmission is 100% secure.
        </p>
      </Section>

      <Divider />

      <Section icon={Users} title="Children's privacy">
        <p className="mb-3 text-muted-foreground">
          {BRAND_NAME} is not directed at children under the age of 13. We do
          not knowingly collect personal information from children. If you
          believe a child has provided us with personal information, please
          contact us immediately.
        </p>
      </Section>

      <Divider />

      <Section icon={Globe} title="Your rights (GDPR & CCPA)">
        <p className="mb-3 text-muted-foreground">
          If you are located in the European Union or California, you have
          additional rights regarding your data:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Right to access the data we hold about you
          </li>
          <li className="mb-[0.4rem]">
            Right to request deletion of your data
          </li>
          <li className="mb-[0.4rem]">Right to opt out of data collection</li>
          <li className="mb-[0.4rem]">Right to data portability</li>
        </ul>
        <p className="mb-3 text-muted-foreground">
          To exercise any of these rights, please contact us using the details
          below.
        </p>
      </Section>

      <Divider />

      <Section icon={RefreshCw} title="Changes to this policy">
        <p className="mb-3 text-muted-foreground">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date. We encourage you
          to review this policy periodically.
        </p>
      </Section>

      <Divider />
    </>
  );
}
