import { fakeAddressPost } from "@/lib/blogs/posts/fake-address-generator-guide";
import { fakeEmailGeneratorPost } from "@/lib/blogs/posts/fake-email-generator-for-testing-guide";
import { fakePhoneNumberPost } from "@/lib/blogs/posts/fake-phone-number-generator-guide";
import { fakeSsnPost } from "@/lib/blogs/posts/fake-ssn-generator-for-testing-guide";
import { fakeUsernamesPost } from "@/lib/blogs/posts/fake-usernames-for-testing-guide";
import { dailyCompoundInterestPost } from "@/lib/blogs/posts/daily-compound-interest-calculator-guide";
import { indianaChildSupportPost } from "@/lib/blogs/posts/indiana-child-support-calculator-guide";
import { randomNameGeneratorPost } from "@/lib/blogs/posts/random-name-generator-use-cases-guide";
import { strongPasswordPost } from "@/lib/blogs/posts/strong-password-generator-guide";
import { sunMoonRisingPost } from "@/lib/blogs/posts/sun-moon-rising-sign-calculator-guide";
import { uuidV7Post } from "@/lib/blogs/posts/uuid-v7-generator-guide";
import type { BlogPost } from "@/lib/blogs/types";

const ALL_BLOG_POSTS: BlogPost[] = [
  sunMoonRisingPost,
  dailyCompoundInterestPost,
  indianaChildSupportPost,
  fakeUsernamesPost,
  fakeEmailGeneratorPost,
  randomNameGeneratorPost,
  fakePhoneNumberPost,
  fakeSsnPost,
  fakeAddressPost,
  uuidV7Post,
  strongPasswordPost,
];

export const BLOG_POSTS: BlogPost[] = [...ALL_BLOG_POSTS].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getBlogPostByToolLink(toolLink: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.toolLink === toolLink);
}

export function getRelatedBlogPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((related): related is BlogPost => related !== undefined);
}
