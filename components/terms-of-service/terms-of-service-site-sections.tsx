import Link from "next/link";
import {
  Cookie,
  Copyright,
  Megaphone,
  Link as LinkIcon,
} from "lucide-react";
import {
  Section,
  Divider,
  linkCn,
} from "@/components/terms-of-service/terms-of-service-elements";
import { BRAND_NAME } from "@/lib/site-config";

export function TermsSiteSections() {
  return (
    <>
      <Section icon={Copyright} title="Intellectual property">
        <p className="mb-3 text-muted-foreground">
          All content on {BRAND_NAME} — including but not limited to tool
          designs, code, graphics, text, and layouts — is the property of{' '}
          {BRAND_NAME} and is protected by applicable intellectual property
          laws.
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            You may not copy, reproduce, or redistribute our tools or content
            without permission
          </li>
          <li className="mb-[0.4rem]">
            You may not create derivative works based on our tools without
            written consent
          </li>
          <li className="mb-[0.4rem]">
            Our name and logo may not be used without prior written permission
          </li>
        </ul>
      </Section>

      <Divider />

      <Section icon={Megaphone} title="Advertising">
        <p className="mb-3 text-muted-foreground">
          {BRAND_NAME} may display advertisements served by Google AdSense and
          potentially other ad networks. When ads are shown:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            You acknowledge that ads are displayed on our pages
          </li>
          <li className="mb-[0.4rem]">
            You agree not to click ads artificially or fraudulently
          </li>
          <li className="mb-[0.4rem]">
            We are not responsible for the content of third-party advertisements
          </li>
          <li className="mb-[0.4rem]">
            Ad targeting is managed by Google per their own privacy policies
          </li>
        </ul>
      </Section>

      <Divider />

      <Section icon={Cookie} title="Cookies">
        <p className="mb-3 text-muted-foreground">
          {BRAND_NAME} uses cookies and similar browser storage for analytics,
          advertising when it is enabled, abuse prevention, and remembering your
          choices. Our{" "}
          <Link href="/privacy-policy" className={linkCn}>
            Privacy Policy
          </Link>{" "}
          explains what is used and how you can control it.
        </p>
      </Section>

      <Divider />

      <Section icon={LinkIcon} title="Third-party links">
        <p className="mb-3 text-muted-foreground">
          Our website may contain links to third-party websites. These links are
          provided for convenience only. {BRAND_NAME} has no control over the
          content of those sites and accepts no responsibility for them or for
          any loss or damage that may arise from your use of them.
        </p>
      </Section>

      <Divider />
    </>
  );
}
