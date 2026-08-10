export type JourneyStage = "Prospect" | "Engaged" | "EventRegistrant" | "Applicant" | "Enrolled";
export type ApplicationStatus = "NotStarted" | "InProgress" | "Submitted" | "Enrolled";
export type ConsentStatus = "OptedIn" | "OptedOut" | "Unknown";
export type SimulationEvent = "open" | "click" | "register" | "startApplication" | "submitApplication" | "enroll" | "unsubscribe" | "hardBounce";

export type Prospect = {
  id: string;
  contactKey: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  programCode: string;
  programName: string;
  intake: string;
  campus: string;
  studentType: "Domestic" | "International";
  preferredLanguage: "English" | "French";
  stage: JourneyStage;
  consentStatus: ConsentStatus;
  activeInterest: boolean;
  applicationStatus: ApplicationStatus;
  emailValid: boolean;
  eventRegistered: boolean;
  lastEngagementDate: string;
  modifiedDate: string;
};

export const journeyStages: Array<{ key: JourneyStage; label: string; icon: string; description: string }> = [
  { key: "Prospect", label: "Prospect", icon: "◎", description: "Inquiry captured; welcome and program information." },
  { key: "Engaged", label: "Engaged", icon: "↗", description: "Click or event interest creates a relevant next action." },
  { key: "EventRegistrant", label: "Event registrant", icon: "◇", description: "Remind the contact and suppress the repeated CTA." },
  { key: "Applicant", label: "Applicant", icon: "✓", description: "Change content; submission exits recruitment nurture." },
  { key: "Enrolled", label: "Enrolled", icon: "★", description: "Transition into student communications." },
];

const base = {
  programCode: "CPP",
  programName: "Computer Programming",
  intake: "2027-WINTER",
  campus: "Newnham",
  studentType: "Domestic" as const,
  preferredLanguage: "English" as const,
  stage: "Prospect" as JourneyStage,
  consentStatus: "OptedIn" as ConsentStatus,
  activeInterest: true,
  applicationStatus: "NotStarted" as ApplicationStatus,
  emailValid: true,
  eventRegistered: false,
  lastEngagementDate: "2026-08-08",
  modifiedDate: "2026-08-08T12:00:00Z",
};

function row(id: string, contactKey: string, firstName: string, lastName: string, changes: Partial<Prospect> = {}): Prospect {
  return {
    id,
    contactKey,
    firstName,
    lastName,
    emailAddress: `${firstName || "prospect"}.${lastName}`.toLowerCase().replace(/[^a-z.]/g, "") + "@example.ca",
    ...base,
    ...changes,
  };
}

