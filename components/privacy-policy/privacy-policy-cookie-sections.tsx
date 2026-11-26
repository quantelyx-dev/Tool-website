import Link from "next/link";
import {
  BarChart2,
  DollarSign,
  Share2,
} from "lucide-react";
import {
  Section,
  Divider,
  linkCn,
} from "@/components/privacy-policy/privacy-policy-elements";
import { BRAND_NAME } from "@/lib/site-config";

export function PrivacyCookieSections() {
  return (
    <>
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
          We also use Microsoft Clarity (session replay and heatmaps) to find
          usability problems. When you first visit, a banner asks whether to
          accept or reject analytics and advertising cookies. Until you accept,
          Clarity is not loaded and Google tags run with analytics and
          advertising storage denied. Your choice is remembered in your browser
          (local storage key <code>tools:consent:v1</code>), and you can change
          or withdraw it at any time with <strong>Cookie settings</strong> in the
          footer.
        </p>
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
          We plan to show advertisements through Google AdSense. This section
          applies whenever advertising is enabled on {BRAND_NAME}.
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Third-party vendors, including Google, use cookies to serve ads based
            on your prior visits to this website or other websites.
          </li>
          <li className="mb-[0.4rem]">
            Google&apos;s use of advertising cookies, including the DoubleClick
            cookie, enables it and its partners to serve ads to you based on your
            visits to this site and/or other sites on the Internet.
          </li>
          <li className="mb-[0.4rem]">
            You can opt out of personalized advertising in{" "}
            <a
              href="https://adssettings.google.com"
              className={linkCn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </li>
          <li className="mb-[0.4rem]">
            You can opt out of many other vendors&apos; use of cookies for
            personalized advertising at{" "}
            <a
              href="https://www.aboutads.info"
              className={linkCn}
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>
            .
          </li>
        </ul>
        <p className="mb-3 text-muted-foreground">
          To learn how Google uses information from sites that use its services,
          see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className={linkCn}
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/technologies/partner-sites
          </a>
          .
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
          <li className="mb-[0.4rem]">
            Start The Vision (AI voice generation for the text to speech
            generator) —{" "}
            <Link
              href="https://startthevision.com"
              className={linkCn}
              target="_blank"
              rel="noopener noreferrer"
            >
              startthevision.com
            </Link>
          </li>
          <li className="mb-[0.4rem]">
            OpenStreetMap Nominatim (location lookup for the Sun, Moon &amp;
            Rising calculator) —{" "}
            <Link
              href="https://osmfoundation.org/wiki/Privacy_Policy"
              className={linkCn}
              target="_blank"
              rel="noopener noreferrer"
            >
              osmfoundation.org/wiki/Privacy_Policy
            </Link>
          </li>
          <li className="mb-[0.4rem]">
            Resend (email delivery for our forms) and Upstash (caching and rate
            limiting) act as infrastructure providers for our own services.
          </li>
        </ul>
        <p className="mb-3 text-muted-foreground">
          We do not sell, trade, or transfer your data to any other third
          parties. The providers above receive only what is needed to deliver the
          feature you used.
        </p>
      </Section>

      <Divider />
    </>
  );
}
