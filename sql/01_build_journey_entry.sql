/* Target: DE_Recruitment_CPP_2027W | Update type: Overwrite */
SELECT
    p.ContactKey, p.EmailAddress, p.FirstName, p.LastName,
    p.ProgramCode, p.ProgramName, p.Intake, p.Campus,
    p.StudentType, p.PreferredLanguage, p.Stage,
    p.ApplicationStatus, p.EventRegistered, p.LastEngagementDate
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
  AND p.ApplicationStatus NOT IN ('Submitted', 'Enrolled')
