import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const origin = 'https://www.sescustomhomes.com';
const phoneDisplay = '(804) 408-4663';
const phoneHref = '+18044084663';

const areas = {
  richmond: {
    name: 'Richmond',
    slug: 'richmond-va',
    type: 'city',
    label: 'Richmond, VA',
    neighborhoods: ['The Fan', 'Northside', 'Westover Hills', 'Church Hill', 'West End'],
    housing: 'Richmond homes range from century-old brick rowhouses and bungalows to renovated ranches and newer infill construction.',
    climate: 'Mature tree cover, summer humidity, sudden thunderstorms, and freeze-thaw cycles all influence exterior projects in the city.',
    planning: 'Tight lots, established landscaping, historic character, and access from alleys or narrow streets can shape the installation plan.',
    intro: 'SES Custom Homes helps Richmond homeowners improve older and newer properties with careful exterior construction, practical product guidance, and a clean jobsite.',
  },
  chesterfield: {
    name: 'Chesterfield',
    slug: 'chesterfield-va',
    type: 'county',
    label: 'Chesterfield, VA',
    neighborhoods: ['Bon Air', 'Chester', 'Brandermill', 'Woodlake', 'Moseley'],
    housing: 'Chesterfield includes brick ranches, wooded subdivisions, established planned communities, and fast-growing neighborhoods with newer homes.',
    climate: 'Hot, humid summers and strong rain events make water management, ventilation, and durable exterior materials especially important.',
    planning: 'Lot conditions, neighborhood design standards, and the way an addition meets the existing home all deserve attention before work starts.',
    intro: 'SES Custom Homes serves homeowners throughout Chesterfield County with exterior upgrades designed for long-term performance and a natural fit with the home.',
  },
  midlothian: {
    name: 'Midlothian',
    slug: 'midlothian-va',
    type: 'community',
    label: 'Midlothian, VA',
    neighborhoods: ['Salisbury', 'Walton Park', 'Queensmill', 'Hallsley', 'Woodlake'],
    housing: 'Midlothian has a broad mix of wooded-lot colonials, transitional homes, golf-course communities, and newer construction.',
    climate: 'Shade, pollen, humidity, and heavy seasonal rain can affect how exterior materials age and how outdoor rooms are used.',
    planning: 'Many Midlothian projects benefit from matching established rooflines, masonry colors, trim profiles, and community design expectations.',
    intro: 'SES Custom Homes plans Midlothian remodeling projects around the home’s architecture, the way the family uses the space, and the demands of Central Virginia weather.',
  },
  henrico: {
    name: 'Henrico',
    slug: 'henrico-va',
    type: 'county',
    label: 'Henrico, VA',
    neighborhoods: ['Lakeside', 'Tuckahoe', 'Short Pump', 'Varina', 'Three Chopt'],
    housing: 'Henrico’s housing ranges from mid-century brick ranches and compact cottages to large West End homes and newer suburban construction.',
    climate: 'Summer heat, humidity, wind-driven rain, and shaded lots make good flashing, drainage, and energy performance important.',
    planning: 'Because Henrico properties vary widely, the right scope starts with the home’s age, existing assemblies, lot access, and the owner’s priorities.',
    intro: 'SES Custom Homes provides Henrico homeowners with straightforward recommendations and exterior improvements tailored to the house—not a one-size-fits-all package.',
  },
  'glen-allen': {
    name: 'Glen Allen',
    slug: 'glen-allen-va',
    type: 'community',
    label: 'Glen Allen, VA',
    neighborhoods: ['Mountain Road', 'Twin Hickory', 'Wyndham', 'Innsbrook', 'Greenwood'],
    housing: 'Glen Allen combines older homes near Mountain Road with planned communities, transitional two-story homes, and newer construction farther west.',
    climate: 'Tree debris, humid summers, afternoon storms, and seasonal temperature swings reward durable materials and careful water management.',
    planning: 'A successful Glen Allen project should complement the home’s existing exterior, respect neighborhood guidelines where applicable, and simplify maintenance.',
    intro: 'SES Custom Homes helps Glen Allen families make lasting exterior improvements with thoughtful design, quality materials, and clear project planning.',
  },
  mechanicsville: {
    name: 'Mechanicsville',
    slug: 'mechanicsville-va',
    type: 'community',
    label: 'Mechanicsville, VA',
    neighborhoods: ['Atlee', 'Rutland', 'Kings Charter', 'Battlefield Green', 'Cold Harbor'],
    housing: 'Mechanicsville includes rural properties, established brick homes, wooded subdivisions, and growing communities around Atlee and eastern Hanover.',
    climate: 'Open lots and mature trees can expose homes to wind, sun, debris, and heavy rain in different ways from one property to the next.',
    planning: 'Site access, grading, drainage, septic setbacks where present, and compatibility with the original home can all affect project decisions.',
    intro: 'Based in the Central Virginia market, SES Custom Homes helps Mechanicsville homeowners improve comfort, protection, and outdoor living with well-planned construction.',
  },
};

