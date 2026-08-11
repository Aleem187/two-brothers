# Two Brothers Chicken — Woodbridge, VA

A premium, modern, high-performance website for **Two Brothers Chicken**, the halal
fried-chicken restaurant at **14845 Build America Dr, Woodbridge, VA 22191**.

Built as a fast, dependency-free static site (plain HTML, CSS & vanilla JS) — no build
step, no framework, deployable anywhere (Netlify, Vercel, Cloudflare Pages, GitHub Pages,
Apache/Nginx, or any static host).

---

## ✨ Features

- **Sections:** Hero · Menu (interactive, filterable) · About · Signature Showcase ·
  Catering · Reviews · Woodbridge Location (live map + open/closed status) · Order Online ·
  Contact.
- **Bold modern fast-casual design**: warm cream/white body with charcoal text, punchy
  brand-red accents and subtle yellow highlights, plus dramatic charcoal hero/footer bands.
  A food-forward, full-bleed hero with one bold headline and a single "Order Online" CTA.
  Typeset in **Archivo** (bold display) + **Plus Jakarta Sans** (body).
- **Smooth animations:** scroll-reveal (IntersectionObserver), sticky glass header,
  hero parallax, marquee, hover motion — all disabled automatically for users who prefer
  reduced motion.
- **Interactive menu** with category tabs and 26 items across 8 categories.
- **Live "Open Now / Closed"** indicator driven by the real opening hours.
- **Fully responsive** with a sticky mobile order bar and slide-in mobile menu.
- **Fast:** zero JS dependencies, lazy-loaded images, system-font fallbacks, one small CSS
  and JS file.
- **SEO & local SEO:** semantic HTML, meta/OG/Twitter tags, canonical, `sitemap.xml`,
  `robots.txt`, and rich **Restaurant JSON-LD** structured data (address, hours, geo,
  cuisine, rating) for Google local results.

---

## 📁 Structure

```
.
├── index.html            # the whole site (single page)
├── site.webmanifest      # PWA manifest
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css     # design system + layout
    ├── js/main.js         # interactions & animations
    ├── img/
    │   ├── logo.svg        # brand logo (SVG recreation of the real logo — swap in the exact file anytime)
    │   ├── favicon.svg
    │   └── food/README.md  # where to drop food photos
    └── video/              # hero.mp4 goes here
```

## 🖼️ Adding the real brand assets

The site is designed to look polished **before** any photos are added (it renders elegant
gradient + emoji placeholders), then upgrades automatically once real files are dropped in:

1. **Logo** — replace `assets/img/logo.svg` with the official Two Brothers Chicken logo.
   Keep the filename (or update the two `<img src="assets/img/logo.svg">` references in
   `index.html`). A horizontal logo ~220×66 works best; SVG or transparent PNG.
2. **Photos & video** — see `assets/img/food/README.md` for the full list of filenames and
   recommended sizes. You can reuse images and the video from the current website.
3. **Social image** — add `assets/img/og-image.jpg` (1200×630) for link previews.

## 📮 Contact form

The contact form posts to [FormSubmit](https://formsubmit.co) (no backend needed). It's
pre-wired to `hafiz.yahya.pk@gmail.com` — change the `action` URL in `index.html` to the
restaurant's preferred inbox, then submit the form once to confirm the address.
Swap for Formspree / Netlify Forms / a custom endpoint if preferred.

## 🔗 Live links used

- Order online (Toast): `order.toasttab.com/online/two-brothers-chicken-woodbridge`
- DoorDash · Grubhub · Uber Eats · Catering (ezCater) · Facebook

## 🚀 Deploy

It's a static site — just serve the folder.

```bash
# local preview
python3 -m http.server 8000     # then open http://localhost:8000
```

Then upload to any static host, or point your domain at it.

---

_Design & brand colors are built around the existing Two Brothers Chicken logo and identity._
