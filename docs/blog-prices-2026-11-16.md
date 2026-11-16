# Blog prices vs. practice fees (2026-11-16)

Follow-up to the site audit (`docs/site-audit-2026-11-09.md`, open item 2). Daniel asked
which blog posts quote prices that don't match the practice's current fees, and to fix
them on our end rather than ask the client.

## The practice's published fees (source of truth)

These are the fees stated on the procedure pages. The blog was brought in line with them.

| Treatment | Practice fee | Source page |
| --- | --- | --- |
| Composite filling | $361–$565 | /procedures/restoration/composite-fillings |
| Porcelain crown, back tooth (CEREC or lab) | $1,949–$2,351 | /procedures/restoration/crowns-caps |
| Porcelain crown, front tooth | from $2,379 | /procedures/restoration/crowns-caps |
| Fixed bridge, three-unit | $5,847–$6,651 | /procedures/restoration/fixed-bridges |
| Dental implant, single tooth (post + abutment + crown) | from $8,474 | /procedures/restoration/dental-implants |
| Dentures & partials | $2,976–$3,173 | /procedures/restoration |
| Porcelain veneer | from $2,379 per tooth | /procedures/cosmetic-dentistry/porcelain-veneers |
| Invisalign | $4,500–$7,500 (most cases) | /procedures/cosmetic-dentistry/invisalign |
| Take-home whitening | $400–$600 | /procedures/cosmetic-dentistry/tooth-whitening |

## Posts that didn't match, and what they say now

| Post (/blog/…) | Was | Now |
| --- | --- | --- |
| cerec-same-day-crowns-oakland | CEREC crown $1,200–$1,800; lab crown $1,000–$1,700 | $1,949–$2,351 back tooth, front from $2,379 (CEREC priced the same as lab) |
| dental-bridge-vs-implant | implant $4,500–$7,500; bridge $2,000–$4,500 (table + text) | implant from $8,474; three-unit bridge $5,847–$6,651 |
| dental-implant-cost-east-bay | single implant $4,500–$7,500; component table summing to $3,700–$5,700; multiple implants $3,500–$5,500/tooth; FAQ $4,500–$7,500 | single implant from $8,474 (quick answer, table, FAQ); component table keeps descriptions, no per-part prices; multiples "priced individually" |
| dental-implants-piedmont-ca | implant $3,000–$5,500 | from $8,474 |
| invisalign-cost-east-bay | comprehensive $5,000–$8,000; Lite $1,800–$3,000 (quick answer, table, FAQ) | $4,500–$7,500 for most cases; Lite "quoted after your scan" |
| invisalign-vs-braces-adults-east-bay | Invisalign $4,000–$8,500, $4,500–$8,500, Lite $3,000–$5,000 | $4,500–$7,500 for most cases; Lite quoted after scan |
| porcelain-veneers-vs-dental-bonding | veneers $1,000–$2,500+ (table + text) | from $2,379 per tooth |
| veneers-cost-oakland-2026 | porcelain $1,200–$2,500; no-prep $900–$2,000; full smile $10,000–$25,000+ | porcelain from $2,379; no-prep quoted at consultation; 8–10 veneers from about $19,000 (8 × $2,379) |
| veneers-vs-crowns | Delta Dental veneer $1,180–$2,185, crown $1,100–$2,000, market $800–$2,500 | our fees: veneer from $2,379; crown $1,949–$2,351 back, front from $2,379 |
| what-is-facelift-dentistry | crown $800–$2,500; implant $4,500–$7,500 | crown $1,949–$2,351 back / front from $2,379; implant from $8,474 |

## Kept on purpose (no published practice fee to match)

Labelled in the posts as market ranges, not our fees:

- **Full-arch / All-on-4 and full-mouth implant ranges**, plus the implant add-ons table (extraction, bone grafting, sinus lift, imaging, temporary tooth) in dental-implant-cost-east-bay. The practice prices these individually.
- **Full-arch range** in what-is-facelift-dentistry.
- **Braces** (the practice offers Invisalign, not braces) in invisalign-vs-braces-adults-east-bay.
- **Composite bonding / composite veneers** in the two veneer posts.
- **Insurance figures** (PPO annual maximums, the orthodontic lifetime maximum) and the Waterpik device price.

## Not fixable in this repo: BabyLoveGrowth posts

These two live posts come from the BabyLoveGrowth feed (`lib/blog-remote.ts`), not from `content/blog`. Both state wrong numbers as **"our published fee"**, so they need editing in the BabyLoveGrowth dashboard:

| Post | Says (as "our published fee") | Should be |
| --- | --- | --- |
| /blog/maryland-bridge | bridge $3,000–$4,500; implant $4,000–$6,000 | bridge $5,847–$6,651; implant from $8,474 |
| /blog/implant-supported-dentures | implant $4,000–$6,000; crown $1,200–$1,800; bridge $3,000–$4,500 | implant from $8,474; crown $1,949–$2,351 (front from $2,379); bridge $5,847–$6,651 |

The Oakland and Berkeley location pages also quote Delta Dental, CareCredit and Invisalign.com ranges. Those are not blog posts and are explicitly sourced and labelled as market figures, so they were left as they are.