const services = {
  roofing: {
    name: 'Roofing',
    singular: 'roof',
    slug: 'roofing',
    page: 'roofing.html',
    estimate: 'roofing-estimate.html',
    hero: 'roofing-hero.jpg',
    icon: 'fa-house-chimney',
    titleTerm: 'Roofing Contractor',
    meta: 'Roof replacement, asphalt shingles, flashing, and ventilation.',
    short: 'Roof replacement, asphalt shingles, flashing, ventilation, and storm-ready protection.',
    intro: 'A dependable roof is a complete water-management system—not just a layer of shingles. We evaluate the visible roof, penetrations, flashing, ventilation, and the condition of accessible decking before recommending a scope.',
    choices: [
      ['Architectural shingles', 'Dimensional shingles provide durable protection and a finished look that works with many Central Virginia home styles.'],
      ['Flashing details', 'Valleys, walls, chimneys, skylights, and plumbing penetrations receive detail-driven water protection.'],
      ['Balanced ventilation', 'Intake and exhaust ventilation can help control attic heat and moisture when the home’s construction allows it.'],
    ],
    process: ['Inspect the roof system and discuss active concerns', 'Choose shingles, ventilation, and accessory details', 'Protect the property, install, clean up, and review the finished roof'],
    fit: {
      richmond: 'On Richmond’s older homes, roofing work often calls for extra attention around chimneys, low-slope transitions, additions, and multiple generations of flashing. We plan access and property protection around compact city lots and mature landscaping.',
      chesterfield: 'Chesterfield roofs often combine long ridgelines, attached garages, dormers, and porch tie-ins. We focus on valleys, wall flashing, ventilation, and runoff so the complete assembly performs through humid summers and heavy rain.',
      midlothian: 'Midlothian homes commonly have prominent, multi-plane roofs that play a major role in curb appeal. Shingle profile, color, ridge details, and clean transitions matter just as much as the hidden underlayment and flashing.',
      henrico: 'Henrico’s mix of ranches, colonials, and newer two-story homes means roof systems vary considerably. We assess each home’s slopes, penetrations, ventilation path, and signs of prior repairs before defining the work.',
      'glen-allen': 'In Glen Allen’s wooded and planned neighborhoods, roofs can collect shade, pollen, and tree debris while remaining highly visible from the street. We balance appearance, ventilation, water shedding, and maintainability.',
      mechanicsville: 'Mechanicsville roofs may face open exposure on larger lots or heavy leaf debris beneath mature trees. Our review considers wind-facing slopes, drainage, roof-to-wall connections, and ventilation before material selection.',
    },
    faqs: [
      ['How do I know whether I need roof repair or replacement?', 'Age is only one factor. Widespread granule loss, brittle or missing shingles, recurring leaks, soft decking, and failing flashing can point toward replacement. A focused issue may be repairable after an inspection.'],
      ['Do you help choose a shingle color?', 'Yes. We compare shingle blends with the home’s brick, siding, trim, gutters, and neighborhood context so the roof supports the overall exterior design.'],
      ['Can you evaluate ventilation during a roof project?', 'Yes. We review the existing intake and exhaust approach and explain practical improvements when the roof and attic configuration support them.'],
    ],
  },
  windows: {
    name: 'Windows',
    singular: 'window project',
    slug: 'windows',
    page: 'windows.html',
    estimate: 'windows-estimate.html',
    hero: 'windows-hero.jpg',
    icon: 'fa-border-all',
    titleTerm: 'Replacement Windows',
    meta: 'Energy-efficient replacement windows fitted to your home.',
    short: 'Energy-conscious replacement windows selected for the home’s style, openings, and comfort goals.',
    intro: 'Good replacement windows must fit the opening, manage water at the exterior, seal air at the perimeter, and suit the way each room is used. We help homeowners compare styles, glass packages, operation, and trim details.',
    choices: [
      ['Made-to-fit openings', 'Careful measurement and installation details help protect finishes and reduce unwanted air or water movement.'],
      ['Low-E glass options', 'Appropriate glass packages can reduce heat transfer and improve comfort near sunny or exposed windows.'],
      ['Practical window styles', 'Double-hung, casement, picture, slider, bay, and other styles are matched to ventilation, view, and maintenance needs.'],
    ],
    process: ['Review problem windows, room use, and comfort goals', 'Compare frame, glass, grid, color, and operating options', 'Install, insulate, finish, and demonstrate operation'],
    fit: {
      richmond: 'Richmond window projects often involve older openings, substantial trim, brick exteriors, or a strong architectural rhythm across the facade. We look for options that improve comfort without making the windows feel out of place.',
      chesterfield: 'Across Chesterfield, homeowners often want to replace builder-grade or aging windows while preserving familiar sightlines. We compare whole-home consistency with targeted replacement in the rooms that need it most.',
      midlothian: 'Midlothian homes frequently feature large window groupings, transoms, and street-facing elevations where proportions and grid patterns matter. We coordinate performance choices with the home’s exterior design.',
      henrico: 'Henrico’s brick ranches and two-story homes can have very different opening depths and trim conditions. Installation planning starts with the existing frame, exterior cladding, sill condition, and desired interior finish.',
      'glen-allen': 'Glen Allen homeowners often prioritize comfort, easy operation, and a cohesive exterior appearance. We can compare glazing and frame choices for sunny rooms, shaded elevations, bedrooms, and high-use living spaces.',
      mechanicsville: 'Mechanicsville properties may include original windows, additions from different eras, or larger openings overlooking wooded lots. We tailor window types and glass choices to each room rather than forcing one solution everywhere.',
    },
    faqs: [
      ['Should every window be replaced at the same time?', 'Not always. A whole-home project can create consistent performance and appearance, while phased replacement can prioritize damaged, drafty, or high-use openings.'],
      ['Which replacement window style is easiest to clean?', 'Tilt-in double-hung windows are a popular easy-clean option. Casement and slider windows may be better where reach, ventilation, or opening shape is the priority.'],
      ['Will new windows stop all condensation?', 'Efficient windows can improve interior glass temperatures, but indoor humidity, exterior temperature, shades, and airflow also affect condensation. We explain the factors that apply to your home.'],
    ],
  },
  decks: {
    name: 'Decks',
    singular: 'deck',
    slug: 'decks',
    page: 'decks.html',
    estimate: 'estimate.html?service=decks',
    hero: 'decks-hero.jpg',
    icon: 'fa-layer-group',
    titleTerm: 'Deck Builder',
    meta: 'Custom wood and composite decks planned for everyday use.',
    short: 'Custom wood and composite decks planned for daily use, drainage, safe circulation, and lasting curb appeal.',
    intro: 'A well-designed deck should feel like a natural extension of the house. We plan the footprint, traffic flow, stairs, rails, material layout, and connection to the yard before construction begins.',
    choices: [
      ['Wood or composite', 'We compare initial cost, appearance, heat, cleaning, and long-term maintenance so the material fits your priorities.'],
      ['Strong connections', 'Ledger attachment, flashing, footings, framing, and rail details are treated as core parts of the project.'],
      ['Useful layout', 'Grill zones, furniture clearances, doors, stairs, shade, and yard circulation shape a deck that works in real life.'],
    ],
    process: ['Measure the site and map doors, grade, utilities, and circulation', 'Develop the size, material, stair, and railing plan', 'Coordinate approvals, build the structure, and complete a final walkthrough'],
    fit: {
      richmond: 'Richmond decks often need to make the most of compact backyards, uneven grade, mature trees, and alley access. Smart stair placement and a right-sized footprint can create useful outdoor space without overwhelming the yard.',
      chesterfield: 'Chesterfield’s larger suburban lots create opportunities for dining zones, grilling, wide stairs, and connections to patios or pools. We keep the layout practical and the transition from house to yard comfortable.',
      midlothian: 'In Midlothian, decks frequently serve as the main outdoor gathering area and need to complement a prominent rear elevation. Material color, rail style, privacy, shade, and future patio connections are planned together.',
      henrico: 'Henrico deck projects range from efficient platforms behind brick ranches to multi-level outdoor rooms on sloped West End lots. We adapt the framing and circulation plan to the house and grade.',
      'glen-allen': 'Glen Allen homes often benefit from low-maintenance composite decking, coordinated railings, and layouts that support entertaining. We also consider tree shade, drainage below, and how stairs arrive in the yard.',
      mechanicsville: 'Mechanicsville properties can offer generous space for broad decks, but exposure, grade, and access still matter. We plan footings, stairs, railing, and material choices for the specific lot and intended use.',
    },
    faqs: [
      ['Is composite decking worth the added cost?', 'Composite can be a strong value for homeowners who prioritize lower routine maintenance and consistent appearance. Wood remains attractive when natural character and lower initial cost matter more.'],
      ['How large should a new deck be?', 'The right size comes from furniture, grill clearances, traffic paths, doors, stairs, and yard proportions—not a generic square-foot target.'],
      ['Can a deck be designed for a sloped yard?', 'Yes. Sloped sites may use taller framing, landings, carefully placed stairs, or a connection to a lower patio. The structural and drainage plan must respond to the grade.'],
    ],
  },
  porches: {
    name: 'Porches',
    singular: 'porch',
    slug: 'porches',
    page: 'porches.html',
    estimate: 'porch-estimate.html',
    hero: 'porches-hero.jpg',
    icon: 'fa-umbrella-beach',
    titleTerm: 'Porch Builder',
    meta: 'Screened and covered porches designed for comfort and shade.',
    short: 'Screened and covered porches designed around shade, airflow, roof integration, and comfortable outdoor living.',
    intro: 'A porch adds a roofed outdoor room, which makes the connection to the house especially important. We coordinate rooflines, drainage, ceiling height, screens or open sides, lighting, and circulation as one design.',
    choices: [
      ['Screened or open-air', 'Choose bug protection and a room-like feel, or an open covered porch that stays closely connected to the yard.'],
      ['Integrated roof design', 'Pitch, valleys, flashing, gutters, and ceiling form are planned to look intentional and move water correctly.'],
      ['Comfort details', 'Fan locations, outlets, lighting, privacy, views, flooring, and furniture zones make the porch useful day to day.'],
    ],
    process: ['Study the rear elevation, doors, windows, roof, and yard', 'Shape the porch footprint, roof, openings, and finish palette', 'Coordinate approvals and build from foundation through screens and trim'],
    fit: {
      richmond: 'On Richmond homes, a porch addition may need to work within a narrow lot, preserve daylight to interior rooms, and connect cleanly to older masonry or framing. Proportion and roof integration are central to the design.',
      chesterfield: 'Chesterfield homeowners often use porches to create a shaded gathering space between the kitchen and backyard. We plan roof runoff, screen exposure, furniture zones, and connections to decks, patios, or pools.',
      midlothian: 'Midlothian’s wooded neighborhoods make screened porches especially useful during warm, buggy months. We balance tree-filtered light, ceiling height, privacy, airflow, and architectural compatibility.',
      henrico: 'Henrico porches may attach to compact ranch homes, brick colonials, or larger West End houses. Each condition calls for a different approach to roof pitch, door location, foundation, and exterior finishes.',
      'glen-allen': 'In Glen Allen, covered and screened porches can extend family living into the backyard while offering shade and rain protection. We coordinate the porch with existing windows, rooflines, and neighborhood character.',
      mechanicsville: 'Mechanicsville’s larger and sometimes more open lots can support generous porches with broad views. Orientation, afternoon sun, prevailing rain, yard access, and a durable foundation all inform the plan.',
    },
    faqs: [
      ['What is the difference between a screened porch and a covered porch?', 'Both have a roof. A screened porch adds insect screening and often feels more like a defined room; a covered porch stays more open to breezes, views, and the yard.'],
      ['Can a porch roof connect to my existing roof?', 'Often, yes. The right approach depends on wall height, windows, existing roof pitch, drainage paths, and the desired ceiling. We study those conditions before settling on a roof form.'],
      ['Can a porch include fans and lighting?', 'Yes. Electrical planning can include ceiling fans, lighting, receptacles, and switching. These locations should be coordinated early with the framing and ceiling design.'],
    ],
  },
  sunrooms: {
    name: 'Sunrooms',
    singular: 'sunroom',
    slug: 'sunrooms',
    page: 'sunrooms.html',
    estimate: 'estimate.html?service=sunrooms',
    hero: 'sunroom.jpg',
    icon: 'fa-sun',
    titleTerm: 'Sunroom Contractor',
    meta: 'Light-filled sunrooms planned for comfort and year-round use.',
    short: 'Light-filled sunrooms planned for views, comfort, glazing performance, and a seamless connection to the home.',
    intro: 'A sunroom sits between an addition and an outdoor room, so expectations for seasonal use must be clear from the beginning. We plan the foundation, windows, insulation, roof, electrical work, and connection to the existing house as a complete system.',
    choices: [
      ['Seasonal-use planning', 'Three-season and conditioned-room goals lead to different choices for glass, insulation, air sealing, heating, and cooling.'],
      ['Glass and orientation', 'Window area, roof overhangs, shade, privacy, and solar exposure affect both the view and daily comfort.'],
      ['Architectural connection', 'Floor height, openings, rooflines, trim, siding, and interior transitions help the new room feel original to the home.'],
    ],
    process: ['Define how many months per year the room should be comfortable', 'Plan orientation, glazing, foundation, roof, and interior connection', 'Coordinate the construction phases and finish the room inside and out'],
    fit: {
      richmond: 'Richmond sunrooms often require a careful response to compact lots, nearby homes, historic exterior character, and existing rear additions. Window placement can capture garden views while preserving privacy and interior daylight.',
      chesterfield: 'Chesterfield homes often have the backyard depth for sunrooms that connect kitchens or living rooms to landscaped yards. We study shade, roof tie-ins, floor height, and the intended seasonal use before shaping the room.',
      midlothian: 'Midlothian’s wooded lots can provide beautiful sunroom views, but tree shade and orientation change throughout the year. We balance glass area, privacy, insulation, and roof design for a comfortable retreat.',
      henrico: 'Henrico sunrooms may expand a brick ranch, connect to a colonial, or replace an underused deck. We plan openings and exterior transitions carefully so the room belongs with the house.',
      'glen-allen': 'Glen Allen families often want a bright everyday room for reading, plants, entertaining, or enjoying a wooded backyard. We align the glazing, finishes, comfort strategy, and exterior architecture with those goals.',
      mechanicsville: 'Mechanicsville properties can offer wide backyard views and flexible footprints for sunrooms. Orientation, open exposure, foundation conditions, and the distance to utilities all help determine the best layout.',
    },
    faqs: [
      ['What is the difference between a three-season and four-season sunroom?', 'A three-season room is generally intended for milder weather. A four-season room requires a more complete thermal envelope and a properly planned heating and cooling strategy.'],
      ['Can a sunroom replace an existing deck?', 'Sometimes. The existing deck structure must be evaluated rather than assumed to support an enclosed room. A sunroom may require new footings, foundation work, framing, and a different connection to the house.'],
      ['How do you keep a sunroom from getting too hot?', 'Orientation, high-performance glass, window operation, roof design, shading, air sealing, insulation, fans, and HVAC planning can all contribute. The best combination depends on the property and intended use.'],
    ],
  },
};

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const json = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

