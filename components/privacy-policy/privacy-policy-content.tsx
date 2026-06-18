import Link from "next/link";
import {
  Info,
  Database,
  Wrench,
  BarChart2,
  DollarSign,
  Share2,
  Shield,
  Users,
  Globe,
  RefreshCw,
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

function Divider() {
  return <hr className="my-6 border-t border-border" />;
}

const linkCn =
  "text-blue-700 underline underline-offset-2 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300";

export function PrivacyPolicyContent({ className }: { className?: string }) {
  return (
    <div className={cn("max-w-2xl py-6 text-[15px] leading-[1.7]", className)}>
      <div className="mb-8 border-b border-border pb-4">
        <p className="mb-1 text-[22px] font-medium">Privacy policy</p>
        <p className="m-0 text-[13px] text-muted-foreground">
          {siteDomain} · Last updated: June 2026
        </p>
      </div>

      <Section icon={Info} title="Overview">
        <p className="mb-3 text-muted-foreground">
          Welcome to {siteDomain}. We are committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and safeguard your
          information when you visit our website. By using our site, you agree
          to the terms described below.
        </p>
      </Section>

      <Divider />

      <Section icon={Database} title="Information we collect">
        <p className="mb-3 text-muted-foreground">
          We collect minimal data to provide and improve our services. The types
          of data we may collect include:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Usage data — pages visited, tools used, time spent on site
          </li>
          <li className="mb-[0.4rem]">
            Device data — browser type, operating system, screen resolution
          </li>
          <li className="mb-[0.4rem]">
            Location data — country/region level only (not precise location)
          </li>
          <li className="mb-[0.4rem]">
            Referral data — how you arrived at our website
          </li>
        </ul>
        <InfoCard>
          We do <strong>not</strong> collect your name, email address, or any
          personally identifiable information unless you voluntarily submit it
          via our Contact or Tool Request form.
        </InfoCard>
      </Section>

      <Divider />

      <Section icon={Wrench} title="How our tools work">
        <p className="mb-3 text-muted-foreground">
          All calculations, generations, and exports performed on {siteDomain}
          happen entirely in your browser. We do not store, transmit, or log any
          data you enter into our tools including:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Names, passwords, emails, or other generated data
          </li>
          <li className="mb-[0.4rem]">
            Financial figures entered into calculators
          </li>
          <li className="mb-[0.4rem]">
            Legal or personal information used in calculators
          </li>
        </ul>
        <InfoCard>
          SSN and phone number generators on this site are intended strictly for
          software testing and development purposes. We do not store or share
          any generated data.
        </InfoCard>
      </Section>

      <Divider />

      <Section icon={BarChart2} title="Analytics & cookies">
        <p className="mb-3 text-muted-foreground">
          We use Google Analytics 4 to understand how visitors use our website.
          This service may collect:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">Pages you visit and tools you use</li>
          <li className="mb-[0.4rem]">Time spent on each page</li>
          <li className="mb-[0.4rem]">
            General geographic location (country/city level)
          </li>
          <li className="mb-[0.4rem]">Device and browser information</li>
        </ul>
        <p className="mb-3 text-muted-foreground">
          Google Analytics uses cookies — small text files stored on your
          device. You can opt out of Google Analytics by installing the{" "}
          <Link
            href="https://tools.google.com/dlpage/gaoptout"
            className={linkCn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </Link>
          .
        </p>
      </Section>

      <Divider />

      <Section icon={DollarSign} title="Google AdSense & advertising">
        <p className="mb-3 text-muted-foreground">
          We use Google AdSense to display advertisements on our website. Google
          may use cookies to serve ads based on your prior visits to our site or
          other websites. You can opt out of personalized advertising by
          visiting{" "}
          <Link
            href="https://www.google.com/settings/ads"
            className={linkCn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </Link>
          .
        </p>
        <p className="mb-3 text-muted-foreground">
          Third-party ad vendors, including Google, use cookies to serve ads
          based on your visits to this and other websites. These cookies allow
          them to display relevant advertisements.
        </p>
      </Section>

      <Divider />

      <Section icon={Share2} title="Third-party services">
        <p className="mb-3 text-muted-foreground">
          Our website may use the following third-party services, each with
          their own privacy policies:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Google Analytics —{" "}
            <Link
              href="https://policies.google.com/privacy"
              className={linkCn}
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </Link>
          </li>
          <li className="mb-[0.4rem]">
            Google AdSense —{" "}
            <Link
              href="https://policies.google.com/privacy"
              className={linkCn}
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </Link>
          </li>
        </ul>
        <p className="mb-3 text-muted-foreground">
          We do not sell, trade, or transfer your data to any other third
          parties.
        </p>
      </Section>

      <Divider />

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
          {siteDomain} is not directed at children under the age of 13. We do
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

      <div className="flex items-center gap-3 rounded-lg bg-muted px-5 py-4">
        <Mail className="size-6 shrink-0 text-muted-foreground" />
        <div>
          <p className="mb-0 text-[15px] font-medium">Contact us</p>
          <p className="mb-0 text-[13px] text-muted-foreground">
            For privacy-related questions, email us at{" "}
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
