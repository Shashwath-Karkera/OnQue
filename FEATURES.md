# ONcue — Feature List

**One line:** A payment-intelligence platform that turns invoice and payment history into risk scores, predictions, and practical guidance so contractors know who they're working with before they start.

Priority tags: **P0** = MVP, must exist for the product to make sense · **P1** = next, makes it competitive · **P2** = later, scale / network effects.

---

## 1. Accounts & Onboarding

| # | Feature | P |
|---|---------|---|
| 1.1 | Email + password auth, Google OAuth, password reset, email verification | P0 |
| 1.2 | Contractor profile: business name, trade/category, region, currency, default payment terms (Net 15/30/45), default deposit % | P0 |
| 1.3 | Onboarding wizard: profile → import or add first client → add first invoice | P0 |
| 1.4 | **Historical data import** — CSV upload of past invoices/payments, or a short "past experience" backfill form per client. Without this the risk engine has nothing to score on day one | P0 |
| 1.5 | Team accounts: multiple users per business, roles (owner / admin / staff), per-user activity attribution | P2 |
| 1.6 | Account settings: notification prefs, invoice branding/logo, tax settings, data export, delete account | P1 |

## 2. Client Directory

| # | Feature | P |
|---|---------|---|
| 2.1 | Search before create — look up a client in the registry before adding a new record, so history attaches to the right entity | P0 |
| 2.2 | Add client: name, company, type (individual / business / general contractor / property manager / builder), phone, email, billing address, optional tax/registration ID | P0 |
| 2.3 | Client profile page: risk score + band, payment stats, invoice list, event timeline, notes, attachments | P0 |
| 2.4 | **Identity matching / dedup** — fuzzy match on name + phone + email + address; merge duplicate client records; keep an alias list. This is the backbone of any shared history | P0 |
| 2.5 | Private notes and file attachments (contract, quote, correspondence) per client | P0 |
| 2.6 | Tags / segments (residential, commercial, repeat, watchlist), archive client | P1 |
| 2.7 | Business verification — optional lookup against a company registry to confirm the entity is real | P2 |
| 2.8 | Client-side record view: the client can see and respond to their own payment record | P2 |

## 3. Projects / Jobs

| # | Feature | P |
|---|---------|---|
| 3.1 | Create project under a client: title, scope, contract value, start/expected end, payment terms | P0 |
| 3.2 | Status lifecycle: quoted → accepted → in progress → completed → closed / cancelled | P0 |
| 3.3 | Milestone / progress-billing schedule with % or fixed amounts per milestone | P1 |
| 3.4 | Change orders — scope and value adjustments with their own approval + billing trail | P1 |
| 3.5 | Retainage tracking (amount withheld, release date, release status) | P1 |
| 3.6 | Project profitability view: contract value vs collected vs outstanding vs costs | P2 |

## 4. Invoicing & Payment Tracking — the data engine

Everything the AI does depends on this being clean and structured.

| # | Feature | P |
|---|---------|---|
| 4.1 | Create invoice: number, client, project, line items, amounts, tax, issue date, due date or terms, notes | P0 |
| 4.2 | Invoice statuses: draft, sent, viewed, partially paid, paid, overdue, disputed, written off | P0 |
| 4.3 | **Record payments, including partial** — amount, date received, method, reference; multiple payments per invoice with running balance | P0 |
| 4.4 | Auto-computed metrics per invoice: days late, % collected, outstanding balance, number of follow-ups | P0 |
| 4.5 | **Payment event timeline** — reminder sent, client viewed, promise-to-pay made (with promised date), promise kept/broken, dispute raised, dispute resolved, partial received, written off. The event log is what makes behavior analyzable, not just the final paid date | P0 |
| 4.6 | Deposits / advance payments tracked against the project, not just the invoice | P0 |
| 4.7 | Invoice PDF generation, email send, and public view link | P1 |
| 4.8 | Automated reminder schedule: pre-due nudge, on-due, +3, +7, +14, +30 days, configurable per client risk band | P1 |
| 4.9 | Late fees / interest rules, applied automatically once past a grace period | P1 |
| 4.10 | Recurring invoices and retainers | P2 |
| 4.11 | Expenses / material costs per project, receipt capture | P2 |
| 4.12 | Dispute log: reason, amount contested, resolution, days-to-resolve | P1 |

## 5. Payment Risk Engine — the differentiator

