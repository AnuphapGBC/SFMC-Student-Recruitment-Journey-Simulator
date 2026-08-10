# SFMC implementation map

This repository is a platform-independent simulator. The mapping below explains where each demonstrated concern would live in Marketing Cloud Engagement.

| Repository evidence | Marketing Cloud Engagement analogue | Responsibility |
| --- | --- | --- |
| `public/sample-data/students.csv` | Source or synchronized data extensions | Synthetic contact, interest, consent, event, and application attributes |
| `sql/01_build_journey_entry.sql` | Automation Studio SQL Query Activity | Deduplication and journey-entry segmentation |
| `sql/02_data_quality_summary.sql` | Automation Studio SQL Query Activity | Missing keys, invalid email, unknown consent, and duplicate monitoring |
| `email/program-event-invite.html` | Content Builder and AMPscript | Personalization, fallbacks, branch-aware CTA, sender identity, unsubscribe |
| `transitionProspect()` | Journey Builder decisions, exits, and goals | Engagement, registration, application, enrolment, consent, and bounce logic |
| Dashboard measurement section | Data views and BI/reporting | Operational health, engagement, and recruitment-funnel outcomes |

## Exit hierarchy

1. Consent withdrawal or channel suppression.
2. CRM application status becomes `Submitted`.
3. CRM enrolment status becomes `Enrolled`.
4. Engagement influences the next relevant message but never overrides the first three controls.
