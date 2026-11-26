import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { ipAddressFaqs } from "@/lib/tool-faqs";

export const ipAddressGeneratorPost: BlogPost = {
  slug: "random-ip-address-generator-guide",
  title: "Test IP Addresses: IPv4 and IPv6 Guide",
  excerpt:
    "Learn how IPv4 and IPv6 differ, which address ranges are reserved for documentation, and how to generate safe IP test data for logs, fixtures, and demos.",
  keywords: [
    "random IP address generator",
    "test IP addresses",
    "documentation IP ranges",
    "IPv4 vs IPv6",
    "IP address test data",
    "RFC 5737",
  ],
  toolLink: "/tools/generate-random-ip-addresses",
  toolName: "Random IP address generator",
  publishedAt: "2026-07-24",
  updatedAt: "2026-11-26",
  readTimeMinutes: 4,
  relatedSlugs: [
    "uuid-v7-generator-guide",
    "fake-address-generator-guide",
    "cron-expression-generator-guide",
  ],
  sections: [
    p(
      "Log viewers, dashboards, firewall rule screens, and documentation all need sample IP addresses. Picking numbers at random is risky, because many random addresses belong to real networks. Internet standards provide blocks that exist specifically for examples, and those are the safest choice for test data.",
    ),
    h2("IPv4 and IPv6 in brief"),
    p(
      "An IPv4 address is 32 bits, written as four decimal numbers from 0 to 255, such as 203.0.113.42. That gives about 4.3 billion possible addresses. An IPv6 address is 128 bits, written as eight groups of hexadecimal digits, such as 2001:0db8:85a3:0000:0000:8a2e:0370:7334.",
    ),
    p(
      "IPv6 text can be shortened. Leading zeros in a group may be dropped, and one run of consecutive all-zero groups may be replaced with ::. The example above becomes 2001:db8:85a3::8a2e:370:7334. Compare parsed addresses rather than raw strings.",
    ),
    toolCta(),
    h2("Documentation ranges"),
    ul([
      "192.0.2.0/24 (TEST-NET-1), reserved by RFC 5737",
      "198.51.100.0/24 (TEST-NET-2), reserved by RFC 5737",
      "203.0.113.0/24 (TEST-NET-3), reserved by RFC 5737",
      "2001:db8::/32 for IPv6, reserved by RFC 3849",
    ]),
    p(
      "These blocks are not routed on the public internet, so an example that uses them does not point at anyone’s server. Our generator produces addresses only from these ranges.",
    ),
    callout(
      "Documentation addresses are different from private addresses such as 10.0.0.0/8 or 192.168.0.0/16. Private ranges are used on real internal networks, so an example using them could collide with your own infrastructure.",
    ),
    h2("Testing with documentation addresses"),
    h3("Parsing and validation"),
    p(
      "Use generated values as valid inputs, then add invalid cases by hand: an octet of 256, too few groups, two :: markers, or stray spaces. Confirm that full and shortened IPv6 forms are treated as equal.",
    ),
    h3("Logs and dashboards"),
    p(
      "Pair addresses with timestamps, paths, and status codes to build realistic log rows. Include long IPv6 values so you can check column widths, wrapping, and copy buttons.",
    ),
    h3("Features that treat reserved ranges differently"),
    p(
      "Geolocation, reputation scoring, and some allow-list tools will report nothing useful for documentation ranges, or reject them. That is correct behavior. Test those features by mocking the lookup response in your code instead of borrowing a stranger’s public address.",
    ),
    h2("Generating and exporting a batch"),
    ol([
      "Choose IPv4 or IPv6.",
      "Pick single mode, or a bulk batch of 10 to 200.",
      "Generate, then copy one address or download the CSV file.",
      "Import the address and version columns into your fixture or spreadsheet.",
    ]),
    p(
      "Addresses are unique within one batch. The three IPv4 blocks hold only 762 usable host addresses, so separate batches will overlap. Use IPv6 when you need a much larger set of distinct values.",
    ),
    h2("Responsible use"),
    p(
      "Sample data is not evidence of real network activity and should never be presented as such. Never scan, probe, or attack any system you do not have permission to test.",
    ),
    toolCta(),
  ],
  faqs: ipAddressFaqs,
};