| # | Feature | P |
|---|---------|---|
| 5.1 | **ONcue Score** — 0–100 per client plus a band (Low / Moderate / Elevated / High) | P0 |
| 5.2 | **Confidence indicator** — thin / moderate / strong data. A score from 2 invoices must not look like a score from 40. Non-negotiable for credibility | P0 |
| 5.3 | Score factor breakdown: which signals pushed the score up or down, with weights, in plain language | P0 |
| 5.4 | Signals computed from data: avg days-to-pay vs terms · on-time rate · variance/consistency of delay · partial-payment frequency · follow-ups needed per invoice · dispute rate · write-off rate · promise-kept rate · recency weighting · invoice-size sensitivity (pays small fast, large slow) · relationship length · outstanding exposure | P0 |
| 5.5 | Trend: improving / stable / deteriorating, with score history chart over time | P1 |
| 5.6 | **Prediction on a new/open invoice** — probability of on-time payment, expected days-to-pay range, expected collection date | P1 |
| 5.7 | Exposure limit suggestion: max outstanding you should carry with this client at once | P1 |
| 5.8 | Recalculation triggers on every payment event, plus a nightly batch | P0 |
| 5.9 | Peer benchmarking: this client vs similar clients by type, region, trade, invoice size | P2 |
| 5.10 | Model versioning + backtesting harness — replay historical data to check whether predictions were actually right, and track calibration | P2 |
| 5.11 | Cold-start priors by client type and terms, clearly labeled as a baseline, not a verdict | P1 |
| 5.12 | Guardrails: framed as an informational indicator, never a blacklist or a verdict; no "do not work with" language; disclaimers that this is not a credit report or credit decision | P0 |

## 6. AI Layer

The AI reads structured data and produces judgment, not chat for its own sake.

| # | Feature | P |
|---|---------|---|
| 6.1 | **Client risk briefing** — plain-language summary of payment behavior: what the pattern is, what's driving it, what to watch for | P0 |
| 6.2 | **Pre-engagement advisor** — "Should I take this job?" Input job value, duration, and proposed terms; get a tailored recommendation: deposit %, milestone split, Net terms, max exposure, contract clauses to insist on | P0 |
| 6.3 | Recommended payment terms generator, auto-applied as defaults when invoicing that client | P1 |
| 6.4 | Pattern & anomaly detection in prose: seasonal slowdowns, size thresholds, post-completion payment drop-off, deterioration after a specific date | P1 |
| 6.5 | **Follow-up message drafting** — escalation ladder from polite reminder to firm notice to final demand, tone matched to relationship history and days overdue; email + SMS + WhatsApp variants | P1 |
| 6.6 | Portfolio-level insights: cash-flow risk concentration, "3 clients hold 60% of your outstanding", which overdue invoice to chase first | P1 |
| 6.7 | Explainability: every claim cites the specific invoices, dates, and events behind it | P0 |
| 6.8 | Natural-language Q&A over the contractor's own data ("who owes me most and pays slowest?") — useful, but not the headline feature | P2 |
| 6.9 | Weekly AI digest email: what changed, what needs attention, what to do this week | P1 |
| 6.10 | Guardrails: never invent numbers, always state confidence and data limits, always leave the decision with the contractor | P0 |

## 7. Dashboard

| # | Feature | P |
|---|---------|---|
| 7.1 | Cash summary: total outstanding, total overdue, expected in next 30 days | P0 |
| 7.2 | Aging buckets: current, 1–30, 31–60, 61–90, 90+ days | P0 |
| 7.3 | **Attention queue** — overdue invoices ranked by risk × amount, each with a one-click recommended action | P0 |
| 7.4 | Upcoming payments list / calendar view | P0 |
| 7.5 | Client risk distribution across the portfolio | P1 |
| 7.6 | AI briefing card at the top: 2–3 sentences on what matters today | P1 |
| 7.7 | Recent activity feed (payments received, invoices sent, score changes) | P0 |
| 7.8 | KPI strip: avg days-to-pay, on-time %, collection rate, DSO trend | P1 |

## 8. Alerts & Notifications

| # | Feature | P |
|---|---------|---|
| 8.1 | Invoice due soon, invoice overdue, escalating overdue alerts | P0 |
| 8.2 | Risk score change on a client with active work or open invoices | P1 |
| 8.3 | Exposure limit breached with a client | P1 |
| 8.4 | Promise-to-pay date missed | P1 |
| 8.5 | Channels: in-app, email, push; daily/weekly digest instead of per-event | P1 |
| 8.6 | Per-client mute / snooze | P2 |

## 9. Reporting & Export

| # | Feature | P |
|---|---------|---|
| 9.1 | Client payment history report (PDF) — shareable, attachable to a bid or dispute | P1 |
| 9.2 | Aging report, collections report, invoiced vs collected by period | P1 |
| 9.3 | CSV / Excel export of clients, invoices, payments | P0 |
| 9.4 | Tax-period summary for the accountant | P2 |
| 9.5 | Audit log of record edits (who changed what, when) | P1 |

## 10. Shared Payment Intelligence Network

The long-term moat, and the riskiest part. Build it deliberately, not early.

