import {
  Ban,
  ShieldOff,
  Pencil,
  RefreshCw,
  Globe,
} from "lucide-react";
import {
  Section,
  Divider,
} from "@/components/terms-of-service/terms-of-service-elements";
import { BRAND_NAME } from "@/lib/site-config";

export function TermsLiabilitySections() {
  return (
    <>
      <Section icon={Ban} title="Disclaimer of warranties">
        <p className="mb-3 text-muted-foreground">
          {BRAND_NAME}{" "}
          is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without any warranties of any kind, either
          express or implied, including but not limited to:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Accuracy or completeness of tool results
          </li>
          <li className="mb-[0.4rem]">
            Uninterrupted or error-free operation of the website
          </li>
          <li className="mb-[0.4rem]">Fitness for a particular purpose</li>
          <li className="mb-[0.4rem]">
            Freedom from viruses or other harmful components
          </li>
        </ul>
      </Section>

      <Divider />

      <Section icon={ShieldOff} title="Limitation of liability">
        <p className="mb-3 text-muted-foreground">
          To the fullest extent permitted by law, {BRAND_NAME} and its owners
          shall not be liable for any direct, indirect, incidental, special, or
          consequential damages arising from:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Your use or inability to use our tools
          </li>
          <li className="mb-[0.4rem]">
            Any errors or inaccuracies in tool results
          </li>
          <li className="mb-[0.4rem]">
            Any decisions made based on our calculator outputs
          </li>
          <li className="mb-[0.4rem]">
            Unauthorized access to or alteration of your data
          </li>
        </ul>
      </Section>

      <Divider />

      <Section icon={Pencil} title="Tool request policy">
        <p className="mb-3 text-muted-foreground">
          We welcome tool suggestions via our Request a Tool page. By submitting
          a request:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            You understand we are not obligated to build any requested tool
          </li>
          <li className="mb-[0.4rem]">
            Submitted ideas become suggestions only and carry no ownership
            rights
          </li>
          <li className="mb-[0.4rem]">
            We reserve the right to decline any request at our discretion
          </li>
        </ul>
      </Section>

      <Divider />

      <Section icon={RefreshCw} title="Changes to these terms">
        <p className="mb-3 text-muted-foreground">
          We reserve the right to update these Terms of Service at any time.
          Changes will be posted on this page with an updated date. Continued
          use of {BRAND_NAME} after changes are posted constitutes your
          acceptance of the revised terms.
        </p>
      </Section>

      <Divider />

      <Section icon={Globe} title="Governing law">
        <p className="mb-3 text-muted-foreground">
          These terms shall be governed by and construed in accordance with the
          laws of Pakistan. Any disputes arising under these terms shall be
          subject to the jurisdiction of the courts of Pakistan. However, we aim
          to resolve any issues informally first — please contact us before
          pursuing legal action.
        </p>
      </Section>

      <Divider />
    </>
  );
}