function pageUrl(area, service) {
  return `${area.slug}-${service.slug}.html`;
}

function head({ title, description, canonical, image = 'hero.jpg', schema }) {
  return `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${origin}/${image}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${json(schema)}</script>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
html { scroll-behavior: smooth; }
body { font-family: 'Inter', system-ui, sans-serif; }
</style>
<script src="assets/js/tracking-preferences.js"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G4JJX4R6T3"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-G4JJX4R6T3');gtag('config','AW-18358647895');</script>`;
}

function chromeStart() {
  return `<body class="bg-gray-50 text-gray-900">
<div id="site-nav"></div>
<div aria-hidden="true" class="hidden bg-[#0a2540] bg-[#0b2d4e] bg-[#c9a96b] hover:bg-[#b38c4f] text-[#0a2540] max-w-[1600px] grid-cols-[auto_1fr_auto]"></div>`;
}

function chromeEnd() {
  return `<div id="site-footer"></div>
<script src="assets/js/site.js"></script>
</body>
</html>`;
}

function serviceSchema(area, service, url, description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${service.name} in ${area.label}`,
        serviceType: service.name,
        description,
        areaServed: {
          '@type': area.type === 'county' ? 'AdministrativeArea' : area.type === 'city' ? 'City' : 'Place',
          name: area.label,
        },
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          '@id': `${origin}/#business`,
          name: 'SES Custom Homes',
          url: origin,
          telephone: phoneHref,
          image: `${origin}/logo.png`,
        },
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${origin}/service-areas.html` },
          { '@type': 'ListItem', position: 3, name: area.label, item: `${origin}/service-areas.html#${area.slug}` },
          { '@type': 'ListItem', position: 4, name: service.name, item: url },
        ],
      },
    ],
  };
}

