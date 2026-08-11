# Food & photo assets

Drop real photos here and the site picks them up automatically — no code changes needed.
Each `<img>` on the site has an `onerror` fallback, so **until a file exists the site
shows a clean gradient + emoji placeholder** (never a broken image).

## Recommended specs
- Format: `.jpg` (or `.webp` — then update the `src` extensions)
- Menu cards: ~1000 × 690 px (16:11), < 200 KB each after compression
- Showcase / hero: ~1600 px wide, < 300 KB

## Expected filenames (assets/img/food/)

**Burgers & Sandwiches**
big-moe.jpg · fire-burger.jpg · crispy-chicken-sandwich.jpg
double-big-moe.jpg · double-fire-burger.jpg · double-crispy-chicken-sandwich.jpg

**Subs**
steak-cheese.jpg · grilled-chicken-sub.jpg · steak-deluxe.jpg

**Hand Breaded Chicken Nuggets**
6pc-nuggets.jpg · 10pc-nuggets.jpg

**Fried Chicken**
2pc-fried-chicken.jpg · 3pc-fried-chicken.jpg · 5pc-fried-chicken.jpg
8pc-fried-chicken.jpg · 10pc-fried-chicken.jpg · 15pc-fried-chicken.jpg · 20pc-fried-chicken.jpg

**Sides**
small-fries.jpg · small-coleslaw.jpg · small-onion-rings.jpg
large-fries.jpg · large-coleslaw.jpg · large-onion-rings.jpg · dinner-rolls.jpg

**Dessert**
toffee-crunch.jpg · strawberry-cheesecake.jpg · oreo-cheesecake.jpg
snickers-cheesecake.jpg · peach-cobbler-cheesecake.jpg · reeses-cheesecake.jpg

> Tip: the menu screenshots already show photos for most burgers, subs, nuggets,
> the 2pc fried chicken, and all sides — save each image with the matching
> filename above and it appears on the site automatically.

## Other image slots
- `assets/img/hero-visual.jpg` — the hero showcase photo in the right-hand panel
  (portrait, ~4:5, ~960×1200). Until added, an on-brand gradient + emoji placeholder
  shows, framed by the floating rating / "made fresh" cards.
- `assets/img/og-image.jpg` — social share image (1200×630)
- `assets/img/about/kitchen.jpg` — About section photo (portrait, ~1000×1250)
- `assets/img/catering/spread.jpg` — Catering photo (landscape)

## Video (the "Taste the Experience" section)
- **`assets/video/two-brothers.mp4`** — the main brand video (the one from the current
  website). H.264 MP4, ~1080p, ideally < 15 MB. This is the video shown in the dedicated
  video section; it uses `preload="none"` + a poster, so it only downloads when a visitor
  presses play — zero cost to initial page load.
- `assets/img/video-poster.jpg` — poster frame shown before play (1600×900). Until it's
  added, an on-brand gradient placeholder is shown, so the section still looks intentional.

You can reuse the images and video from the current twobrotherschicken.com site.
