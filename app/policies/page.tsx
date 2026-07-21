import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Interactions from "@/components/Interactions";
import ContactFooter from "@/components/sections/ContactFooter";
import { PolicyPrintButton } from "@/components/policies/PolicyPrintButton";

export const metadata: Metadata = {
  title: "Data Privacy & Company Policies",
  description:
    "GooglixLabs' official Data Privacy & Company Policies document — Privacy Policy, Terms of Service, Cookie Policy, Refund & Cancellation Policy and Acceptable Use Policy, in one place for clients.",
  alternates: { canonical: "/policies" },
  openGraph: {
    title: "Data Privacy & Company Policies · GooglixLabs",
    description:
      "Everything clients need to know about how GooglixLabs handles data, contracts, refunds and acceptable use — in one document.",
    url: "/policies",
  },
};

function Section({
  n,
  id,
  title,
  children,
}: {
  n: string;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="gx-policy-section" style={{ padding: "56px 0", borderTop: "1px solid var(--line)" }}>
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 14,
        }}
      >
        ({n})
      </div>
      <h2
        style={{
          fontFamily: "var(--font-bricolage), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(1.5rem,3vw,2.1rem)",
          letterSpacing: "-.02em",
          color: "var(--ink)",
          margin: "0 0 26px",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-bricolage), sans-serif",
        fontWeight: 600,
        fontSize: 16,
        color: "var(--ink)",
        margin: "0 0 4px",
      }}
    >
      {children}
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 15, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
      {children}
    </p>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="gx-policy-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const toc = [
  { id: "privacy-policy", n: "01", label: "Privacy Policy" },
  { id: "terms-of-service", n: "02", label: "Terms of Service" },
  { id: "cookie-policy", n: "03", label: "Cookie Policy" },
  { id: "refund-cancellation", n: "04", label: "Refund & Cancellation Policy" },
  { id: "acceptable-use", n: "05", label: "Acceptable Use Policy" },
];

