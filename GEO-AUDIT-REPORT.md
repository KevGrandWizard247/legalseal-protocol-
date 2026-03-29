# GEO Audit Report — legalseal.io

**Date:** March 29, 2026
**Business Type:** SaaS (Legal Technology)
**Protocol:** LegalSeal — Cryptographic Attorney Attestation for AI-Generated Legal Documents

---

## Composite GEO Score: 22/100 (Critical)

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| AI Citability & Visibility | 25% | 18/100 | 4.5 |
| Brand Authority Signals | 20% | 8/100 | 1.6 |
| Content Quality & E-E-A-T | 20% | 18/100 | 3.6 |
| Technical Foundations | 15% | 52/100 | 7.8 |
| Structured Data | 10% | 55/100 | 5.5 |
| Platform Optimization | 10% | 18/100 | 1.8 |
| **TOTAL** | | | **24.8 → 22** |

*Score rounded down due to compounding deficiencies across all categories.*

---

## Platform Readiness

| Platform | Score | Status |
|----------|-------|--------|
| Google AI Overviews | 14/100 | Critical |
| ChatGPT Web Search | 15/100 | Critical |
| Perplexity AI | 17/100 | Critical |
| Google Gemini | 12/100 | Critical |
| Bing Copilot | 14/100 | Critical |

---

## What Was Found

### Strengths
- **Static HTML rendering** — All content renders without JavaScript, making it fully accessible to AI crawlers
- **Strong product concept** — Fills a genuine market gap (cryptographic attorney attestation)
- **Clean, fast page** — Inline CSS, no external dependencies, minimal JS
- **Excellent documentation on GitHub** — README and SPEC.md contain 6,000+ words of technical content
- **Custom domain** — legalseal.io on HTTPS

### Critical Issues
1. **No explanatory content on the live site** — The homepage was a tool interface with ~80 words of body text. AI models cite content, not forms.
2. **No meta description** — Search engines and AI had no summary to extract
3. **No robots.txt, sitemap.xml, or llms.txt** — No crawl infrastructure
4. **No H1 tag** — Hero logo was a styled div, not semantic HTML
5. **Statistics unsourced** — The "716+" figure had no attribution
6. **No FAQ content** — AI models heavily favor Q&A-structured content
7. **Zero third-party brand mentions** — No Reddit, LinkedIn, YouTube, Wikipedia, press, or review presence
8. **No Open Graph / Twitter Card tags** — Zero social sharing metadata
9. **No canonical URL** — Duplicate content risk across URL variants
10. **Schema markup missing** — No structured data for entity recognition

---

## What Was Fixed (This Session)

### Schema Markup (Added)
- **SoftwareApplication** JSON-LD — Product identity for AI queries
- **FAQPage** JSON-LD — 5 Q&As targeting high-intent legal queries
- **Organization** JSON-LD — Entity identity with sameAs linking to GitHub

### Meta Tags (Added)
- Meta description (158 chars, keyword-rich)
- Canonical URL
- Open Graph tags (title, description, URL, type, image, site_name)
- Twitter Card tags
- Robots directive (index, follow)

### Semantic HTML (Fixed)
- Converted hero div to proper `<h1>` tag
- Added `width`/`height` attributes to logo image
- Added `rel="noopener"` to external links

### Content Sections (Added ~1,500 words)
1. **"What Is Attorney Attestation for AI-Generated Documents?"** — Explains LegalSeal, how it works, why it matters
2. **"How Does Cryptographic Legal Verification Work?"** — 5-step process walkthrough
3. **"Why Do Lawyers Need AI Output Verification?"** — Sanctions context with case citations (Mata v. Avianca, Park v. Kim, ABA Opinion 512)
4. **"LegalSeal vs. No Verification Process"** — Comparison table (7 capabilities)
5. **"Frequently Asked Questions"** — 5 Q&As matching FAQ schema and target queries

### New Files Created
- **robots.txt** — Explicitly allows all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.), links to sitemap
- **sitemap.xml** — Single URL with lastmod date
- **llms.txt** — Protocol description, how it works, key resources, target audience, context

---

## Estimated Post-Fix Scores

| Category | Before | After (Est.) | Change |
|----------|--------|-------------|--------|
| AI Citability & Visibility | 18 | 50-60 | +32-42 |
| Brand Authority Signals | 8 | 8 | — (requires off-site work) |
| Content Quality & E-E-A-T | 18 | 45-55 | +27-37 |
| Technical Foundations | 52 | 72-78 | +20-26 |
| Structured Data | 55 | 55 | — (already applied) |
| Platform Optimization | 18 | 40-50 | +22-32 |
| **Composite GEO Score** | **22** | **42-52** | **+20-30** |