export const prospects: Prospect[] = [
  row("R001", "C-1001", "Maya", "Chen", { stage: "Engaged", eventRegistered: true, lastEngagementDate: "2026-08-08", modifiedDate: "2026-08-08T14:10:00Z" }),
  row("R002", "C-1002", "Liam", "Patel", { studentType: "International", lastEngagementDate: "2026-08-06", modifiedDate: "2026-08-06T17:25:00Z" }),
  row("R003", "C-1003", "Sophie", "Nguyen", { preferredLanguage: "French", stage: "Engaged", eventRegistered: true, lastEngagementDate: "2026-08-07", modifiedDate: "2026-08-07T12:15:00Z" }),
  row("R004", "C-1004", "Noah", "Williams", { studentType: "International", lastEngagementDate: "2026-08-03", modifiedDate: "2026-08-03T09:42:00Z" }),
  row("R005", "C-1005", "Ava", "Martin", { preferredLanguage: "French", stage: "EventRegistrant", eventRegistered: true, modifiedDate: "2026-08-08T16:20:00Z" }),
  row("R006", "C-1006", "Ethan", "Garcia", { stage: "Applicant", applicationStatus: "Submitted", eventRegistered: true, modifiedDate: "2026-08-05T11:30:00Z" }),
  row("R007", "C-1007", "Emma", "Wilson", { stage: "Enrolled", applicationStatus: "Enrolled", eventRegistered: true, modifiedDate: "2026-08-01T10:05:00Z" }),
  row("R008", "C-1008", "Lucas", "Brown", { consentStatus: "OptedOut", lastEngagementDate: "2026-07-30", modifiedDate: "2026-07-30T08:20:00Z" }),
  row("R009", "C-1009", "Olivia", "Davis", { activeInterest: false, lastEngagementDate: "2026-06-12", modifiedDate: "2026-06-12T13:00:00Z" }),
  row("R010", "", "Amelia", "Thompson", { modifiedDate: "2026-08-08T15:45:00Z" }),
  row("R011", "C-1011", "Henry", "Lee", { emailAddress: "henry.lee.example.ca", emailValid: false, studentType: "International", modifiedDate: "2026-08-07T09:10:00Z" }),
  row("R012", "C-1012", "Mia", "Clark", { intake: "2027-FALL", stage: "Engaged", modifiedDate: "2026-08-04T18:05:00Z" }),
  row("R013", "C-1013", "Jackson", "King", { programCode: "BAI", programName: "Business Analytics", studentType: "International", stage: "Applicant", applicationStatus: "InProgress", eventRegistered: true, modifiedDate: "2026-08-06T14:55:00Z" }),
  row("R014", "C-1014", "Isla", "Scott", { studentType: "International", stage: "EventRegistrant", eventRegistered: true, lastEngagementDate: "2026-08-09", modifiedDate: "2026-08-09T07:30:00Z" }),
  row("R015", "C-1015", "", "Moore", { emailAddress: "james.moore@example.ca", modifiedDate: "2026-08-02T16:10:00Z" }),
  row("R016", "C-1016", "Charlotte", "White", { programName: "", preferredLanguage: "French", stage: "Engaged", modifiedDate: "2026-08-07T20:45:00Z" }),
  row("R017", "C-1017", "Benjamin", "Harris", { studentType: "International", stage: "Engaged", lastEngagementDate: "2026-08-09", modifiedDate: "2026-08-09T08:02:00Z" }),
  row("R018", "C-1018", "Harper", "Lewis", { stage: "Applicant", applicationStatus: "InProgress", eventRegistered: true, modifiedDate: "2026-08-08T19:40:00Z" }),
  row("R019", "C-1019", "Mason", "Walker", { modifiedDate: "2026-08-05T09:00:00Z" }),
  row("R020", "C-1019", "Mason", "Walker", { emailAddress: "mason.walker+old@example.ca", lastEngagementDate: "2026-07-11", modifiedDate: "2026-07-11T09:00:00Z" }),
  row("R021", "C-1021", "Evelyn", "Young", { studentType: "International", stage: "EventRegistrant", eventRegistered: true, lastEngagementDate: "2026-08-09", modifiedDate: "2026-08-09T08:15:00Z" }),
  row("R022", "C-1022", "Alexandre", "Allen", { studentType: "International", preferredLanguage: "French", consentStatus: "Unknown", modifiedDate: "2026-08-08T10:20:00Z" }),
  row("R023", "C-1023", "Ella", "Wright", { programCode: "UXD", programName: "Interactive Design", campus: "Seneca@York", stage: "Applicant", applicationStatus: "Submitted", modifiedDate: "2026-08-06T12:00:00Z" }),
  row("R024", "C-1024", "Daniel", "Hernandez", { stage: "Engaged", emailValid: false, modifiedDate: "2026-08-04T07:30:00Z" }),
];

export function segmentProspects(input: Prospect[]): Prospect[] {
  const latestByContactKey = new Map<string, Prospect>();
  input.filter((item) => item.contactKey).forEach((item) => {
    const current = latestByContactKey.get(item.contactKey);
    if (!current || item.modifiedDate > current.modifiedDate) latestByContactKey.set(item.contactKey, item);
  });

  return Array.from(latestByContactKey.values()).filter((item) =>
    item.programCode === "CPP" && item.intake === "2027-WINTER" && item.consentStatus === "OptedIn" &&
    item.activeInterest && item.emailValid && !["Submitted", "Enrolled"].includes(item.applicationStatus),
  );
}

