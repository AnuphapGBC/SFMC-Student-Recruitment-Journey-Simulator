"use client";

import { useMemo, useState } from "react";
import {
  ampscriptSample,
  eligibilityChecks,
  journeyStages,
  prospects,
  qualitySummary,
  segmentationSql,
  segmentProspects,
  SimulationEvent,
  transitionProspect,
} from "../lib/recruitment-data";

const eventOptions: Array<{ key: SimulationEvent; label: string; icon: string }> = [
  { key: "open", label: "Open email", icon: "◌" },
  { key: "click", label: "Click program", icon: "↗" },
  { key: "register", label: "Register event", icon: "◇" },
  { key: "startApplication", label: "Start application", icon: "+" },
  { key: "submitApplication", label: "Submit application", icon: "✓" },
  { key: "enroll", label: "Confirm enrolment", icon: "★" },
  { key: "unsubscribe", label: "Unsubscribe", icon: "−" },
  { key: "hardBounce", label: "Hard bounce", icon: "!" },
];

function formatName(firstName: string, lastName: string) {
  return `${firstName || "Unknown"} ${lastName}`;
}

function statusClass(value: string) {
  if (["OptedIn", "Enrolled", "EventRegistrant"].includes(value)) return "positive";
  if (["OptedOut", "Submitted"].includes(value)) return "negative";
  if (["Unknown", "InProgress", "Engaged"].includes(value)) return "warning";
  return "neutral";
}

