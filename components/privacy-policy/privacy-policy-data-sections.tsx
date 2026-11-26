import {
  Info,
  Database,
  Wrench,
  Shield,
  Server,
} from "lucide-react";
import {
  Section,
  InfoCard,
  Divider,
} from "@/components/privacy-policy/privacy-policy-elements";
import { BRAND_NAME } from "@/lib/site-config";

export function PrivacyDataSections() {
  return (
    <>
      <Section icon={Info} title="Overview">
        <p className="mb-3 text-muted-foreground">
          Welcome to {BRAND_NAME}. We are committed to protecting your privacy.
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
          Most tools on {BRAND_NAME} do their work entirely in your browser.
          For those tools, we do not store, transmit, or log anything you enter,
          including:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            Names, passwords, emails, or other generated data
          </li>
          <li className="mb-[0.4rem]">
            Financial figures entered into calculators such as the US paycheck
            calculator
          </li>
          <li className="mb-[0.4rem]">
            Text you paste into the formatters, encoders, and testers
          </li>
        </ul>
        <InfoCard>
          Test-data generators on this site, such as the phone number generator, are intended strictly for
          testing and demo purposes. We do not keep a record of the results
          generated for you.
        </InfoCard>
      </Section>

      <Divider />

      <Section icon={Server} title="Tools that use our servers or partners">
        <p className="mb-3 text-muted-foreground">
          A few tools cannot work entirely in your browser. For these, what you
          enter is sent to our servers, and in some cases to a service provider,
          only to produce your result. We do not keep it after the request is
          complete.
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground">
          <li className="mb-[0.4rem]">
            <strong>Text to speech generator</strong> — the text you enter and
            your voice settings are sent securely to our server and on to our AI
            voice provider, which creates the audio. The finished audio is
            streamed back to you. We do not save your text or the audio on this
            site, but the provider processes the text under its own terms, so
            please do not enter passwords, personal data, or confidential
            information.
          </li>
          <li className="mb-[0.4rem]">
            <strong>Sun, Moon &amp; Rising calculator</strong> — your name, birth
            date, birth time, and birth city are sent to our server to calculate
            your chart. The birth city (not your name or birth details) is also
            sent to the OpenStreetMap Nominatim geocoding service to find its
            coordinates.
          </li>
          <li className="mb-[0.4rem]">
            <strong>Daily compound interest calculator</strong> — the figures you
            enter are sent to our server to run the calculation. Currency
            exchange rates are fetched from a public rates service and do not
            include anything you entered.
          </li>
          <li className="mb-[0.4rem]">
            <strong>Random name, email, and username generators</strong> — draw
            from a cached pool of sample identities obtained from a public
            sample-data service. Nothing you enter is sent.
          </li>
          <li className="mb-[0.4rem]">
            <strong>Contact and Request a tool forms</strong> — what you submit
            is emailed to us (and a confirmation to you) through our email
            provider, as described above.
          </li>
        </ul>
      </Section>

      <Divider />

      <Section icon={Shield} title="Abuse prevention">
        <p className="mb-3 text-muted-foreground">
          Because the text to speech generator spends paid provider resources,
          we limit how often it can be used. To enforce the daily limit and block
          automated abuse, we check your IP address, your browser&apos;s user
          agent and language settings, and a random identifier stored in a
          strictly necessary cookie (<code>tts_device</code>, valid for up to one
          year). These values are combined into one-way hashed counters that
          expire within about a day, and they are used only for rate limiting and
          abuse prevention. They are not used for advertising or analytics, and
          they never include the text you enter.
        </p>
      </Section>

      <Divider />
    </>
  );
}
