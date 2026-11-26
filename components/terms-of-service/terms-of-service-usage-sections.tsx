import {
  Info,
  Wrench,
  UserCheck,
  Calculator,
  Download,
} from "lucide-react";
import {
  Section,
  InfoCard,
  WarningCard,
  Divider,
} from "@/components/terms-of-service/terms-of-service-elements";
import { BRAND_NAME } from "@/lib/site-config";
import { TTS_COOLDOWN_SECONDS, TTS_DAILY_LIMITS } from "@/lib/server/tts-quota";

export function TermsUsageSections() {
  return (
    <>
      <Section icon={Info} title="Agreement to terms">
        <p className="mb-3 text-muted-foreground">
          By accessing or using {BRAND_NAME}, you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not
          use our website. These terms apply to all visitors and users of{' '}
          {BRAND_NAME}.
        </p>
      </Section>

      <Divider />

      <Section icon={UserCheck} title="Age eligibility">
        <p className="mb-3 text-muted-foreground">
          You must be at least 13 years old to use {BRAND_NAME}. If you are under
          the age of legal majority where you live, you may use the site only with
          the permission and supervision of a parent or legal guardian, who agrees
          to these terms for you.
        </p>
      </Section>

      <Divider />

      <Section icon={Wrench} title="Use of our tools">
        <p className="mb-3 text-muted-foreground">
          {BRAND_NAME} provides free online tools including calculators,
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
          <li className="mb-[0.4rem]">
            The text to speech generator allows {TTS_DAILY_LIMITS.ip} generations
            per visitor per day, resetting at midnight UTC, with at least{" "}
            {TTS_COOLDOWN_SECONDS} seconds between requests. Shared limits of{" "}
            {TTS_DAILY_LIMITS.network} per network and {TTS_DAILY_LIMITS.global}{" "}
            for the whole site also apply, so it may be unavailable before you
            reach your own limit
          </li>
          <li className="mb-[0.4rem]">
            You will not try to bypass these limits (for example by automating requests, rotating IP
            addresses, or clearing cookies)
          </li>
          <li className="mb-[0.4rem]">
            You will not use the text to speech generator to impersonate a real
            person, mislead or harass others, or narrate content you do not have
            the right to use, and you are responsible for any rights in the text
            you submit
          </li>
        </ul>
        <WarningCard>
          Test-data tools such as the phone number and email generators are intended strictly for software testing and development
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
          {BRAND_NAME} is not a law firm, financial advisor, or professional
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
    </>
  );
}
