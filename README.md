# SEShomes
Professional website for SES Custom Builders – custom homes, renovations, and luxury building services in Mechanicsville, Hanover County, and Central Virginia. Built with Next.js, Tailwind CSS, and optimized for SEO, local search, and AI visibility.

## Preliminary roof estimator

`roofing-estimate.html` adds an address-first preliminary roof estimator to the existing roofing campaign and lead form. Its browser code calls the server-side `/api/roof-estimate` route deployed with the separate `ses-crm` application, so the Google Solar API key is never sent to the browser.

The backend uses the CRM's Mapbox geocoder and configurable roofing pricing rules, applies a configurable waste allowance, and returns a rounded price range. Weak imagery, ambiguous building matches, and incomplete roof coverage route the homeowner into the existing manual-review lead flow.
