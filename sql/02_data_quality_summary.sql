/* Target: DE_Recruitment_Data_Quality_Summary | Update type: Overwrite */
SELECT 'Missing ContactKey' AS IssueType, COUNT(*) AS IssueCount
FROM DE_Prospect_Master
WHERE ContactKey IS NULL OR ContactKey = ''
UNION ALL
SELECT 'Invalid email', COUNT(*) FROM DE_Prospect_Master WHERE EmailValid = 0
UNION ALL
SELECT 'Unknown consent', COUNT(*) FROM DE_Prospect_Master WHERE ConsentStatus = 'Unknown'
UNION ALL
SELECT 'Duplicate ContactKey', COUNT(*)
FROM (
    SELECT ContactKey FROM DE_Prospect_Master
    WHERE ContactKey IS NOT NULL
    GROUP BY ContactKey HAVING COUNT(*) > 1
) duplicates
