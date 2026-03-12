# SEO Action Plan — izey.dev

**Current Score: 38/100 → Target: 70+ after Critical + High fixes**

---

## Phase 1: Critical (This Week)

- [ ] Create `robots.txt` with sitemap pointer
- [ ] Create `sitemap.xml` with hreflang for NL/FR pages
- [ ] Add `<link rel="canonical">` to index.html and fr.html
- [ ] Add hreflang tags (`nl`, `fr`, `x-default`) to both pages
- [ ] Delete or redirect `izey-webdesign.html` (duplicate of index.html)
- [ ] Add privacy policy page (GDPR — required for Analytics + contact form)
- [ ] Add cookie consent mechanism

## Phase 2: High Priority (Next Week)

- [ ] Add JSON-LD structured data (ProfessionalService + WebSite + WebPage + BreadcrumbList)
- [ ] Add `og:image` to both pages (for WhatsApp/social previews)
- [ ] Add `<link rel="preconnect">` for Google Fonts (2 lines, -200ms LCP)
- [ ] Remove unused Playfair Display weight 600 from font URL
- [ ] Add CSS font fallback metric overrides (CLS fix)
- [ ] Remove `reveal` class from hero-visual element
- [ ] Display BTW/VAT number on site
- [ ] Fix accent button color #D97706 → #B45309 (WCAG AA)

## Phase 3: Medium Priority (This Month)

- [ ] Add 2-3 portfolio items with screenshots and outcomes
- [ ] Add real headshot photo replacing placeholder
- [ ] Expand FAQ answers from 1-2 to 3-5 sentences each
- [ ] Add "website laten maken" keyword to H1 or H2
- [ ] Self-host Google Fonts as WOFF2 (-400-600ms mobile LCP)
- [ ] Fix hamburger touch target to 48x48px minimum
- [ ] Add `for`/`id` pairs to all form labels
- [ ] Add `aria-expanded` to hamburger and FAQ buttons
- [ ] Translate anchor IDs for French page (#werkwijze → #methode, etc.)
- [ ] Add city-level targeting content (Gent, Antwerpen, Brussel)
- [ ] Add `{ passive: true }` to scroll event listener
- [ ] Collect and add 2-3 client testimonials

## Phase 4: Backlog

- [ ] Add `<meta name="theme-color" content="#1B2A4A">`
- [ ] Change `lang="nl"` to `lang="nl-BE"`
- [ ] Fix float badge overflow on mobile (add `overflow: hidden` to hero-visual)
- [ ] Start a blog to demonstrate SEO expertise
- [ ] Consider Cloudflare Pages for Brotli + custom security headers
- [ ] Unobserve revealed elements in IntersectionObserver
- [ ] Pull "Gratis gesprek" CTA outside hamburger menu on mobile

---

## Estimated Impact

| After Phase | Score | Timeline |
|-------------|-------|----------|
| Phase 1 complete | ~50/100 | 1 week |
| Phase 2 complete | ~65-70/100 | 2 weeks |
| Phase 3 complete | ~80/100 | 1 month |
| Phase 4 complete | ~85-90/100 | Ongoing |
