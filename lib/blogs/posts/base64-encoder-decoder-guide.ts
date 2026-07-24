import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { base64ToolFaqs } from "@/lib/tool-faqs";

export const base64ToolPost: BlogPost = {
  slug: "base64-encoder-decoder-guide",
  title: "Base64 Encoding Explained: Text, Files, Data URIs, and JWTs",
  excerpt:
    "What Base64 actually is (and isn't), when to use URL-safe encoding, how to turn images into data URIs, and how JWT tokens use Base64 under the hood.",
  keywords: [
    "base64 encoding explained",
    "base64 vs encryption",
    "base64url",
    "image to base64 data uri",
    "how jwt works",
    "decode jwt token",
  ],
  toolLink: "/tools/base64-encoder-decoder",
  toolName: "Base64 encoder & decoder",
  publishedAt: "2026-07-24",
  updatedAt: "2026-07-24",
  readTimeMinutes: 11,
  relatedSlugs: [
    "uuid-v7-generator-guide",
    "regex-tester-guide",
    "random-ip-address-generator-guide",
  ],
  sections: [
    p(
      "Base64 shows up everywhere in software development — email attachments, API payloads, CSS background images, and every JWT you've ever seen start with 'eyJ'. Yet it's also one of the most misunderstood tools in a developer's kit: plenty of people assume it's a form of security when it's actually the opposite of secret. This guide clears up what Base64 really does, when standard encoding isn't enough, and how to work with it across text, files, and tokens.",
    ),
    h2("What Base64 actually does"),
    p(
      "Base64 converts arbitrary binary data into a string made up of only 64 safe, printable ASCII characters (A-Z, a-z, 0-9, +, /). It exists because many older systems — email (MIME), URLs, JSON, XML — were designed to carry text, not raw bytes. If you need to embed an image, a PDF, or any binary blob inside a text-based format, Base64 is the standard way to do it: every 3 bytes of input become 4 Base64 characters, which is why encoded output is roughly 33% larger than the original.",
    ),
    callout(
      "Base64 is encoding, not encryption. It provides zero confidentiality — anyone can decode a Base64 string instantly with no key. Never use it to 'hide' passwords, tokens, or secrets; use real encryption (like AES) if confidentiality is the goal.",
    ),
    toolCta(),
    h2("Standard Base64 vs URL-safe Base64 (Base64url)"),
    p(
      "Standard Base64's alphabet includes + and /, and pads output with = so the length is always a multiple of 4. Both of those characters carry special meaning in URLs, query strings, and file paths, so pasting standard Base64 into a URL without escaping it can break routing or get silently mangled by strict parsers.",
    ),
    h3("Base64url swaps the risky characters"),
    p(
      "URL-safe Base64 replaces + with -, / with _, and conventionally strips the = padding entirely, since the decoder can reconstruct it from the string length. This variant — technically defined in RFC 4648 §5 — is what you want for anything embedded directly in a URL path, a filename, a cookie value, or an HTTP header.",
    ),
    ul([
      "Standard Base64: email attachments (MIME), data stored inside JSON/XML fields",
      "URL-safe Base64: JWTs, URL query parameters, cookie values, filenames",
      "Padding (=): required by some strict decoders, optional/omitted by convention in JWTs and URLs",
    ]),
    h2("Turning files and images into data URIs"),
    p(
      "A data URI embeds a file's Base64-encoded bytes directly inside a string with the format data:<mime-type>;base64,<data> — for example data:image/png;base64,iVBORw0KGgo.... Browsers, CSS, and HTML can render this exactly like a normal image URL, which makes data URIs useful for small icons, inline SVGs, or CSS backgrounds where you want to avoid an extra network request.",
    ),
    p(
      "The tradeoff is size: because Base64 inflates data by about a third, and because the string lives inside your HTML/CSS/JS bundle instead of a cacheable image file, data URIs are best reserved for small assets (a few KB) — not full-size photos or large PDFs, which should stay as regular files.",
    ),
    toolCta(),
    h2("How JWTs use Base64 under the hood"),
    p(
      "A JSON Web Token is three Base64url-encoded segments joined by dots: header.payload.signature. The header and payload are just JSON objects, Base64url-encoded — meaning anyone can decode and read them without any secret, which is why you should never put sensitive data directly in a JWT payload. The signature segment is the part that actually provides security: it's a cryptographic signature over the header and payload, computed with a secret (HMAC) or private key (RSA/ECDSA), and it's what a server checks to confirm the token hasn't been tampered with.",
    ),
    h3("Decoding a JWT vs verifying it"),
    p(
      "Decoding just means Base64url-decoding the header and payload segments to read the claims — useful for debugging why a token looks wrong, checking an exp (expiry) timestamp, or inspecting custom claims during development. Verifying means cryptographically checking the signature against the issuer's key, which proves the token is authentic and unmodified. A decoder tool can only do the former; it has no access to the secret needed for the latter.",
    ),
    ol([
      "Split the token on '.' into three parts: header, payload, signature",
      "Base64url-decode the header segment and parse it as JSON (typically { alg, typ })",
      "Base64url-decode the payload segment and parse it as JSON (your actual claims)",
      "Leave the signature as-is — it's not Base64-decodable JSON, it's raw signature bytes",
      "Check standard timestamp claims: exp (expiry), iat (issued at), nbf (not before)",
    ]),
    callout(
      "A JWT you haven't verified server-side should be treated as untrusted input. Anyone can hand-craft a JWT with any payload they want; only signature verification proves it actually came from your issuer.",
    ),
    h2("Common Base64 pitfalls"),
    p(
      "Naively calling btoa() on Unicode text in JavaScript throws or corrupts output, because btoa operates on Latin1 bytes, not UTF-8 — text containing emoji, accented characters, or non-Latin scripts needs to be UTF-8 encoded first. Pasting multi-line Base64 (common when copying from terminals or config files) can also break naive decoders that don't strip whitespace. And forgetting to convert between standard and URL-safe alphabets is a frequent source of 'invalid Base64' errors when moving a value from one context (say, a JSON field) into another (a URL).",
    ),
    h2("Free Base64, file, and JWT toolkit"),
    p(
      "Our tool handles all three cases in one place: live bidirectional text encoding with Unicode support and a URL-safe toggle, file-to-data-URI conversion with image preview (and the reverse — decode Base64 back to a downloadable file), and a JWT decoder that surfaces the header, payload, and expiry status at a glance. Everything runs locally in your browser — no file or token you enter is ever transmitted anywhere.",
    ),
  ],
  faqs: base64ToolFaqs,
};
