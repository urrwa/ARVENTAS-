# ARVENTAS homepage image replacement — handover

## Scope
This update is based on the uploaded `ARVENTAS--claude-awesome-pascal-ofbviz.zip`.
It changes homepage photography only: 20 optimized WebP files are mapped to 37 image placements, including alternative process steps and matching categories. Some photographs are deliberately reused where appropriate.

No video, video poster, stylesheet, logo, navigation route, visible marketing copy, dependency version, animation code or source file for another page has been changed. Two entry-card alt descriptions were updated to match their new photographs.

The interactive report remains an SVG-based animated illustration. It is NOT replaced by a flattened report photograph. The Germany map and all matching controls remain intact. The existing report image with US dollar amounts and luxury-property figures was intentionally excluded.

## Apply without using Claude
1. Back up the project or create a separate Git branch.
2. Extract this update ZIP.
3. Copy/merge its `src`, `public` and `docs` folders into the root of the existing repository (the folder containing `package.json`). Overwrite only the included files. Do NOT delete or replace the entire existing directories.
4. Run `npm ci`, followed by `npm run build`, in the existing project.
5. Review locally with `npm run dev`, including mobile and both process tabs.
6. Commit the updated files to your repository and review the deployment through your existing Vercel workflow. No GitHub commit or Vercel deployment was performed here.

This is a changed-files package, not a standalone complete project. Keep your existing fonts, videos, assets, configuration and other source files. No Claude credits are required to copy and commit these files.

## Source changes
- `src/pages/Home.jsx`: homepage image references and two accurate alternative descriptions.
- `src/components/HomeVideo.jsx`: report teaser image only; video and poster unchanged.
- `src/components/ProcessTimeline.jsx`: optional image input, retaining existing defaults.
- `src/components/InvestorLaptop.jsx`: type-specific thumbnail sources only.
- `src/components/KnowledgeTabs.jsx`: optional per-page image override. The Knowledge page keeps its original imagery.
- `src/content/homepageImages.js`: new centralized mapping for all updated homepage photographs.
- `public/media/homepage/`: 20 new web-ready files.

## Section mapping
| Section | Mapping / imagery |
|---|---|
| Hero video | Existing video and poster preserved |
| Hero report teaser | `architectural-model.webp` |
| Owner entry card | `owner-residential-building.webp` |
| Investor entry card | `investor-residential-building.webp` |
| Service: Access | `discreet-property-access.webp` |
| Service: Analysis | `analysis-desk.webp` |
| Service: Transaction support | `consultation-wide.webp` |
| Interactive report | Original animated illustration preserved |
| Owner process: Initial contact | `consultation-square.webp` |
| Owner process: Documents | `property-documents.webp` |
| Owner process: Analysis | `valuation-review.webp` |
| Owner process: Meeting | `consultation-square.webp` |
| Owner process: Buyer selection | `search-region.webp` |
| Owner process: Transaction support | `transaction-handover.webp` |
| Investor process: Search profile | `search-region.webp` |
| Investor process: Qualification | `consultation-square.webp` |
| Investor process: Matching | `valuation-review.webp` |
| Investor process: Inspection | `property-viewing.webp` |
| Investor process: Decision | `consultation-square.webp` |
| Investor process: Transaction support | `transaction-handover.webp` |
| Matching: Apartments | Residential-building and neighbourhood illustrations |
| Matching: Mixed-use | Commercial/residential street illustration; same image reused rather than inventing three real listings |
| Matching: Commercial | Office exterior/interior illustrations |
| Matching: Land | Empty land, urban development site and construction illustrations |
| Knowledge: All | `owner-residential-building.webp` |
| Knowledge: Off-Market | `discreet-property-access.webp` |
| Knowledge: Valuation | `valuation-review.webp` |
| Knowledge: Investment | `investor-residential-building.webp` |
| Knowledge: Potential | `architectural-model.webp` |
| Knowledge: Market information | `residential-neighbourhood.webp` |
| Contact | `modern-office-entrance.webp` |

## Provenance and publication notes
Ten optimized files/variants come from images previously generated in this conversation. Ten supporting images are curated from the uploaded repository for subject accuracy (viewing, handover, maps, neighbourhoods, offices and land). They are not all newly generated photographs. Detailed source filenames, dimensions and hashes appear in `homepage-image-assets.json`.

Generated people are fictional adults in an illustrative consultation scene, not actual ARVENTAS staff or testimonial subjects. Buildings and matching thumbnails are illustrations, not verified listings or ARVENTAS projects. Existing illustration notices have been retained. Rights for existing repository photographs were not independently verified; retain and review your original licences before publication.

The images are optimized at or below their actual source resolutions; no artificial high-resolution claim is made. Portrait-source crops are used for the consultation views. Verify full-width presentation on large displays, where the original source size is a limiting factor.

## Validation actually performed
- Parsed/transpiled all 82 JS/JSX source files for syntax using the available local TypeScript compiler: no errors.
- Checked relative source imports: resolved.
- Checked all 37 mapped placements resolve to 20 valid WebP files.
- Verified six images in each process, four matching types with three thumbnails each, and six Knowledge categories.
- Compared against the uploaded ZIP: only five original source files changed; all original public assets, videos, CSS, dependency files, report animation and other page files are unchanged.
- Inspected a contact sheet of all replacement assets and crops.

Not performed: a successful production Vite build, React runtime/browser interaction test, or deployment. `npm ci` could not download dependencies because `registry.npmjs.org` failed DNS resolution (`EAI_AGAIN`). Dependency versions and lockfile were deliberately left unchanged. Run the original project's build and visual tests on your development machine or CI before deploying.

The accompanying image preview is an asset overview, not a screenshot of the running homepage.
