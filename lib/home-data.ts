import { BRAND_NAME } from './site-config';

export const faqs = [
  {
    q: `What is ${BRAND_NAME}?`,
    a: `${BRAND_NAME} is a free collection of online tools and calculators built for developers, designers, and everyday users. From generating realistic test data to calculating compound interest and exploring astrology, every tool is free and needs no account.`,
  },
  {
    q: 'Are all the tools completely free to use?',
    a: `Yes — every tool on ${BRAND_NAME} is 100% free with no hidden fees or paywalls. Tools that run in your browser have no limits. The few that rely on paid services, like the text to speech generator, include a fair daily limit so they stay free for everyone.`,
  },
  {
    q: 'Is my data private? Do you store what I enter?',
    a: 'Your privacy is a priority. Most tools run entirely in your browser, so what you enter never leaves your device. A few tools (such as the text to speech generator, the Sun, Moon & Rising calculator, and the daily compound interest calculator) send your input to our servers or a service provider to produce the result. We do not store that input, and we never sell your data. Our Privacy Policy lists exactly which tools do what.',
  },
  {
    q: 'How do I request a new tool?',
    a: 'Click "Request a tool" in the navigation bar and fill in the short form with the tool you need and how you would use it. We read every submission and use these requests when deciding what to build. Sending a request does not guarantee that a tool will be made.',
  },
  {
    q: 'How do you keep the tools accurate?',
    a: 'Each tool page explains how the result is produced, shows a worked example, and lists the limits of the tool. Calculators that depend on published rules or tax figures link to their sources. If you find a result that looks wrong, send us the inputs through the Contact page so we can check it.',
  },
  {
    q: 'Can I use the generated data in production apps?',
    a: 'No. Names, emails, phone numbers, addresses, and similar output from our generators are test data for development, testing, and demos. Do not use them in live, user-facing systems, to create accounts on other services, or to deceive anyone. Common names or generated addresses can resemble real ones by coincidence.',
  },
];
