import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { ContactEmailProps } from '@/lib/types';

const main = {
  backgroundColor: '#f4f4f5',
  fontFamily:
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
};

const container = {
  margin: '0 auto',
  padding: '24px 16px 48px',
  maxWidth: '560px',
};

const card = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '28px 24px',
  border: '1px solid #e4e4e7',
};

const h1 = {
  color: '#18181b',
  fontSize: '22px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 12px',
};

const text = {
  color: '#3f3f46',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 12px',
};

const muted = {
  ...text,
  color: '#71717a',
  fontSize: '14px',
};

const summary = {
  ...text,
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: '14px 16px',
  border: '1px solid #e4e4e7',
  marginTop: '8px',
};

/** Confirmation sent to the person who submitted the contact form */
export function UserContactConfirmationEmail({
  name,
  subject,
  message,
}: ContactEmailProps) {
  const preview = `Thanks, ${name} — we received your message`;

  return (
    <Html lang='en'>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Heading style={h1}>We received your message</Heading>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Thanks for reaching out. Here&apos;s a copy of what you sent us:
            </Text>
            <Text
              style={{
                ...text,
                fontWeight: '600',
                marginBottom: '4px',
                marginTop: '20px',
              }}>
              {subject}
            </Text>
            <Text style={summary}>{message}</Text>
            <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
            <Text style={muted}>
              We aim to respond within a few business days. Replies will come
              from this sender address.
            </Text>
          </Section>
          <Text
            style={{
              ...muted,
              fontSize: '12px',
              textAlign: 'center' as const,
              marginTop: '24px',
            }}>
            toolcalcs.net — your utilities suite
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
