/* Target: DE_Recruitment_Email_Performance_30D | Update type: Overwrite */
SELECT
    j.JobID, j.EmailName,
    COUNT(DISTINCT s.SubscriberKey) AS SentCount,
    COUNT(DISTINCT o.SubscriberKey) AS UniqueOpenCount,
    COUNT(DISTINCT c.SubscriberKey) AS UniqueClickCount,
    COUNT(DISTINCT b.SubscriberKey) AS BounceCount,
    COUNT(DISTINCT u.SubscriberKey) AS UnsubscribeCount
FROM _Job j
INNER JOIN _Sent s ON j.JobID = s.JobID
LEFT JOIN _Open o ON s.JobID = o.JobID AND s.ListID = o.ListID AND s.BatchID = o.BatchID AND s.SubscriberID = o.SubscriberID AND o.IsUnique = 1
LEFT JOIN _Click c ON s.JobID = c.JobID AND s.ListID = c.ListID AND s.BatchID = c.BatchID AND s.SubscriberID = c.SubscriberID AND c.IsUnique = 1
LEFT JOIN _Bounce b ON s.JobID = b.JobID AND s.ListID = b.ListID AND s.BatchID = b.BatchID AND s.SubscriberID = b.SubscriberID
LEFT JOIN _Unsubscribe u ON s.JobID = u.JobID AND s.ListID = u.ListID AND s.BatchID = u.BatchID AND s.SubscriberID = u.SubscriberID
WHERE s.EventDate >= DATEADD(day, -30, GETDATE())
GROUP BY j.JobID, j.EmailName
