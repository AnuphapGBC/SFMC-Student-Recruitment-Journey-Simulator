# Data dictionary

All records are synthetic. Field names resemble a practical Marketing Cloud Engagement data-extension model; they are not exported from any institution.

| Field | Type | Purpose |
| --- | --- | --- |
| `ContactKey` | Text(50), target primary key | Stable cross-channel identity; email is an address, not identity. |
| `EmailAddress` | EmailAddress | Delivery address; independently quality-checked. |
| `ProgramCode` | Text(20) | Active academic-program interest used for segmentation. |
| `Intake` | Text(20) | Intended term, such as `2027-WINTER`. |
| `Stage` | Text(30) | Current recruitment lifecycle state. |
| `ConsentStatus` | Text(20) | Explicit `OptedIn`, `OptedOut`, or `Unknown` state. |
| `ActiveInterest` | Boolean | Whether the program interest remains active. |
| `ApplicationStatus` | Text(30) | CRM-owned status; `Submitted` and `Enrolled` override engagement. |
| `EmailValid` | Boolean | Operational quality and suppression control. |
| `EventRegistered` | Boolean | Drives reminder content and suppresses repeated registration CTAs. |
| `ModifiedDate` | Date | Selects the newest row when duplicate ContactKeys arrive. |
