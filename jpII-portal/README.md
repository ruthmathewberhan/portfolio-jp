# JPII Portal

An interactive, static front-end foundation for a TVET student workspace. Serve the repository root with a static HTTP server, then visit `/jpII-portal/`. HTTP serving is needed for JavaScript modules; opening this page through `file://` will not load the interactive features in most browsers.

## Included

- Student overview, department selection, searchable learning areas, internal competency feedback.
- Schedule and attendance views, fees in ETB, registration and document request entry points.
- Cooperative-training logbook with validated activity dates/hours, removable drafts, and text export.
- Separate internal assessment and national occupational assessment / CoC views.
- RPL, assessment review, accessibility, placement, and registrar request drafts.
- Gregorian and Ethiopian calendar date display via `Intl`, with Addis Ababa time zone. Session times explicitly use 24-hour EAT.
- Careers moved from the public website, retaining the existing page content.
- Shared brand styling and footer; responsive navigation and dark mode.

This is not a production student information system. Sample unit titles are illustrative, not approved Ethiopian Occupational Standard units or accredited offerings. There is no login, server, database, payment processing, certificate generation, or official request submission. Draft log entries exist only in the open tab and are lost on reload unless downloaded. The inherited careers application form remains a static mockup.

## Ethiopian TVET alignment

Reviewed 18 November 2026:

- [Ministry of Justice, TVET Proclamation No. 954/2016](https://justice.gov.et/en/law/technical-and-vocational-education-and-training-proclamation/): occupational standards, competence assessment, and national certification inform the separation between college learning progress and authorized assessment records.
- [Regional assessment authority, national assessment directive](https://amharacoc.gov.et/index.php?Itemid=73&catid=50%3Aanrs-ict-agency&id=131%3A2019-08-05-14-03-57&lang=en&option=com_content&view=article): assessment centers, assessment processes, and certification verification inform the assessment record fields.
- [Assessment and RPL guidance](https://amharacoc.gov.et/index.php?catid=50%3Aanrs-ict-agency&id=127%3A2013-02-12-&lang=en&option=com_content&view=article): recognition of learning gained inside or outside formal training informs the RPL request route.
- [Occupational standard example](https://dl.ojocv.gov.et/admin_/os/OS%20%20Animal%20Health%20%20Level%20I-IV.pdf): the standard/unit structure informs the proposed data model, not the department curricula.

Regional guidance is a reference for workflow design, not a claim that Amhara procedures govern this Addis Ababa college. Confirm applicable city/regional rules and current approved occupation standards before release. No universal training ratio, attendance threshold, entry qualification, appeal deadline, fee, or automatic level progression has been invented.

## Production implementation boundary

1. Connect secure authentication and server-enforced roles: trainee, trainer, registrar, finance officer, enterprise supervisor, and authorized assessment-record administrator. A client-side role selector is not authorization.
2. Import approved occupations, qualification levels, EOS versions, units, learning materials, intakes, and accredited training scope. Keep short courses distinct from national qualifications.
3. Implement enrolment, attendance, internal evidence/reviews, placements, supervisor verification, assessment registrations/results, CoC references, RPL evidence, student requests, and finance records as separate audited entities. External certification records require a verified source and issuing authority; internal completion must not issue a national CoC.
4. Configure current college/city policies for admission, scheduling, attendance, reassessment, appeals, accessibility, retention, and fees. Use ISO dates internally and explicit Ethiopian/Gregorian display labels.
5. Add private document storage, upload validation, consent/retention controls, server-side input validation, backups, and an audit trail. Connect official service queues and payment channels before exposing submission or payment controls.

## Checks and maintenance

Run `node --test jpII-portal/tests/*.test.js` and `node check-website.mjs` from the repository root. The shared footer template lives in `scripts/sync-site-chrome.mjs`; run it to synchronize all public and portal page footers after template changes. It also removes Careers and Portal from public main navigation. Legacy public careers/portal URLs redirect to this directory.
