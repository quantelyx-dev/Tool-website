import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { sunMoonRisingFaqs } from "@/lib/tool-faqs";

export const sunMoonRisingPost: BlogPost = {
  slug: "sun-moon-rising-sign-calculator-guide",
  title: "Sun Moon Rising Sign Calculator: Big Three Guide",
  excerpt:
    "Find your Sun, Moon, and Rising signs with birth date, time, and place. Learn what the Big Three mean and why birth time matters for your Ascendant.",
  keywords: [
    "sun moon rising sign",
    "sun moon rising calculator",
    "birth chart calculator",
    "big three astrology",
    "rising sign calculator",
    "ascendant calculator",
  ],
  toolLink: "/tools/sun-moon-rising-calculator",
  toolName: "Sun Moon and Rising Sign calculator",
  publishedAt: "2026-06-11",
  updatedAt: "2026-06-25",
  readTimeMinutes: 14,
  relatedSlugs: [
    "daily-compound-interest-calculator-guide",
    "indiana-child-support-calculator-guide",
    "strong-password-generator-guide",
  ],
  sections: [
    p(
      "Most people know their Sun sign from their birthday — Leo born in August, Scorpio born in November. But astrology's most revealing personal profile comes from the Big Three: your Sun sign, Moon sign, and Rising sign (Ascendant). Together they describe your core identity, emotional inner world, and the first impression you project. A Sun Moon Rising sign calculator computes all three from your birth date, exact birth time, and birth location.",
    ),
    p(
      "This guide explains each placement, why birth time is critical for Rising sign accuracy, how to find your birth time if you don't know it, and how to interpret your Big Three results.",
    ),
    h2("What are the Big Three in astrology?"),
    p(
      "The Big Three form the foundation of natal chart interpretation. Your Sun sign reflects conscious identity and ego expression — the 'self' you grow into. Your Moon sign governs emotions, instincts, and what makes you feel secure — often more visible to close partners than acquaintances. Your Rising sign is the zodiac sign ascending on the eastern horizon at birth — shaping first impressions, physical presence, and how you navigate new situations.",
    ),
    ul([
      "Sun sign: core personality, vitality, life purpose — changes ~monthly",
      "Moon sign: emotions, habits, subconscious — changes every 2-3 days",
      "Rising sign (Ascendant): outward persona, appearance, approach — changes every ~2 hours",
    ]),
    toolCta(),
    h2("Sun sign vs Moon sign"),
    p(
      "Two people born a week apart share a Sun sign but may have different Moon signs because the Moon moves quickly through the zodiac. Sun-Moon combinations explain internal tension — a Capricorn Sun with Pisces Moon blends ambition with deep sensitivity. Reading Sun sign horoscopes alone misses the emotional nuance Moon placement provides.",
    ),
    h3("Why Moon sign matters for relationships"),
    p(
      "Compatibility discussions often start with Sun signs, but Moon sign harmony predicts emotional cohabitation better. Partners who understand each other's Moon needs — security rituals, conflict processing, comfort language — navigate daily life more smoothly than Sun-sign clichés suggest.",
    ),
    h2("Rising sign: why birth time is essential"),
    p(
      "Earth rotates once every 24 hours, moving a new zodiac sign across the eastern horizon roughly every two hours. Without accurate birth time, Rising sign calculation is unreliable — off by 30 minutes can shift the Ascendant to an adjacent sign entirely. Check your birth certificate, hospital records, or family memory for AM/PM precision.",
    ),
    callout(
      "If birth time is unknown, you still get accurate Sun sign and often accurate Moon sign. For Rising sign, astrologers sometimes use 'solar charts' (Rising = Sun sign) as a rough placeholder — clearly labeled as approximate.",
    ),
    h2("How a Sun Moon Rising calculator works"),
    p(
      "Calculators convert birth datetime and geographic coordinates to astronomical positions using ephemeris data — tables of celestial body locations. The Sun's ecliptic longitude determines Sun sign. Moon longitude determines Moon sign. Ascendant requires local sidereal time and latitude to compute which sign was rising at the horizon. Modern tools automate spherical astronomy that once required manual lookup tables.",
    ),
    ol([
      "Enter birth date (day, month, year)",
      "Enter birth time as precisely as possible (include AM/PM)",
      "Enter birth city or coordinates for timezone and horizon calculation",
      "Review Sun, Moon, and Rising sign results with element and modality context",
    ]),
    toolCta(),
    h2("Finding your birth time if you don't know it"),
    p(
      "Start with your birth certificate — many states record time of birth. Hospital birth records and baby books are secondary sources. Ask parents or relatives who were present. Some jurisdictions allow amended certificates if time was recorded elsewhere. Rectification — working backward from life events — is an advanced astrological technique when no records exist.",
    ),
    h2("Interpreting your results"),
    h3("Elements and modalities"),
    p(
      "Each sign belongs to an element (Fire, Earth, Air, Water) and modality (Cardinal, Fixed, Mutable). A chart heavy in Water Moons and Risings feels intuitive and emotional; Fire Suns drive action and visibility. Balance and tension between your Big Three elements explain why you might feel 'different' from generic Sun sign descriptions.",
    ),
    h3("Beyond the Big Three"),
    p(
      "Full natal charts include Mercury, Venus, Mars, and outer planets — each in signs and houses. The Big Three is the accessible entry point; depth comes from whole-chart reading. Still, Sun Moon Rising alone delivers more personalization than Sun sign memes ever will.",
    ),
    h2("Accuracy considerations"),
    p(
      "Sun and Moon calculations tolerate small time errors for most birth dates. Rising sign demands precision within ~15 minutes for confidence. Historical timezone and daylight saving rules affect older births — quality calculators apply timezone databases automatically when you select birth location.",
    ),
    h2("Free Sun Moon Rising calculator"),
    p(
      "Enter your birth details and discover your Big Three instantly. No sign-up, no paywall — just accurate ephemeris-based results to start your astrology journey or deepen self-understanding beyond your Sun sign alone.",
    ),
  ],
  faqs: sunMoonRisingFaqs,
};
