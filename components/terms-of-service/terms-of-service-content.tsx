import Link from "next/link";
import {
  Info,
  Wrench,
  AlertTriangle,
  Calculator,
  Download,
  Copyright,
  Megaphone,
  Link as LinkIcon,
  Ban,
  ShieldOff,
  Pencil,
  RefreshCw,
  Globe,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteDomain } from "@/lib/site-config";

function Section({
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

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-md bg-muted px-5 py-4">
      <p className="m-0 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function WarningCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex items-start gap-2.5 rounded-md bg-amber-50 px-5 py-4 dark:bg-amber-950/30">
      <AlertTriangle className="mt-0.5 size-4.5 shrink-0 text-amber-600 dark:text-amber-400" />
      <p className="m-0 text-sm text-amber-700 dark:text-amber-400">
        {children}
      </p>
    </div>
  );
}

function Divider() {
  return <hr className="my-6 border-t border-border" />;
}

const linkCn =
  "text-blue-700 underline underline-offset-2 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300";

export function TermsOfServiceContent({ className }: { className?: string }) {
  return (
    <div className={cn("max-w-2xl py-6 text-[15px] leading-[1.7]", className)}>
      <div className="mb-8 border-b border-border pb-4">
        <p className="mb-1 text-[22px] font-medium">Terms of service</p>
        <p className="m-0 text-[13px] text-muted-foreground">
          {siteDomain} · Last updated: June 2026
        </p>
      </div>

      <Section icon={Info} title="Agreement to terms">
        <p className="mb-3 text-muted-foreground">
          By accessing or using {siteDomain}, you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not
          use our website. These terms apply to all visitors and users of{' '}
          {siteDomain}.
        </p>
      </Section>

      <Divider />

      <Section icon={Wrench} title="Use of our tools">
        <p className="mb-3 text-muted-foreground">
          {siteDomain} provides free online tools including calculators,
          generators, and utilities. By using these tools, you agree to the
          following:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            All tools are provided for lawful, legitimate purposes only
          </li>
          <li className="mb-[0.4rem]">
            You will not use our tools to generate data intended for fraud or
            illegal activity
          </li>
          <li className="mb-[0.4rem]">
            You will not attempt to overload, hack, or disrupt our services
          </li>
          <li className="mb-[0.4rem]">
            You will not use automated bots or scrapers to mass-generate data
          </li>
          <li className="mb-[0.4rem]">
            You are solely responsible for how you use the output of our tools
          </li>
        </ul>
        <WarningCard>
          Tools such as SSN generators, phone number generators, and email
          generators are intended strictly for software testing and development
          purposes. Any misuse of generated data for fraud, identity theft, or
          illegal activity is strictly prohibited and is the sole responsibility
          of the user.
        </WarningCard>
      </Section>

      <Divider />

      <Section icon={Calculator} title="Accuracy of calculators">
        <p className="mb-3 text-muted-foreground">
          Our calculators — including child support, financial, and legal
          calculators — are provided for informational and educational purposes
          only.
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Results are estimates and may not reflect exact legal or financial
            outcomes
          </li>
          <li className="mb-[0.4rem]">
            Laws and formulas vary by state and change over time
          </li>
          <li className="mb-[0.4rem]">
            Calculator results should not be used as a substitute for
            professional legal or financial advice
          </li>
          <li className="mb-[0.4rem]">
            Always consult a qualified professional for decisions based on
            calculator results
          </li>
        </ul>
        <InfoCard>
          {siteDomain} is not a law firm, financial advisor, or professional
          services provider. Nothing on this website constitutes legal,
          financial, or professional advice.
        </InfoCard>
      </Section>

      <Divider />

      <Section icon={Download} title="CSV & PDF exports">
        <p className="mb-3 text-muted-foreground">
          Our tools allow you to export generated data in CSV and PDF formats.
          By using these export features:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            You acknowledge the exported data is for your personal or
            professional use only
          </li>
          <li className="mb-[0.4rem]">
            You agree not to distribute exported data for commercial resale
          </li>
          <li className="mb-[0.4rem]">
            You take full responsibility for any exported content and its use
          </li>
        </ul>
      </Section>

      <Divider />

      <Section icon={Copyright} title="Intellectual property">
        <p className="mb-3 text-muted-foreground">
          All content on {siteDomain} — including but not limited to tool
          designs, code, graphics, text, and layouts — is the property of{' '}
          {siteDomain} and is protected by applicable intellectual property
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
          {siteDomain} displays advertisements served by Google AdSense and
          potentially other ad networks. By using our site:
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

      <Section icon={LinkIcon} title="Third-party links">
        <p className="mb-3 text-muted-foreground">
          Our website may contain links to third-party websites. These links are
          provided for convenience only. {siteDomain} has no control over the
          content of those sites and accepts no responsibility for them or for
          any loss or damage that may arise from your use of them.
        </p>
      </Section>

      <Divider />

      <Section icon={Ban} title="Disclaimer of warranties">
        <p className="mb-3 text-muted-foreground">
          {siteDomain} is provided on an &quot;as is&quot; and &quot;as
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
          To the fullest extent permitted by law, {siteDomain} and its owners
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
          use of {siteDomain} after changes are posted constitutes your
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

      <div className="flex items-center gap-3 rounded-lg bg-muted px-5 py-4">
        <Mail className="size-6 shrink-0 text-muted-foreground" />
        <div>
          <p className="mb-0 text-[15px] font-medium">Contact us</p>
          <p className="mb-0 text-[13px] text-muted-foreground">
            For any questions about these terms, email us at{" "}
            <Link href="mailto:quantelyx.ai@gmail.com" className={linkCn}>
              quantelyx.ai@gmail.com
            </Link>{" "}
            or use the Contact page on {siteDomain}
          </p>
        </div>
      </div>
    </div>
  );
}