export default function PoliciesPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ position: "relative", zIndex: 2, padding: "140px clamp(20px,5vw,60px) 100px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <article className="gx-policy-card">
              {/* Letterhead */}
              <div
                className="gx-policy-header-band"
                style={{
                  padding: "clamp(32px,5vw,56px) clamp(24px,5vw,56px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 20,
                }}
              >
                <Image
                  src="/googlix_logo.png"
                  alt="GooglixLabs"
                  width={1536}
                  height={1024}
                  priority
                  style={{ width: "min(280px,60%)", height: "auto" }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "rgba(244,243,238,.55)",
                      marginBottom: 12,
                    }}
                  >
                    Company Document
                  </div>
                  <h1
                    style={{
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.8rem,4.5vw,2.8rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-.02em",
                      color: "var(--paper)",
                      margin: "0 0 12px",
                    }}
                  >
                    Data Privacy &{" "}
                    <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                      Company Policies
                    </span>
                  </h1>
                  <p
                    style={{
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontSize: 14.5,
                      color: "rgba(244,243,238,.75)",
                      maxWidth: "48ch",
                      margin: "0 auto",
                    }}
                  >
                    Prepared for clients and website visitors of GooglixLabs — how we handle your
                    data, what our engagements include, and what to expect if a project needs to
                    change course.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px 20px",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11.5,
                    color: "rgba(244,243,238,.6)",
                  }}
                >
                  <span>Effective date: 21 July 2026</span>
                  <span>Last updated: 21 July 2026</span>
                  <span>Version 1.0</span>
                </div>
                <PolicyPrintButton />
              </div>

              {/* Table of contents */}
              <div style={{ padding: "clamp(28px,5vw,48px) clamp(24px,5vw,56px) 0" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 16,
                  }}
                >
                  Contents
                </div>
                <nav className="gx-policy-toc">
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} data-cursor>
                      <span style={{ fontFamily: "var(--font-mono), monospace", color: "var(--muted)" }}>({item.n})</span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div style={{ padding: "0 clamp(24px,5vw,56px) clamp(40px,6vw,64px)" }}>
                {/* 01 — Privacy Policy */}
                <Section n="01" id="privacy-policy" title="Privacy Policy">
                  <div>
                    <SubHeading>Who we are</SubHeading>
                    <List
                      items={[
                        <><strong>Business:</strong> GooglixLabs</>,
                        <><strong>Location:</strong> Raipur, Chhattisgarh, India</>,
                        <><strong>Email:</strong> googlixlabs@gmail.com</>,
                        <><strong>Phone:</strong> +91 70004 98574</>,
                        "GooglixLabs is the data controller for information collected through the site, and data processor for project materials clients share with us.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>What data we collect</SubHeading>
                    <List
                      items={[
                        <><strong>Contact & consultation requests</strong> — sent via email or phone, containing whatever you choose to share. This goes straight to our inbox; it is never routed through or stored on a server-side database.</>,
                        <><strong>Project materials</strong> — documents, brand assets and access credentials a client shares with us to deliver a project.</>,
                        <><strong>Free-tool inputs</strong> — data typed into our calculators and generators is saved only in your own browser&apos;s <code>localStorage</code>. It is never transmitted to or stored on GooglixLabs&apos; servers.</>,
                        <><strong>Live visitor counter</strong> — your browser sends a random, anonymous session ID to show a live &quot;people browsing&quot; count. It is not linked to your identity and is auto-deleted after 30 seconds of inactivity.</>,
                        <><strong>Standard infrastructure logs</strong> — our hosting provider may log routine technical data (IP, browser type, timestamps) for security and reliability, as any website host does.</>,
                        <><strong>What we don&apos;t collect</strong> — no Google Analytics, Meta Pixel or ad-tracking scripts, no marketing cookies, no server-side database of form submissions or tool inputs, and we never sell personal data.</>,
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Why we collect it, and who sees it</SubHeading>
                    <List
                      items={[
                        "Contact details are used only to respond to your enquiry and scope a project.",
                        "Project materials are used only to deliver the contracted work.",
                        "We do not sell, rent or trade personal data, ever.",
                        <>Infrastructure providers (Netlify for hosting, Upstash for the visitor counter) process minimal data strictly to run the site — never for their own marketing.</>,
                        "We may disclose information if required by Indian law, a court order, or to protect the rights and safety of GooglixLabs, clients or the public.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>How long we keep it</SubHeading>
                    <List
                      items={[
                        "Free-tool inputs: stay only in your browser, for as long as you keep them there.",
                        "Presence session IDs: purged after 30 seconds.",
                        "Enquiry emails: kept only as long as reasonably needed to manage the relationship, typically no more than 3 years after last contact.",
                        "Client project materials: kept for the engagement plus a reasonable handover period, then deleted or returned on request.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Your rights</SubHeading>
                    <List
                      items={[
                        <><strong>Access</strong> — request a copy of what we hold about you.</>,
                        <><strong>Correct</strong> — ask us to fix inaccurate information.</>,
                        <><strong>Delete</strong> — request erasure of your enquiry/contact data.</>,
                        <><strong>Withdraw consent</strong> — ask us to stop contacting you.</>,
                        <><strong>Object or restrict</strong> — object to a specific use of your data.</>,
                        <><strong>Portability</strong> — request your data in a portable format, where applicable.</>,
                        <>To exercise any of these, email <strong>googlixlabs@gmail.com</strong> with the subject &quot;Privacy Request.&quot; We respond within 30 days.</>,
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Grievance officer (Digital Personal Data Protection Act, 2023)</SubHeading>
                    <List
                      items={[
                        "Grievance Officer: GooglixLabs Support Team",
                        "Email: googlixlabs@gmail.com — Phone: +91 70004 98574",
                        "Response time: within 30 days of receipt",
                      ]}
                    />
                  </div>

                  <Para>
                    Full detail on international processing, children&apos;s privacy and security
                    measures is available on request, or in the extended Privacy Policy document
                    GooglixLabs keeps on file.
                  </Para>
                </Section>

                {/* 02 — Terms of Service */}
                <Section n="02" id="terms-of-service" title="Terms of Service">
                  <div>
                    <SubHeading>Who these terms apply to</SubHeading>
                    <List
                      items={[
                        "Visitors — anyone browsing the site or using our free tools.",
                        "Clients — businesses engaging paid Services under a separate proposal or contract. Where a signed proposal conflicts with this document, the signed proposal governs that engagement.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Free tools — provided &quot;as is&quot;</SubHeading>
                    <List
                      items={[
                        "Calculators and generators are free and for general guidance only — not professional financial, legal, tax or accounting advice.",
                        "Always verify figures — especially tax calculations — with a qualified professional before relying on them.",
                        "Tool inputs are stored only in your browser; GooglixLabs is not responsible for data lost from clearing browser storage or switching devices.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Paid engagements</SubHeading>
                    <List
                      items={[
                        <><strong>Scope</strong> — deliverables, timeline and price are confirmed in writing before work begins.</>,
                        <><strong>Client responsibilities</strong> — timely feedback, content and access needed to deliver the project; delays here may extend timelines.</>,
                        <><strong>Payments</strong> — schedule and methods are set out in the proposal/invoice; late payment may pause work.</>,
                        <><strong>Revisions</strong> — included rounds are specified per project; extra rounds may be billed separately.</>,
                        <><strong>Third-party costs</strong> — domains, hosting, premium themes/plugins, stock media and ad spend are separate from our fees unless bundled in the quote.</>,
                        <><strong>Ownership</strong> — on full payment, ownership of final deliverables transfers to the client, excluding third-party licensed assets and GooglixLabs&apos; own reusable tools/frameworks.</>,
                        <><strong>Portfolio rights</strong> — unless confidentiality is requested in writing, GooglixLabs may showcase completed work in its own portfolio.</>,
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>No guaranteed results</SubHeading>
                    <List
                      items={[
                        "We do not guarantee specific rankings, traffic, conversions or revenue — these depend on factors outside our control.",
                        "Figures in tools or proposals (e.g. sample ROI calculations) are illustrative estimates, not promises.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Liability & governing law</SubHeading>
                    <List
                      items={[
                        "GooglixLabs is not liable for indirect or consequential damages arising from Site or tool use.",
                        "For paid Services, total liability is limited to the amount paid for the specific engagement giving rise to the claim.",
                        "Governed by the laws of India; disputes fall under the exclusive jurisdiction of the courts of Raipur, Chhattisgarh, unless a signed client contract states otherwise.",
                      ]}
                    />
                  </div>
                </Section>

                {/* 03 — Cookie Policy */}
                <Section n="03" id="cookie-policy" title="Cookie Policy">
                  <Para>
                    Cookies are small text files a site can ask your browser to store. We also use{" "}
                    <code>localStorage</code>, which — unlike a cookie — is never automatically sent
                    to any server.
                  </Para>

                  <div style={{ overflowX: "auto" }}>
                    <table className="gx-policy-table">
                      <thead>
                        <tr>
                          <th>Technology</th>
                          <th>Used for</th>
                          <th>Sent to our servers?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Browser localStorage (<code>gx_tool_*</code>)</td>
                          <td>Remembering your inputs in free tools between visits</td>
                          <td>No — stays on your device</td>
                        </tr>
                        <tr>
                          <td>Anonymous session ID</td>
                          <td>Powering the live visitor counter</td>
                          <td>Yes — random ID only, deleted after 30 seconds</td>
                        </tr>
                        <tr>
                          <td>Hosting-level cookies (Netlify)</td>
                          <td>Basic site delivery & security</td>
                          <td>Handled by Netlify as standard hosting</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <SubHeading>What we don&apos;t use</SubHeading>
                    <List
                      items={[
                        "No advertising or retargeting cookies.",
                        "No third-party analytics cookies (e.g. Google Analytics, Meta Pixel).",
                        "No cross-site tracking cookies.",
                        "No cookie that identifies you personally across sessions or websites.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Managing storage</SubHeading>
                    <List
                      items={[
                        "Clear localStorage anytime via your browser's Settings → Privacy/Site Data → googlixlabs.com → Clear.",
                        "Browsing in private/incognito mode means tool inputs won't persist between visits.",
                        "If we ever add analytics or advertising cookies, we will update this policy first and show a consent banner where legally required.",
                      ]}
                    />
                  </div>
                </Section>

                {/* 04 — Refund & Cancellation Policy */}
                <Section n="04" id="refund-cancellation" title="Refund & Cancellation Policy">
                  <Para>
                    Applies to paid Services only — free tools are provided at no cost and are not
                    subject to refunds. Refunds are handled case-by-case, in good faith, based on
                    work actually completed.
                  </Para>

                  <div>
                    <SubHeading>Deposits</SubHeading>
                    <List
                      items={[
                        "Most projects begin with an agreed advance (typically 40–50% of the total fee).",
                        "The deposit is non-refundable once work has started, except where GooglixLabs fails to begin work within the agreed timeline through no fault of the client.",
                      ]}
                    />
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <SubHeading>Cancellation by the client</SubHeading>
                    <table className="gx-policy-table" style={{ marginTop: 12 }}>
                      <thead>
                        <tr>
                          <th>When cancelled</th>
                          <th>Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Before any work has started</td>
                          <td>Full refund of deposit, minus transaction fees already incurred</td>
                        </tr>
                        <tr>
                          <td>After planning starts, before first draft</td>
                          <td>Deposit retained for work completed; balance beyond that refunded</td>
                        </tr>
                        <tr>
                          <td>After first draft/milestone delivered</td>
                          <td>Billed for work completed to date; remaining unbilled balance refunded</td>
                        </tr>
                        <tr>
                          <td>After project completion & handover</td>
                          <td>No refund — the Service has been fully delivered</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <SubHeading>Revisions vs. refunds</SubHeading>
                    <List
                      items={[
                        "Requesting revisions within the agreed rounds is not grounds for a refund.",
                        "If dissatisfied after all included revisions, we first attempt an additional good-faith revision before any refund discussion.",
                        "Change-of-mind requests after work is built to the agreed brief are treated as new scope, billed separately.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Non-refundable third-party costs</SubHeading>
                    <List
                      items={[
                        "Domain registration and hosting fees already paid to a provider.",
                        "Premium themes, plugins, stock photography or licensed fonts.",
                        "Paid advertising spend already spent with the ad platform.",
                        "Payment gateway/transaction processing fees.",
                      ]}
                    />
                  </div>

                  <Para>
                    To request a refund, email <strong>googlixlabs@gmail.com</strong> with your
                    invoice/project reference. We acknowledge within 3 business days; approved
                    refunds are issued within 7–14 business days.
                  </Para>
                </Section>

                {/* 05 — Acceptable Use Policy */}
                <Section n="05" id="acceptable-use" title="Acceptable Use Policy">
                  <div>
                    <SubHeading>Prohibited activities</SubHeading>
                    <List
                      items={[
                        "Breaking the law — fraud, money laundering, tax evasion, impersonation, or anything illegal under Indian law or your jurisdiction.",
                        "Generating fraudulent documents — e.g. invoices for goods/services never rendered, fake GST numbers, or documents meant to deceive a third party or authority.",
                        "Abusing the QR Code or WhatsApp Link generators to point to phishing pages, malware, or unsolicited bulk messaging.",
                        "Attacking or overloading our infrastructure — denial-of-service attempts, excessive scraping, or bypassing access controls.",
                        "Reverse-engineering, copying or reselling our tools, guides or code as a competing product.",
                        "Impersonating GooglixLabs, another business, or any person.",
                        "Using the GooglixLabs name or logo without permission, or claiming an affiliation that doesn't exist.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Client project conduct</SubHeading>
                    <List
                      items={[
                        "Clients agree not to request content that is defamatory, discriminatory, obscene, or promotes illegal activity.",
                        "Clients must hold the necessary rights/licenses for any content or brand assets provided to us for use in a project.",
                        "Any credentials/access granted to GooglixLabs must be used solely for the agreed project scope.",
                      ]}
                    />
                  </div>

                  <div>
                    <SubHeading>Enforcement</SubHeading>
                    <List
                      items={[
                        "We may restrict access, refuse or terminate an engagement, or report illegal activity to the appropriate authorities if these rules are violated.",
                        <>Report abuse to <strong>googlixlabs@gmail.com</strong>.</>,
                      ]}
                    />
                  </div>
                </Section>

                <hr className="gx-policy-divider" />

                {/* Closing / contact block */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <SubHeading>Questions about this document</SubHeading>
                  <Para>
                    This document is GooglixLabs&apos; official Data Privacy & Company Policies
                    reference for clients and website visitors. For anything not covered here, or
                    to request the extended standalone versions of any section, contact us:
                  </Para>
                  <List
                    items={[
                      <><strong>Email:</strong> googlixlabs@gmail.com</>,
                      <><strong>Phone:</strong> +91 70004 98574</>,
                      <><strong>Location:</strong> Raipur, Chhattisgarh, India</>,
                    ]}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11.5,
                      color: "var(--muted)",
                      margin: "20px 0 0",
                    }}
                  >
                    © {new Date().getFullYear()} GooglixLabs — Version 1.0, effective 21 July 2026.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <ContactFooter />
      <Interactions />
    </>
  );
}