export default function Home() {
  const [records, setRecords] = useState(prospects);
  const [selectedId, setSelectedId] = useState("R001");
  const [emailId, setEmailId] = useState("R001");
  const [activity, setActivity] = useState([
    { label: "Journey entry evaluated", message: "All eligibility rules passed. Welcome email is queued.", exit: false },
  ]);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("CPP");
  const [intake, setIntake] = useState("2027-WINTER");
  const [consentedOnly, setConsentedOnly] = useState(true);
  const [labView, setLabView] = useState<"query" | "quality" | "output">("query");

  const segment = useMemo(() => segmentProspects(records), [records]);
  const selected = records.find((item) => item.id === selectedId) ?? records[0];
  const emailContact = records.find((item) => item.id === emailId) ?? records[0];
  const checks = eligibilityChecks(selected);
  const quality = qualitySummary(records);

  const applications = records.filter((item) => ["InProgress", "Submitted", "Enrolled"].includes(item.applicationStatus)).length;
  const eventRegistrations = records.filter((item) => item.eventRegistered).length;
  const filteredRecords = records.filter((item) => {
    const text = `${item.firstName} ${item.lastName} ${item.contactKey} ${item.emailAddress}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (program === "ALL" || item.programCode === program) &&
      (intake === "ALL" || item.intake === intake) && (!consentedOnly || item.consentStatus === "OptedIn");
  });

  function simulate(event: SimulationEvent) {
    const result = transitionProspect(selected, event);
    const label = eventOptions.find((item) => item.key === event)?.label ?? event;
    setRecords((current) => current.map((item) => item.id === selected.id ? result.prospect : item));
    setActivity((current) => [{ label, message: result.message, exit: result.exited }, ...current].slice(0, 5));
  }

  function resetSimulation() {
    setRecords(prospects);
    setSelectedId("R001");
    setActivity([{ label: "Journey entry evaluated", message: "All eligibility rules passed. Welcome email is queued.", exit: false }]);
  }

  const firstName = emailContact.firstName || "there";
  const programName = emailContact.programName || "your selected program";
  const isFrench = emailContact.preferredLanguage === "French";

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Portfolio project home">
          <span className="brandMark">PC</span>
          <span><strong>Pek Chansatit</strong><small>Marketing technology portfolio</small></span>
        </a>
        <nav aria-label="Project navigation">
          <a href="#journey">Journey</a>
          <a href="#simulator">Simulator</a>
          <a href="#workbench">Workbench</a>
          <a href="#architecture">Architecture</a>
        </nav>
        <span className="portfolioLabel"><i /> Personal portfolio project</span>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">SFMC CONCEPTS · STUDENT RECRUITMENT</p>
          <h1>From first inquiry <em>to enrolled student.</em></h1>
          <p className="lede">An interactive simulation of the data, automation, journey, and measurement logic behind a consent-aware recruitment campaign.</p>
          <div className="heroActions">
            <a className="primaryButton" href="#simulator">Run the simulator <span>↘</span></a>
            <span className="synthetic">Synthetic data · No Salesforce connection</span>
          </div>
        </div>

        <aside className="segmentCard" aria-label="Active segment summary">
          <div className="cardTop"><span>Active segment</span><b>READY</b></div>
          <code>DE_Recruitment_CPP_2027W</code>
          <div className="bigNumber"><strong>{segment.length}</strong><span>journey-ready contacts</span></div>
          <div className="chips"><span>CPP</span><span>2027 Winter</span><span>Opted in</span><span>Active interest</span></div>
          <footer><span>Simulated refresh</span><b>08:30 UTC</b></footer>
        </aside>
      </section>

      <aside className="disclosure">
        <strong>Independent demonstration</strong>
        <span>This models transferable Marketing Cloud Engagement concepts. It is not a production Seneca implementation and does not claim production SFMC experience.</span>
      </aside>

      <section className="metrics" aria-label="Recruitment funnel summary">
        {[
          ["Source records", records.length, "synthetic CRM rows"],
          ["Journey-ready", segment.length, "after quality + consent"],
          ["Event registrations", eventRegistrations, "across all prospects"],
          ["Applications", applications, "started or completed"],
        ].map(([label, value, note]) => <article key={String(label)}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}
      </section>

      <section className="journey section" id="journey">
        <div className="sectionHead">
          <div><p className="eyebrow">JOURNEY ORCHESTRATION</p><h2>One contact. Five meaningful states.</h2></div>
          <p>CRM status is authoritative. A submitted application or confirmed enrolment exits recruitment nurture—even when engagement is high.</p>
        </div>
        <div className="stageGrid">
          {journeyStages.map((stage, index) => {
            const count = records.filter((item) => item.stage === stage.key).length;
            return (
              <article className="stage" key={stage.key}>
                <span className="stageIndex">0{index + 1}</span><i>{stage.icon}</i>
                <h3>{stage.label}</h3><p>{stage.description}</p>
                <div><strong>{count}</strong><span> records</span></div>
                {index < journeyStages.length - 1 && <b className="arrow">→</b>}
              </article>
            );
          })}
        </div>
        <aside className="principle"><b>↺</b><p><strong>Design principle</strong><span>Institutional CRM remains the source of truth. Journey-ready attributes move through controlled data-extension mappings.</span></p><code>CRM → DE → Journey</code></aside>
      </section>

      <section className="simulator section" id="simulator">
        <div className="sectionHead lightHead">
          <div><p className="eyebrow">EVENT-DRIVEN LOGIC</p><h2>Put a prospect through the journey.</h2></div>
          <button className="ghostButton" type="button" onClick={resetSimulation}>Reset simulation ↺</button>
        </div>

        <div className="simulatorGrid">
          <aside className="contactRail">
            <label htmlFor="sim-contact">Simulated contact</label>
            <select id="sim-contact" value={selectedId} onChange={(event) => { setSelectedId(event.target.value); setActivity([]); }}>
              {records.slice(0, 18).map((item) => <option key={item.id} value={item.id}>{formatName(item.firstName, item.lastName)} · {item.contactKey || "missing key"}</option>)}
            </select>
            <div className="profileCard">
              <span className="avatar">{(selected.firstName[0] || "?")}{selected.lastName[0]}</span>
              <div><strong>{formatName(selected.firstName, selected.lastName)}</strong><small>{selected.emailAddress}</small></div>
              <span className={`status ${statusClass(selected.stage)}`}>{selected.stage}</span>
            </div>
            <dl className="profileFacts">
              <div><dt>Program</dt><dd>{selected.programCode} · {selected.intake}</dd></div>
              <div><dt>Language</dt><dd>{selected.preferredLanguage}</dd></div>
              <div><dt>Consent</dt><dd className={statusClass(selected.consentStatus)}>{selected.consentStatus}</dd></div>
              <div><dt>Application</dt><dd>{selected.applicationStatus}</dd></div>
            </dl>
            <div className="checkList">
              <h3>Entry checks</h3>
              {checks.map((check) => <div key={check.label}><span className={check.pass ? "pass" : "fail"}>{check.pass ? "✓" : "×"}</span>{check.label}</div>)}
            </div>
          </aside>

          <div className="eventPanel">
            <div className="panelTitle"><div><span>Choose a signal</span><h3>What happens next?</h3></div><code>ContactKey: {selected.contactKey || "NULL"}</code></div>
            <div className="eventGrid">
              {eventOptions.map((item) => <button type="button" key={item.key} onClick={() => simulate(item.key)}><i>{item.icon}</i><span>{item.label}</span></button>)}
            </div>
            <div className="timeline">
              <h3>Decision log <span>{activity.length} events</span></h3>
              {activity.length === 0 && <p className="emptyState">Choose a signal to evaluate journey logic.</p>}
              {activity.map((item, index) => (
                <article className={item.exit ? "exitEvent" : ""} key={`${item.label}-${index}`}>
                  <span>{item.exit ? "EXIT" : `T+${index + 1}`}</span>
                  <div><strong>{item.label}</strong><p>{item.message}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="workbench section" id="workbench">
        <div className="sectionHead">
          <div><p className="eyebrow">AUTOMATION STUDIO CONCEPTS</p><h2>Segmentation workbench.</h2></div>
          <p>Explore how SQL selection, data-quality controls, and a journey-entry data extension work together before activation.</p>
        </div>

        <div className="workbenchShell">
          <div className="labTabs" role="tablist" aria-label="Workbench views">
            {[["query", "SQL query"], ["quality", "Data quality"], ["output", "Output preview"]].map(([key, label]) => (
              <button role="tab" aria-selected={labView === key} className={labView === key ? "active" : ""} type="button" key={key} onClick={() => setLabView(key as typeof labView)}>{label}</button>
            ))}
            <span>{segment.length} rows in target DE</span>
          </div>

          {labView === "query" && (
            <div className="codeLayout">
              <div className="codePane"><div className="codeBar"><span>01_build_journey_entry.sql</span><b>SQL</b></div><pre><code>{segmentationSql}</code></pre></div>
              <aside className="rulePane"><h3>What this query proves</h3><ol><li><span>01</span><p><strong>Identity control</strong>Keep the newest row for each stable ContactKey.</p></li><li><span>02</span><p><strong>Consent gate</strong>Only explicit OptedIn records may enter.</p></li><li><span>03</span><p><strong>Lifecycle exit</strong>Submitted and Enrolled statuses take priority.</p></li></ol></aside>
            </div>
          )}

          {labView === "quality" && (
            <div className="qualityView">
              {[ ["Missing ContactKey", quality.missingKeys, "Blocks journey identity"], ["Invalid email", quality.invalidEmails, "Suppress from email channel"], ["Duplicate ContactKey", quality.duplicateKeys, "Newest record wins"], ["Unknown consent", quality.unknownConsent, "Hold outside journey"] ].map(([label, value, note]) => <article key={String(label)}><span>{value}</span><div><strong>{label}</strong><p>{note}</p></div></article>)}
              <aside><strong>Quality gate result</strong><p>{records.length - segment.length} source rows are excluded from this target segment by scope, consent, quality, duplication, or lifecycle rules.</p></aside>
            </div>
          )}

          {labView === "output" && (
            <div className="outputView">
              <div className="filters">
                <label>Search<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, key, or email" /></label>
                <label>Program<select value={program} onChange={(event) => setProgram(event.target.value)}><option value="CPP">CPP</option><option value="BAI">BAI</option><option value="UXD">UXD</option><option value="ALL">All</option></select></label>
                <label>Intake<select value={intake} onChange={(event) => setIntake(event.target.value)}><option value="2027-WINTER">2027 Winter</option><option value="2027-FALL">2027 Fall</option><option value="ALL">All</option></select></label>
                <label className="toggle"><input type="checkbox" checked={consentedOnly} onChange={(event) => setConsentedOnly(event.target.checked)} /><span />OptedIn only</label>
              </div>
              <div className="tableWrap"><table><thead><tr><th>Contact</th><th>Program</th><th>Stage</th><th>Consent</th><th>Application</th></tr></thead><tbody>{filteredRecords.map((item) => <tr key={item.id}><td><strong>{formatName(item.firstName, item.lastName)}</strong><small>{item.contactKey || "Missing ContactKey"}</small></td><td>{item.programCode}<small>{item.intake}</small></td><td><span className={`status ${statusClass(item.stage)}`}>{item.stage}</span></td><td><span className={`status ${statusClass(item.consentStatus)}`}>{item.consentStatus}</span></td><td>{item.applicationStatus}</td></tr>)}</tbody></table>{filteredRecords.length === 0 && <p className="emptyState">No records match these filters.</p>}</div>
            </div>
          )}
        </div>
      </section>

      <section className="personalization section">
        <div className="sectionHead">
          <div><p className="eyebrow">CONTENT BUILDER CONCEPTS</p><h2>Personalization with safe fallbacks.</h2></div>
          <label className="emailSelect">Preview as<select value={emailId} onChange={(event) => setEmailId(event.target.value)}>{records.map((item) => <option key={item.id} value={item.id}>{formatName(item.firstName, item.lastName)} · {item.preferredLanguage}</option>)}</select></label>
        </div>
        <div className="emailLab">
          <div className="emailFrame">
            <div className="emailChrome"><span /><span /><span /><b>Personalized email preview</b></div>
            <div className="emailHeader"><span>PATHWAYS</span><small>{isFrench ? "Admissions et programmes" : "Admissions & programs"}</small></div>
            <div className="emailBody">
              <p className="preheader">{isFrench ? `Votre prochaine étape pour ${programName}` : `Your next step for ${programName}`}</p>
              <h3>{isFrench ? `Bonjour ${firstName},` : `Hi ${firstName},`}</h3>
              <p>{isFrench ? `Vous avez manifesté de l’intérêt pour ${programName}. Joignez-vous à notre séance d’information pour rencontrer l’équipe et obtenir des réponses.` : `You showed interest in ${programName}. Join our information session to meet the program team and get your questions answered.`}</p>
              <a href="#email-note">{emailContact.eventRegistered ? (isFrench ? "Voir les détails de votre inscription" : "View your registration details") : (isFrench ? "Réserver ma place" : "Reserve my spot")}</a>
              <small id="email-note">{emailContact.eventRegistered ? "Registration detected: repeated signup CTA suppressed." : "CTA selected from the event-interest branch."}</small>
            </div>
            <footer>Preference centre · Unsubscribe · Sender identity and mailing address</footer>
          </div>
          <div className="ampPane"><div className="codeBar"><span>program-event-invite.html</span><b>AMPSCRIPT</b></div><pre><code>{ampscriptSample}</code></pre><aside><strong>Rendered values</strong><div><span>FirstName</span><code>{emailContact.firstName || "∅ → there"}</code></div><div><span>ProgramName</span><code>{emailContact.programName || "∅ → selected program"}</code></div><div><span>Language</span><code>{emailContact.preferredLanguage}</code></div><div><span>EventRegistered</span><code>{String(emailContact.eventRegistered)}</code></div></aside></div>
        </div>
      </section>

      <section className="measurement section">
        <div className="sectionHead lightHead"><div><p className="eyebrow">MEASUREMENT FRAMEWORK</p><h2>Optimize the funnel, not just the send.</h2></div><p>Operational health and recruitment outcomes belong in the same view.</p></div>
        <div className="measurementGrid">
          <div className="funnelCard"><h3>Inquiry → enrolment</h3>{[
            ["Source prospects", records.length, 100], ["Journey-ready", segment.length, Math.round(segment.length / records.length * 100)], ["Event registered", eventRegistrations, Math.round(eventRegistrations / records.length * 100)], ["Application activity", applications, Math.round(applications / records.length * 100)], ["Enrolled", records.filter((item) => item.stage === "Enrolled").length, Math.round(records.filter((item) => item.stage === "Enrolled").length / records.length * 100)],
          ].map(([label, value, percent]) => <div className="funnelRow" key={String(label)}><span>{label}</span><div><i style={{ width: `${Math.max(Number(percent), 4)}%` }} /></div><strong>{value}</strong><small>{percent}%</small></div>)}</div>
          <div className="healthCard"><h3>Activation health</h3><div className="healthScore"><strong>{records.length - quality.invalidEmails - quality.missingKeys - quality.unknownConsent}</strong><span>usable identities</span></div><ul><li><b>{quality.invalidEmails}</b><span>invalid emails</span></li><li><b>{quality.missingKeys}</b><span>missing keys</span></li><li><b>{quality.duplicateKeys}</b><span>duplicate key groups</span></li><li><b>{quality.unknownConsent}</b><span>unknown consent</span></li></ul></div>
          <aside className="metricNotes"><span>MEASURE TO ACTION</span><h3>Each metric has an owner and a decision.</h3><p>Delivery and data-quality issues route to operations. Click and event behavior inform content. Application and enrolment outcomes inform journey design.</p><div><b>Operational</b><small>Invalid email · duplicate identity · failed mapping</small></div><div><b>Engagement</b><small>Delivery · click · unsubscribe · event registration</small></div><div><b>Outcome</b><small>Application start · submission · enrolment</small></div></aside>
        </div>
      </section>

      <section className="architecture section" id="architecture">
        <div className="sectionHead"><div><p className="eyebrow">SOLUTION ARCHITECTURE</p><h2>Clear ownership at every layer.</h2></div><p>The simulator mirrors the responsibilities of a real implementation without pretending to be connected to Salesforce.</p></div>
        <div className="architectureFlow">
          {[
            ["01", "Institutional CRM", "Source of truth", "Contact identity, program interest, application and enrolment status"],
            ["02", "Data extensions", "Journey-ready model", "Prospects, interests, events, applications, consent history"],
            ["03", "Automation Studio", "Prepare + protect", "SQL segmentation, deduplication, quality and consent gates"],
            ["04", "Journey Builder", "Orchestrate", "Timing, decision splits, suppression, exit and transition logic"],
            ["05", "Measurement", "Learn + improve", "Data health, engagement, funnel progression and drop-off"],
          ].map(([number, title, role, text]) => <article key={number}><span>{number}</span><small>{role}</small><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="artifactLinks"><a href="/sample-data/students.csv" download>Download sample data <span>↓</span></a><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub-ready source structure <span>↗</span></a></div>
      </section>

      <footer className="siteFooter">
        <div><span className="brandMark">PC</span><p><strong>SFMC Student Recruitment Journey Simulator</strong><small>Personal portfolio project by Pek Chansatit</small></p></div>
        <p>This independent educational project is not built for, endorsed by, or connected to Seneca Polytechnic or Salesforce. All people, email addresses, and metrics are synthetic.</p>
        <div className="sourceLinks"><a href="https://help.salesforce.com/s/articleView?id=mktg.mc_as_using_the_query_activity.htm&type=5" target="_blank" rel="noreferrer">SQL Query Activities ↗</a><a href="https://developer.salesforce.com/docs/marketing/marketing-cloud-ampscript/guide/mc-ampscript-get-started-learning-lesson-2.html" target="_blank" rel="noreferrer">AMPscript fallbacks ↗</a></div>
      </footer>
    </main>
  );
}
