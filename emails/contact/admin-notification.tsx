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
  margin: '0 0 20px',
};

const label = {
  color: '#71717a',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  margin: '16px 0 6px',
};

const text = {
  color: '#27272a',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
};

const messageBox = {
  ...text,
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: '14px 16px',
  border: '1px solid #e4e4e7',
  marginTop: '8px',
};

/** Internal notification sent to the admin inbox when a contact message is received */
export function AdminContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  const preview = `New message: ${subject} — from ${name}`;

  return (
    <Html lang='en'>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Heading style={h1}>New contact message</Heading>
            <Text style={label}>Subject</Text>
            <Text style={text}>{subject}</Text>
            <Hr style={{ borderColor: '#e4e4e7', margin: '20px 0' }} />
            <Text style={label}>From</Text>
            <Text style={text}>{name}</Text>
            <Text style={label}>Email (reply-to)</Text>
            <Text style={text}>{email}</Text>
            <Text style={label}>Message</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>
          <Text
            style={{
              ...text,
              color: '#71717a',
              fontSize: '12px',
              textAlign: 'center' as const,
              marginTop: '24px',
            }}>
            This message was submitted via the toolcalcs.net contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