function localPage(areaKey, serviceKey) {
  const area = areas[areaKey];
  const service = services[serviceKey];
  const file = pageUrl(area, service);
  const url = `${origin}/${file}`;
  const title = `${service.titleTerm} in ${area.name}, VA | SES Custom Homes`;
  const description = `${service.titleTerm} serving ${area.name}, VA. ${service.meta} Request a free estimate from SES Custom Homes.`;
  const otherServices = Object.values(services).filter((item) => item.slug !== service.slug);
  const otherAreas = Object.values(areas).filter((item) => item.slug !== area.slug);
  const estimateUrl = service.estimate.includes('?')
    ? `${service.estimate}&area=${encodeURIComponent(area.name)}`
    : `${service.estimate}?area=${encodeURIComponent(area.name)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>${head({ title, description, canonical: url, image: service.hero, schema: serviceSchema(area, service, url, description) })}
</head>
${chromeStart()}
<main>
  <section class="relative overflow-hidden bg-[#0a2540] text-white">
    <img src="${service.hero}" alt="${escapeHtml(service.name)} project by SES Custom Homes" class="absolute inset-0 h-full w-full object-cover opacity-25">
    <div class="absolute inset-0 bg-gradient-to-r from-[#061b2f] via-[#0a2540]/90 to-[#0a2540]/55"></div>
    <div class="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      <nav aria-label="Breadcrumb" class="text-sm text-gray-300">
        <a href="index.html" class="hover:text-white">Home</a><span class="mx-2">/</span>
        <a href="service-areas.html" class="hover:text-white">Service Areas</a><span class="mx-2">/</span>
        <span>${area.label}</span>
      </nav>
      <div class="mt-8 max-w-4xl">
        <p class="uppercase tracking-[4px] text-amber-300 text-xs font-extrabold">Local ${service.name} • ${area.label}</p>
        <h1 class="mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-tight">${service.titleTerm} in ${area.name}, Virginia</h1>
        <p class="mt-6 max-w-3xl text-lg md:text-2xl text-gray-100 leading-relaxed">${service.short}</p>
        <div class="mt-9 flex flex-col sm:flex-row gap-4">
          <a href="${escapeHtml(estimateUrl)}" class="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#c9a96b] px-7 py-4 font-extrabold text-[#0a2540] shadow-lg transition hover:bg-[#dfc28d]">Request a Free Estimate <i class="fas fa-arrow-right text-sm"></i></a>
          <a href="tel:${phoneHref}" class="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-white px-7 py-4 font-bold transition hover:bg-white/10"><i class="fas fa-phone"></i>${phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-16 items-start">
      <div>
        <p class="text-sm font-extrabold uppercase tracking-[3px] text-[#9a7439]">Built for ${area.name} homes</p>
        <h2 class="mt-3 text-3xl md:text-4xl font-black text-[#0a2540]">Local planning makes a better ${service.singular}</h2>
        <p class="mt-6 text-lg leading-8 text-gray-700">${area.intro}</p>
        <p class="mt-5 text-lg leading-8 text-gray-700">${service.fit[areaKey]}</p>
        <p class="mt-5 text-lg leading-8 text-gray-700">${service.intro}</p>
      </div>
      <aside class="rounded-3xl bg-[#f7f2e8] p-8 border border-[#eadcc1]">
        <h2 class="text-2xl font-black text-[#0a2540]">What shapes projects here</h2>
        <p class="mt-5 leading-7 text-gray-700">${area.housing}</p>
        <p class="mt-4 leading-7 text-gray-700">${area.climate}</p>
        <p class="mt-4 leading-7 text-gray-700">${area.planning}</p>
        <p class="mt-6 text-sm text-gray-600">Every property is different. A site visit is the right way to confirm conditions, scope, and availability.</p>
      </aside>
    </div>
  </section>

  <section class="py-16 md:py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="max-w-3xl">
        <p class="text-sm font-extrabold uppercase tracking-[3px] text-[#9a7439]">The details that matter</p>
        <h2 class="mt-3 text-3xl md:text-4xl font-black text-[#0a2540]">A complete approach to ${service.name.toLowerCase()}</h2>
      </div>
      <div class="mt-10 grid md:grid-cols-3 gap-6">
        ${service.choices.map(([heading, copy], index) => `<article class="rounded-3xl bg-white p-7 shadow-sm border border-gray-100"><div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a2540] text-amber-300"><span class="font-black">0${index + 1}</span></div><h3 class="mt-6 text-xl font-black text-[#0a2540]">${heading}</h3><p class="mt-3 leading-7 text-gray-600">${copy}</p></article>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="py-16 md:py-20 bg-[#0b2d4e] text-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[.85fr_1.15fr] gap-12 items-start">
      <div>
        <p class="text-sm font-extrabold uppercase tracking-[3px] text-amber-300">From first visit to final walkthrough</p>
        <h2 class="mt-3 text-3xl md:text-4xl font-black">How we plan your ${area.name} project</h2>
        <p class="mt-5 text-lg leading-8 text-gray-300">We start with the home, the site, and the result you want. Product recommendations follow those facts—not the other way around.</p>
      </div>
      <ol class="space-y-5">
        ${service.process.map((step, index) => `<li class="flex gap-5 rounded-2xl bg-white/5 p-5 border border-white/10"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a96b] font-black text-[#0a2540]">${index + 1}</span><div><h3 class="font-bold text-lg">${step}</h3><p class="mt-1 text-gray-300">We explain the decisions, confirm expectations, and keep the next step clear.</p></div></li>`).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14">
      <div>
        <p class="text-sm font-extrabold uppercase tracking-[3px] text-[#9a7439]">Nearby communities</p>
        <h2 class="mt-3 text-3xl font-black text-[#0a2540]">${service.name} around ${area.name}</h2>
        <p class="mt-5 leading-7 text-gray-700">We work with homeowners in and around ${area.neighborhoods.slice(0, -1).join(', ')}, and ${area.neighborhoods.at(-1)}. Contact us to confirm scheduling for your address.</p>
        <ul class="mt-7 grid sm:grid-cols-2 gap-3" aria-label="Areas near ${area.name}">
          ${area.neighborhoods.map((neighborhood) => `<li class="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"><i class="fas fa-location-dot text-[#9a7439]"></i><span class="font-semibold">${neighborhood}</span></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <p class="text-sm font-extrabold uppercase tracking-[3px] text-[#9a7439]">Frequently asked questions</p>
        <h2 class="mt-3 text-3xl font-black text-[#0a2540]">Planning ${service.name.toLowerCase()} in ${area.name}</h2>
        <div class="mt-6 space-y-4">
          ${service.faqs.map(([question, answer], index) => `<details class="group rounded-2xl border border-gray-200 p-5"${index === 0 ? ' open' : ''}><summary class="cursor-pointer list-none font-bold text-[#0a2540] flex items-center justify-between gap-4">${question}<i class="fas fa-plus text-sm text-[#9a7439] group-open:rotate-45 transition"></i></summary><p class="mt-4 leading-7 text-gray-600">${answer}</p></details>`).join('\n          ')}
        </div>
      </div>
    </div>
  </section>

  <section class="py-12 bg-gray-50 border-y border-gray-200">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 class="text-xl font-black text-[#0a2540]">More services in ${area.name}</h2>
          <div class="mt-4 flex flex-wrap gap-3">${otherServices.map((item) => `<a href="${pageUrl(area, item)}" class="rounded-full bg-white border border-gray-200 px-4 py-2 font-semibold text-sm text-[#0a2540] hover:border-[#c9a96b]">${item.name}</a>`).join('')}</div>
        </div>
        <div>
          <h2 class="text-xl font-black text-[#0a2540]">${service.name} in nearby areas</h2>
          <div class="mt-4 flex flex-wrap gap-3">${otherAreas.map((item) => `<a href="${pageUrl(item, service)}" class="rounded-full bg-white border border-gray-200 px-4 py-2 font-semibold text-sm text-[#0a2540] hover:border-[#c9a96b]">${item.name}</a>`).join('')}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 md:py-20 bg-[#c9a96b]">
    <div class="max-w-5xl mx-auto px-6 text-center">
      <i class="fas ${service.icon} text-4xl text-[#0a2540]"></i>
      <h2 class="mt-5 text-3xl md:text-5xl font-black text-[#0a2540]">Start your ${area.name} ${service.singular}</h2>
      <p class="mt-5 text-lg text-[#153954]">Tell us what you want to improve. We’ll discuss the property, your priorities, and the right next step.</p>
      <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <a href="${escapeHtml(estimateUrl)}" class="rounded-2xl bg-[#0a2540] px-8 py-4 font-extrabold text-white shadow-lg hover:bg-[#0b2d4e]">Request a Free Estimate</a>
        <a href="tel:${phoneHref}" class="rounded-2xl border-2 border-[#0a2540] px-8 py-4 font-extrabold text-[#0a2540] hover:bg-white/20">Call ${phoneDisplay}</a>
      </div>
    </div>
  </section>
</main>
${chromeEnd()}`;
}

function serviceAreasPage() {
  const title = 'Service Areas in Central Virginia | SES Custom Homes';
  const description = 'Explore SES Custom Homes roofing, windows, decks, porches, and sunrooms in Richmond, Chesterfield, Midlothian, Henrico, Glen Allen, and Mechanicsville.';
  const canonical = `${origin}/service-areas.html`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: canonical,
    about: Object.values(areas).map((area) => ({ '@type': 'Place', name: area.label })),
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>${head({ title, description, canonical, schema })}</head>
${chromeStart()}
<main>
  <section class="bg-[#0a2540] text-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      <p class="uppercase tracking-[4px] text-amber-300 text-xs font-extrabold">Central Virginia Service Areas</p>
      <h1 class="mt-4 max-w-4xl text-4xl sm:text-5xl md:text-6xl font-black leading-tight">Local home improvement, built around your property</h1>
      <p class="mt-6 max-w-3xl text-lg md:text-xl leading-8 text-gray-200">Explore roofing, replacement windows, decks, porches, and sunrooms from SES Custom Homes in six communities across the Richmond region.</p>
      <a href="estimate.html" class="mt-9 inline-flex items-center gap-3 rounded-2xl bg-[#c9a96b] px-7 py-4 font-extrabold text-[#0a2540]">Request a Free Estimate <i class="fas fa-arrow-right"></i></a>
    </div>
  </section>
  <section class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="max-w-3xl">
        <h2 class="text-3xl md:text-4xl font-black text-[#0a2540]">Choose your area and service</h2>
        <p class="mt-5 text-lg leading-8 text-gray-700">These pages explain how local housing, lots, weather, and design priorities can affect project planning. Service depends on project type, address, and schedule.</p>
      </div>
      <div class="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        ${Object.values(areas).map((area) => `<article id="${area.slug}" class="scroll-mt-28 rounded-3xl bg-gray-50 border border-gray-200 p-7"><p class="text-xs uppercase tracking-[3px] font-extrabold text-[#9a7439]">${area.type}</p><h2 class="mt-2 text-2xl font-black text-[#0a2540]">${area.label}</h2><p class="mt-4 leading-7 text-gray-600">${area.housing}</p><ul class="mt-6 space-y-2">${Object.values(services).map((service) => `<li><a href="${pageUrl(area, service)}" class="flex items-center justify-between rounded-xl bg-white px-4 py-3 font-bold text-[#0a2540] shadow-sm hover:text-[#8b672e]"><span>${service.name} in ${area.name}</span><i class="fas fa-arrow-right text-xs"></i></a></li>`).join('')}</ul></article>`).join('\n        ')}
      </div>
    </div>
  </section>
  <section class="py-16 bg-[#f7f2e8]">
    <div class="max-w-4xl mx-auto px-6 text-center"><h2 class="text-3xl md:text-4xl font-black text-[#0a2540]">Don’t see your community?</h2><p class="mt-5 text-lg leading-8 text-gray-700">SES Custom Homes serves a wider regional footprint. Call with your project address and we’ll confirm current availability.</p><a href="tel:${phoneHref}" class="mt-7 inline-flex rounded-2xl bg-[#0a2540] px-8 py-4 font-extrabold text-white">${phoneDisplay}</a></div>
  </section>
</main>
${chromeEnd()}`;
}

function sunroomsPage() {
  const title = 'Sunroom Contractor in Central Virginia | SES Custom Homes';
  const description = 'Custom sunrooms in Central Virginia by SES Custom Homes. Plan glazing, insulation, rooflines, foundations, comfort, and a seamless connection to your home.';
  const canonical = `${origin}/sunrooms.html`;
  const service = services.sunrooms;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sunroom Design and Construction',
    serviceType: 'Sunroom construction',
    areaServed: 'Central Virginia',
    provider: { '@type': 'HomeAndConstructionBusiness', name: 'SES Custom Homes', url: origin, telephone: phoneHref },
    url: canonical,
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>${head({ title, description, canonical, image: service.hero, schema })}</head>
${chromeStart()}
<main>
  <section class="relative overflow-hidden bg-[#0a2540] text-white">
    <img src="sunroom.jpg" alt="Bright custom sunroom" class="absolute inset-0 h-full w-full object-cover opacity-30">
    <div class="absolute inset-0 bg-gradient-to-r from-[#061b2f] via-[#0a2540]/85 to-transparent"></div>
    <div class="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32"><div class="max-w-3xl"><p class="uppercase tracking-[4px] text-amber-300 text-xs font-extrabold">Light • Views • Everyday Comfort</p><h1 class="mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-tight">Custom Sunrooms in Central Virginia</h1><p class="mt-6 text-lg md:text-2xl text-gray-100 leading-8">Create a brighter connection between your home and backyard with a sunroom planned around orientation, comfort, and year-round goals.</p><a href="estimate.html?service=sunrooms" class="mt-9 inline-flex rounded-2xl bg-[#c9a96b] px-8 py-4 font-extrabold text-[#0a2540]">Request a Free Estimate</a></div></div>
  </section>
  <section class="py-16 md:py-20 bg-white"><div class="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14"><div><p class="text-sm font-extrabold uppercase tracking-[3px] text-[#9a7439]">More than a room full of windows</p><h2 class="mt-3 text-3xl md:text-4xl font-black text-[#0a2540]">Plan the complete enclosure</h2><p class="mt-6 text-lg leading-8 text-gray-700">${service.intro}</p><p class="mt-5 text-lg leading-8 text-gray-700">The first decision is how you expect to use the room through the seasons. That answer guides the glazing, insulation, air sealing, electrical plan, and heating or cooling strategy.</p></div><div class="grid gap-5">${service.choices.map(([heading, copy]) => `<article class="rounded-2xl bg-gray-50 border border-gray-200 p-6"><h3 class="text-xl font-black text-[#0a2540]">${heading}</h3><p class="mt-2 leading-7 text-gray-600">${copy}</p></article>`).join('')}</div></div></section>
  <section class="py-16 md:py-20 bg-[#f7f2e8]"><div class="max-w-7xl mx-auto px-6 lg:px-10"><h2 class="text-3xl md:text-4xl font-black text-[#0a2540]">Find sunroom planning for your area</h2><div class="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${Object.values(areas).map((area) => `<a href="${pageUrl(area, service)}" class="rounded-2xl bg-white p-6 border border-[#eadcc1] shadow-sm hover:-translate-y-1 transition"><span class="text-sm font-bold text-[#9a7439]">${area.label}</span><span class="mt-2 block text-xl font-black text-[#0a2540]">Sunrooms in ${area.name}</span><span class="mt-3 block text-gray-600">See local design and planning considerations <i class="fas fa-arrow-right ml-1 text-xs"></i></span></a>`).join('')}</div></div></section>
  <section class="py-16 bg-[#0b2d4e] text-white"><div class="max-w-4xl mx-auto px-6 text-center"><h2 class="text-3xl md:text-5xl font-black">Bring more daylight into daily life</h2><p class="mt-5 text-lg text-gray-300">Let’s discuss your home, the view, and how you want the new room to feel.</p><div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center"><a href="estimate.html?service=sunrooms" class="rounded-2xl bg-[#c9a96b] px-8 py-4 font-extrabold text-[#0a2540]">Request a Free Estimate</a><a href="tel:${phoneHref}" class="rounded-2xl border-2 border-white px-8 py-4 font-extrabold">${phoneDisplay}</a></div></div></section>
</main>
${chromeEnd()}`;
}

for (const [areaKey, area] of Object.entries(areas)) {
  for (const [serviceKey, service] of Object.entries(services)) {
    fs.writeFileSync(path.join(root, pageUrl(area, service)), localPage(areaKey, serviceKey));
  }
}

fs.writeFileSync(path.join(root, 'service-areas.html'), serviceAreasPage());
fs.writeFileSync(path.join(root, 'sunrooms.html'), sunroomsPage());

const sitemapExcludes = new Set([
  'privacy-policy.html',
  'terms-and-conditions.html',
  'ses-custom-homes-crm.html',
]);
const urls = fs.readdirSync(root)
  .filter((file) => file.endsWith('.html'))
  .filter((file) => !sitemapExcludes.has(file))
  .filter((file) => !fs.readFileSync(path.join(root, file), 'utf8').match(/<meta\s+name=["']robots["'][^>]*noindex/i))
  .sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b)))
  .map((file) => `${origin}/${file === 'index.html' ? '' : file}`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url.replaceAll('&', '&amp;')}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);

console.log(`Generated ${Object.keys(areas).length * Object.keys(services).length} local pages, two hubs, and sitemap.xml.`);