export function eligibilityChecks(item: Prospect) {
  return [
    { label: "Stable ContactKey", pass: Boolean(item.contactKey) },
    { label: "CPP / 2027 Winter", pass: item.programCode === "CPP" && item.intake === "2027-WINTER" },
    { label: "Consent is OptedIn", pass: item.consentStatus === "OptedIn" },
    { label: "Active interest", pass: item.activeInterest },
    { label: "Valid email", pass: item.emailValid },
    { label: "Not submitted / enrolled", pass: !["Submitted", "Enrolled"].includes(item.applicationStatus) },
  ];
}

export function transitionProspect(item: Prospect, event: SimulationEvent): { prospect: Prospect; message: string; exited: boolean } {
  if (event === "unsubscribe") return { prospect: { ...item, consentStatus: "OptedOut" }, message: "Consent withdrawn. Contact added to suppression and exited.", exited: true };
  if (event === "hardBounce") return { prospect: { ...item, emailValid: false }, message: "Hard bounce recorded. Email channel suppressed and contact exited.", exited: true };
  if (event === "enroll") return { prospect: { ...item, stage: "Enrolled", applicationStatus: "Enrolled" }, message: "Enrolment confirmed. Transition to student communications.", exited: true };
  if (event === "submitApplication") return { prospect: { ...item, stage: "Applicant", applicationStatus: "Submitted" }, message: "CRM application status is Submitted. Recruitment nurture exits now.", exited: true };
  if (event === "startApplication") return { prospect: { ...item, stage: "Applicant", applicationStatus: "InProgress" }, message: "Application started. Journey switches to completion support.", exited: false };
  if (event === "register") return { prospect: { ...item, stage: "EventRegistrant", eventRegistered: true }, message: "Registration captured. Repeated event CTA is suppressed.", exited: false };
  if (event === "click") return { prospect: { ...item, stage: item.stage === "Prospect" ? "Engaged" : item.stage }, message: "Program link clicked. Engagement branch selected.", exited: false };
  return { prospect: item, message: "Open recorded for measurement. No lifecycle state change.", exited: false };
}

export function qualitySummary(input: Prospect[]) {
  const keyCounts = input.reduce<Record<string, number>>((counts, item) => {
    if (item.contactKey) counts[item.contactKey] = (counts[item.contactKey] || 0) + 1;
    return counts;
  }, {});
  return {
    missingKeys: input.filter((item) => !item.contactKey).length,
    invalidEmails: input.filter((item) => !item.emailValid).length,
    duplicateKeys: Object.values(keyCounts).filter((count) => count > 1).length,
    unknownConsent: input.filter((item) => item.consentStatus === "Unknown").length,
  };
}

export const segmentationSql = `SELECT
  p.ContactKey,
  p.EmailAddress,
  p.FirstName,
  p.ProgramCode,
  p.ProgramName,
  p.Intake,
  p.PreferredLanguage,
  p.Stage
FROM (
  SELECT src.*,
    ROW_NUMBER() OVER (
      PARTITION BY src.ContactKey
      ORDER BY src.ModifiedDate DESC
    ) AS RecordRank
  FROM DE_Prospect_Master src
  WHERE src.ContactKey IS NOT NULL
) p
WHERE p.RecordRank = 1
  AND p.ProgramCode = 'CPP'
  AND p.Intake = '2027-WINTER'
  AND p.ConsentStatus = 'OptedIn'
  AND p.ActiveInterest = 1
  AND p.EmailValid = 1
  AND p.ApplicationStatus NOT IN ('Submitted', 'Enrolled')`;

export const ampscriptSample = `%%[
VAR @firstName, @programName
SET @firstName = AttributeValue("FirstName")
SET @programName = AttributeValue("ProgramName")

IF Empty(@firstName) THEN
  SET @firstName = "there"
ENDIF

IF Empty(@programName) THEN
  SET @programName = "your selected program"
ENDIF
]%%`;