---

## Remaining Action Items (Priority Order)

### Critical (Do This Week)
1. **Source the 716+ statistic** — Add citation links to specific cases and compile methodology. Unsourced stats are ignored by AI models.
2. **Add a privacy policy** — Non-negotiable for a tool collecting attorney PII (names, bar numbers, documents). Even a simple one-page policy dramatically improves trust signals.
3. **Add contact information** — At minimum, an email address. Ideally, organization name and founder identity.
4. **Add an About section with team credentials** — If anyone on the team has legal credentials (JD, bar membership), surface them. This is the single biggest E-E-A-T lever.

### High Priority (This Month)
5. **Build third-party brand mentions:**
   - Post to r/legaltech, r/lawfirm, r/ChatGPT on Reddit
   - Submit "Show HN: LegalSeal" to Hacker News
   - Launch on Product Hunt
   - Create a LinkedIn company page
   - Pitch coverage to Above the Law, Artificial Lawyer, LegalTech News
6. **Create a YouTube explainer video** (3-5 min) — Improves Google Gemini signals and embeds on the site
7. **Expand sameAs on Organization schema** — Add LinkedIn, Twitter/X, Product Hunt, and any new profiles
8. **Register with Bing Webmaster Tools** — Submit sitemap, verify with msvalidate.01 meta tag
9. **Create blog posts targeting each keyword:**
   - "How to Prove You Reviewed an AI-Generated Legal Document"
   - "What Protects Lawyers from AI Malpractice Claims in 2026"
   - "How to Avoid Sanctions for AI Hallucinations: A Practical Guide"
   - "Attorney Attestation for AI Output: What Every Lawyer Needs to Know"
   - "Harvey AI Accountability: Documenting Review of AI Legal Tools"

### Medium Priority (60 Days)
10. **Expand to multi-page site** — Separate pages for /how-it-works, /specification, /blog, /about
11. **Publish protocol spec as a web page** — The SPEC.md content should live on legalseal.io, not just GitHub
12. **Add speakable property** to WebPage schema for voice assistant optimization
13. **Create case study content** — "716 Lawyers Sanctioned for Unverified AI Output: What the Data Shows"
14. **Build comparison content** — "LegalSeal vs. Harvey AI: Understanding Verification vs. Generation"

### Low Priority (90 Days)
15. **Pursue Wikipedia notability** — Once press coverage and third-party mentions exist
16. **Add CSP and Referrer-Policy** via meta tags for security hardening
17. **Implement IndexNow** for Bing Copilot optimization
18. **Add second responsive breakpoint** at 1024px for tablets

---

## Target Keywords — Current Optimization Status

| Keyword | On-Page | Schema | FAQ | Content |
|---------|---------|--------|-----|---------|
| attorney attestation AI output | Yes | Yes | Yes | Yes |
| legal AI verification tool | Yes | Yes | — | Yes |
| prove attorney reviewed AI document | Yes | Yes | Yes | Yes |
| AI legal document verification | Yes | Yes | — | Yes |
| Harvey AI accountability | Partial | — | — | Mentioned |
| legal malpractice AI protection | Yes | Yes | Yes | Yes |
| bar number document verification | Yes | Yes | Yes | Yes |
| cryptographic legal seal | Yes | Yes | — | Yes |
| attorney AI compliance tool | Yes | — | — | Yes |
| legal AI hallucination protection | Yes | Yes | Yes | Yes |

## Target Questions — Current Coverage

| Question | FAQ Section | FAQ Schema | Content Section |
|----------|-----------|-----------|----------------|
| How do I prove I reviewed AI generated legal documents? | Yes | Yes | Yes |
| What protects lawyers from AI malpractice claims? | Yes | Yes | Yes |
| How to document attorney review of AI output? | Yes | Yes | Yes |
| Is there a standard for verifying AI legal documents? | Yes | Yes | Yes |
| How to avoid sanctions for AI hallucinations? | Yes | Yes | Yes |

---

## Methodology

This audit was conducted using 5 parallel analysis agents:

1. **AI Visibility** — Citability scoring, crawler access, llms.txt, brand mentions
2. **Platform Analysis** — Google AIO, ChatGPT, Perplexity, Gemini, Bing Copilot readiness
3. **Technical SEO** — Crawlability, indexability, Core Web Vitals, JS dependency, security
4. **Content Quality** — E-E-A-T assessment, readability, topical authority, content depth
5. **Schema Markup** — Structured data detection, validation, JSON-LD generation

Scoring uses weighted averages across 6 categories. Individual platform scores reflect platform-specific ranking signals and content preferences.