| # | Feature | P |
|---|---------|---|
| 10.1 | Opt-in contribution: contractors share anonymized payment metrics on a client, not names or free text | P2 |
| 10.2 | **Aggregation threshold** — network signals only surface once N independent contractors (3+) have data, protecting anonymity and reducing defamation exposure | P2 |
| 10.3 | **Structured experience ratings instead of written reviews**: communication responsiveness, follow-ups required, dispute behavior, terms adherence — fixed scales, defensible and analyzable | P2 |
| 10.4 | Network view on a client profile: aggregate on-time rate, avg delay, contributor count, date range — no identifying details | P2 |
| 10.5 | Dispute & correction process: a client can contest their aggregate record; flagged data is quarantined pending review | P2 |
| 10.6 | Abuse prevention: only invoice-backed data counts, rate limits, no free-text naming, anomaly detection on contributors | P2 |

## 11. Integrations

| # | Feature | P |
|---|---------|---|
| 11.1 | CSV import/export of invoices and payments | P0 |
| 11.2 | Payment collection: Stripe / Razorpay / PayPal payment links on invoices, with auto-reconciliation of received payments | P1 |
| 11.3 | Accounting sync: QuickBooks, Xero, Zoho Books — two-way invoice and payment sync | P2 |
| 11.4 | Bank feed for automatic payment detection | P2 |
| 11.5 | Gmail / Outlook: send invoices and reminders from the contractor's own address, thread tracking | P1 |
| 11.6 | Calendar sync for due dates and milestone dates | P2 |
| 11.7 | Public REST API + webhooks | P2 |

## 12. Mobile / Field Use

| # | Feature | P |
|---|---------|---|
| 12.1 | Fully responsive web app usable one-handed on a phone | P0 |
| 12.2 | Quick actions: log a payment, add a client, snap a photo of a cheque or receipt | P1 |
| 12.3 | Installable PWA with offline queue for entries made without signal | P2 |
| 12.4 | Native app | P2 |

## 13. Trust, Privacy & Legal

| # | Feature | P |
|---|---------|---|
| 13.1 | Clear disclaimers: informational risk indicator, not a credit report, not a credit or adverse-action decision | P0 |
| 13.2 | Data ownership statement — the contractor owns their own records; explicit consent before anything is shared | P0 |
| 13.3 | Encryption at rest and in transit, role-based access, soft deletes, restore window | P0 |
| 13.4 | Rectification path for client data (correct or remove inaccurate records) | P1 |
| 13.5 | Region-aware privacy compliance (GDPR / India DPDP), data residency notes, retention policy | P1 |
| 13.6 | Terms of service and acceptable-use policy covering the shared network | P1 |

## 14. Admin & Internal Tooling

| # | Feature | P |
|---|---------|---|
| 14.1 | Admin console: users, client-record merges, dispute queue, abuse reports | P1 |
| 14.2 | Score model config: weights, thresholds, version history, rollback | P1 |
| 14.3 | Feature flags, product analytics, error monitoring | P1 |
| 14.4 | Prompt/response logging for the AI layer with quality review and cost tracking | P1 |

---

## Core Data Entities

```
User (contractor)
  └── Client ──────────── aliases[], matching keys, tags
        ├── Project ───── milestones[], change_orders[], retainage
        │     └── Invoice ── line_items[], due_date, terms, status
        │           ├── Payment[]        (amount, date, method)
        │           └── PaymentEvent[]   (reminder, promise, dispute, view)
        ├── RiskScore[]   (score, band, confidence, factors, computed_at)
        ├── Insight[]     (type, body, citations[], generated_at)
        └── Experience[]  (structured ratings — network layer)
```

---

## Build Order

**Phase 1 — MVP.** Auth, contractor profile, client directory with dedup, projects (light), invoices with partial payments and the event timeline, dashboard with aging and attention queue, rule-based score v1 with confidence labeling and factor breakdown, AI risk briefing + pre-engagement advisor, CSV history import, CSV export.

That is a complete, demoable product. Everything essential to the pitch is in it.

**Phase 2 — Competitive.** Automated reminders, payment links with reconciliation, AI follow-up drafting, prediction on open invoices, exposure limits, score trend and history, alerts, reports, weekly digest, mobile quick actions, email integration.

**Phase 3 — Moat.** Shared intelligence network with aggregation thresholds and structured ratings, peer benchmarking, ML prediction with backtesting and calibration, accounting integrations, client portal, public API.

---

## Four Things That Decide Whether This Works

1. **The cold-start problem is the real problem.** A risk score with no history is worthless and, worse, misleading. Historical import, structured backfill, and honest confidence labeling are not nice-to-haves — they are what make the first session valuable.
2. **Rich event data beats a clever model.** Two contractors both "paid late," but one made and broke three promises while the other paid quietly on day 40. Capturing promises, disputes, follow-ups, and views is what makes the AI say something a spreadsheet can't.
3. **Structured ratings, not written reviews.** Free-text reviews about named clients invite defamation claims and produce data you can't compute on. Fixed scales solve both problems at once.
4. **Framing is a product feature.** "Informational indicator with explained factors and stated confidence" is defensible. "Payment credit score" or a blacklist invites credit-reporting regulation in most jurisdictions. Keep the language and the UI on the right side of that line from day one.
