/* ============================================================
   F2AI Demo Walkthrough — Step-Through Controller
   Fixed bottom tray with < > arrows, expand/collapse dialog,
   and scene descriptions from F2AI-Demo-Script-v2.
   ============================================================ */

(function() {
  'use strict';

  // ── Step Definitions ──────────────────────────────────────
  // Each step: { id, page, act, scene, title, persona, desc, dialog, clickTarget?, clickLabel? }
  // desc = short summary shown in collapsed tray
  // dialog = full narration from F2AI-Demo-Script-v2, shown when expanded
  const steps = [
    {
      id: 'intro',
      page: 'splash',
      act: 0, scene: '\u2014',
      title: 'Welcome',
      persona: '',
      desc: 'Welcome to the F2AI prototype demo. We\u2019ll follow RFQ-2026-0147 \u2014 12 pump mounting brackets in HY-80 for DDG-51 Flight III \u2014 from discovery through shipyard acceptance.',
      dialog: 'It\u2019s a Tuesday morning at Bayside Precision \u2014 a 48-person shop in Pascagoula that builds HY-80 weldments for Navy destroyers. A new RFQ just came in: 12 pump brackets for the DDG-51 program.\n\nWe\u2019re going to follow this single job through the entire F2AI platform \u2014 from the moment it lands on Maria\u2019s desk, all the way to shipyard acceptance.',
      clickTarget: '#splash-begin-btn', clickLabel: 'Begin Demo'
    },
    {
      id: '1.1',
      page: 'login-desktop',
      act: 1, scene: '1.1',
      title: 'Desktop Login',
      persona: 'Maria',
      desc: 'Maria starts her morning by logging into F2AI. The platform is web-based with SSO \u2014 no installs, no VPN headaches.',
      dialog: 'Maria logs in to start her day. Web-based, single sign-on \u2014 nothing to install.\n\n\u27A4 Enter credentials and click Sign In.',
      clickTarget: '#page-login-desktop .btn-primary', clickLabel: 'Sign In'
    },
    {
      id: '1.2a',
      page: 'dashboard',
      act: 1, scene: '1.2',
      title: 'Dashboard',
      persona: 'Maria',
      desc: 'Maria\u2019s command center. KPIs across the top, and the AI-scored RFQ carousel below. Click the HII-Ingalls chip to filter.',
      dialog: 'Maria\u2019s dashboard. KPIs across the top, and down here \u2014 the smart part \u2014 F2AI has already scored incoming RFQs against Bayside\u2019s capabilities. Let\u2019s filter to her biggest customer.\n\n\u27A4 Click the HII-Ingalls filter chip.',
      clickTarget: '#page-dashboard .chip[data-yard="HII-Ingalls"]', clickLabel: 'HII-Ingalls chip'
    },
    {
      id: '1.2b',
      page: 'dashboard',
      act: 1, scene: '1.2',
      title: 'Dashboard \u2014 RFQ Carousel',
      persona: 'Maria',
      desc: 'The carousel filters instantly. Maria spots RFQ-2026-0147 with a 94/100 fit score. Click the card to open the RFQ Detail.',
      dialog: 'There it is. RFQ-0147 with a 94 out of 100 fit score. The platform is saying: you\u2019ve built similar parts before, profitably, and you have the certs. Let\u2019s open it up.\n\n\u27A4 Click the RFQ-2026-0147 card.',
      clickTarget: '#page-dashboard .rfq-card', clickLabel: 'RFQ-0147 card'
    ,
      callout: {"type":"ai","label":"AI-Scored RFQ Matching","text":"RFQ score based on drawing specific transformer ML model that can compare features in drawings and match past work to RFQs."}},
    {
      id: '1.3',
      page: 'rfq-detail',
      act: 1, scene: '1.3',
      title: 'RFQ Detail',
      persona: 'Maria',
      desc: 'Full RFQ breakdown with AI-powered Fit Analysis. Parsed RFQ data on the left, capability match and profitability projections on the right.',
      dialog: 'Full RFQ breakdown on one screen. Parsed data on the left, AI-powered fit analysis on the right. Let\u2019s scroll down to the really interesting part.\n\n\u27A4 Scroll down to see the ML Comparison Analysis.',
      clickTarget: null, clickLabel: ''
    },
    {
      id: '1.3a',
      page: 'rfq-detail',
      act: 1, scene: '1.3',
      title: 'RFQ Detail \u2014 ML Comparison',
      persona: 'Maria',
      desc: 'The ML engine extracted geometric features and found 3 similar past parts. Click the top match.',
      dialog: 'The ML Comparison Analysis. The platform extracted geometric features from the engineering drawings and found three similar past parts.\n\n\u27A4 Click J-2024-018 to expand its production process.',
      clickTarget: '#page-rfq-detail #rfq-comparison-table tbody tr:first-child', clickLabel: 'J-2024-018 — 92% match',
      callout: { type: 'ai', label: 'ML Feature Extraction', text: 'The platform\u2019s machine learning engine has extracted geometric and process features from the RFQ engineering drawings — weld joint types, material thickness, tolerance bands, hole patterns, mounting geometry. It compared those features against every part Bayside has manufactured.\n\nThe three closest matches: a pump bracket from 2024 (92% feature match), a bearing mount from 2023 (84%), and a valve support from 2025 (78%). For each match, F2AI generated an estimated production process based on actual shop floor data.' }
    },
    {
      id: '1.3b',
      page: 'rfq-detail',
      act: 1, scene: '1.3',
      title: 'RFQ Detail \u2014 Comparison Analysis',
      persona: 'Maria',
      desc: 'The ML engine generated an estimated production process from actual shop data on J-2024-018. This used to take Maria and Dave an afternoon. Click Start Bid.',
      dialog: 'F2AI generated an estimated production process from actual shop data on that prior job. This used to take Maria and Dave a full afternoon. Now it\u2019s instant \u2014 and grounded in real numbers. Let\u2019s start the bid.\n\n\u27A4 Click Start Bid.',
      clickTarget: '#at-start-bid, #at-right .btn-primary', clickLabel: 'Start Bid'
    },
    {
      id: '1.4a',
      page: '3d-quicklook',
      act: 1, scene: '1.4',
      title: '3D Quick Look',
      persona: 'Maria, Dave & Sarah',
      desc: 'Maria opens the 3D viewer to inspect the pump bracket. The browser-based viewer renders a navigable model directly from TDP drawings — no CAD software required.',
      dialog: 'Before diving into the estimate, Maria opens the 3D Quick Look \u2014 a browser-based viewer that renders the part directly from the TDP drawings. No CAD software needed.\n\n\u27A4 Orbit the 3D model.',
      clickTarget: '#page-3d-quicklook .card:first-child', clickLabel: '3D Viewer',
      callout: { type: 'ai', label: '3D Visualization — NeRF / Mesh / Omniverse', text: 'The 3D Quick Look is a browser-based viewer that renders a navigable model of the pump bracket directly from TDP drawings and available scan data. No CAD software required. The viewer uses NeRF, mesh, or Omniverse rendering depending on available source data.' }
    },
    {
      id: '1.4b',
      page: '3d-quicklook',
      act: 1, scene: '1.4',
      title: '3D Quick Look \u2014 Select Team',
      persona: 'Maria',
      desc: 'Maria wants quick input from the shop. She selects Dave Torres and Sarah Chen from the team list to share the 3D model for review.',
      dialog: 'She wants input from the shop, so she pulls up the share panel and selects Dave and Sarah.\n\n\u27A4 Select Dave Torres and Sarah Chen.',
      clickTarget: '#ql-team-list', clickLabel: 'Team list'
    },
    {
      id: '1.4c',
      page: '3d-quicklook',
      act: 1, scene: '1.4',
      title: '3D Quick Look \u2014 Message',
      persona: 'Maria',
      desc: 'Maria types a quick message asking Dave and Sarah for their input on weld hours and process.',
      dialog: 'Quick message asking for their take on weld hours and process.\n\n\u27A4 Type a message in the Share Quick Look message box.',
      clickTarget: '#ql-message', clickLabel: 'Message box'
    },
    {
      id: '1.4d',
      page: '3d-quicklook',
      act: 1, scene: '1.4',
      title: '3D Quick Look \u2014 Send Share',
      persona: 'Maria',
      desc: 'Maria clicks Send to share the Quick Look link with Dave and Sarah. They\u2019ll receive it in their F2AI notification panel.',
      dialog: 'She sends it off. Both get a notification with the full 3D model they can review on their own devices.\n\n\u27A4 Click Send.',
      clickTarget: '#ql-send-btn', clickLabel: 'Send'
    },
    {
      id: '1.4e',
      page: '3d-quicklook',
      act: 1, scene: '1.4',
      title: '3D Quick Look \u2014 Team Comments',
      persona: 'Dave & Sarah',
      desc: 'Dave flags the rear weld joint at 3.5 hrs/ea. Sarah notes NDT access on the inner flange. Maria adjusts the estimate before bidding.',
      dialog: 'Dave and Sarah respond. Dave adjusts the weld hours and Sarah flags an NDT concern.\n\n\u27A4 Show inline team comments.',
      clickTarget: '#page-3d-quicklook .badge-cyan', clickLabel: 'Team Comments'
    },
    {
      id: '1.5a',
      page: 'bid-workspace',
      act: 1, scene: '1.5',
      title: 'Bid Workspace \u2014 Routing',
      persona: 'Maria',
      desc: 'Three-column workspace where Maria does 80% of her quoting. The ML-estimated routing already includes Dave\u2019s adjusted 3.5 hr/ea weld hours from the Quick Look.',
      dialog: 'This is where the quoting magic happens. The Bid Workspace is designed so Maria can do 80% of her quoting work without leaving this screen. Three columns: left is the part and routing definition, center is the live cost rollup, and right is customer context and attachments.\n\nNotice the routing is already populated from the ML comparison analysis \u2014 but with Dave\u2019s adjusted weld hours (3.5 hrs/ea instead of 3.2) already baked in from the Quick Look feedback. Every change instantly updates the cost summary and margin calculation in the center column.\n\n\u27A4 Point to the routing showing the adjusted weld hours from Dave\u2019s Quick Look input.',
      clickTarget: '#routing-weld-row', clickLabel: 'Weld row (adjusted hours)'
    ,
      callout: {"type":"ai","label":"ML-Powered Bid Workspace","text":"F2AI prepopulates the routing based on ML comparison analysis and incorporating peer feedback. Cost and time estimates are auto-updated for review and submission."}},
    {
      id: '1.5b',
      page: 'bid-workspace',
      act: 1, scene: '1.5',
      title: 'Bid Workspace \u2014 Cost Summary',
      persona: 'Maria',
      desc: 'The live cost summary updates instantly as Maria adjusts routing. Direct Labor, Material, Overhead, and a 24.7% margin — all grounded in real shop data.',
      dialog: 'Cost summary updates in real time.\n\n\u27A4 Point to the cost summary.',
      clickTarget: '#page-bid-workspace .cost-card', clickLabel: 'Cost Summary'
    },
    {
      id: '1.5c',
      page: 'bid-workspace',
      act: 1, scene: '1.5',
      title: 'Bid Workspace \u2014 Compliance',
      persona: 'Maria',
      desc: 'Compliance chips show pass/fail status for ITAR, Weld Cert, NDT Req, and more — ensuring nothing gets missed before the quote goes out.',
      dialog: 'Quick compliance check \u2014\n\n\u27A4 Point to the compliance chips.',
      clickTarget: '#bid-compliance-chips', clickLabel: 'Compliance chips'
    },
    {
      id: '1.5d',
      page: 'bid-workspace',
      act: 1, scene: '1.5',
      title: 'Bid Workspace — Submit',
      persona: 'Maria',
      desc: 'All compliance checks pass. Maria clicks Submit for Approval to send the quote for internal review.',
      dialog: 'All clear. Maria submits for approval.\n\n\u27A4 Click Submit for Approval.',
      clickTarget: '#at-right .btn-primary', clickLabel: 'Submit for Approval'
    },
    {
      id: '1.6a',
      page: 'quote-output',
      act: 1, scene: '1.6',
      title: 'Quote Output \u2014 Review',
      persona: 'Maria',
      desc: 'F2AI auto-generates a professional quote document formatted to the shipyard\u2019s expected layout. This is v2, after adjusting weld hours from the Quick Look feedback.',
      dialog: 'Quote output \u2014 auto-generated, matching the shipyard\u2019s expected format.\n\n\u27A4 Point to the quote summary.',
      clickTarget: '#page-quote-output .card:first-child', clickLabel: 'Quote Header'
    ,
      callout: {"type":"ai","label":"Auto-Generated Quote","text":"F2AI quote preview is generated to match the shipyard format."}},
    {
      id: '1.6b',
      page: 'quote-output',
      act: 1, scene: '1.6',
      title: 'Quote Output \u2014 Approve',
      persona: 'Maria',
      desc: 'Maria approves the quote, marking it ready for submission. The internal approval workflow moves from Pending to Approved.',
      dialog: 'Maria reviews and approves. Full audit trail \u2014 who approved, when, which version.\n\n\u27A4 Click Approve.',
      clickTarget: '#at-right .btn-success', clickLabel: 'Approve Quote'
    },
    {
      id: '1.6c',
      page: 'quote-output',
      act: 1, scene: '1.6',
      title: 'Quote Output \u2014 Submit',
      persona: 'Maria',
      desc: 'Maria submits the quote to HII-Ingalls via email. F2AI generates the PDF and sends it to the buyer contact.',
      dialog: 'She submits the quote directly to HII-Ingalls.\n\n\u27A4 Click Generate & Send.',
      clickTarget: '#page-quote-output .btn-primary', clickLabel: 'Generate & Send'
    },
    {
      id: '1.7a',
      page: 'rfqs',
      act: 1, scene: '1.7',
      title: 'RFQs & Bids \u2014 List View',
      persona: 'Maria',
      desc: 'Maria manages her full bid portfolio from the RFQs & Bids page. The list view shows all active RFQs in a sortable table.',
      dialog: 'Back on the RFQ management page. Maria can see her full bid portfolio \u2014 RFQ-0147 now shows Submitted status.\n\n\u27A4 Point to RFQ-0147.',
      clickTarget: '#rfq-row-0147', clickLabel: 'RFQ-0147 row'
    },
    {
      id: '1.7b',
      page: 'rfqs',
      act: 1, scene: '1.7',
      title: 'RFQs & Bids \u2014 Toggle View',
      persona: 'Maria',
      desc: 'The grid toggle in the action tray switches between list and card views.',
      dialog: 'She can toggle between list and card view.\n\n\u27A4 Click the grid view toggle.',
      clickTarget: '#rfq-view-toggle .view-toggle-btn[data-view="cards"]', clickLabel: 'Grid view toggle'
    },
    {
      id: '1.7c',
      page: 'rfqs',
      act: 1, scene: '1.7',
      title: 'RFQs & Bids \u2014 Card View',
      persona: 'Maria',
      desc: 'Each card shows the RFQ ID, part description, shipyard, fit score, due date, and current status at a glance.',
      dialog: '\n\n\u27A4 Point to the RFQ-0147 card.',
      clickTarget: '#rfq-card-0147', clickLabel: 'RFQ-0147 card'
    },
    {
      id: '1.7d',
      page: 'rfqs',
      act: 1, scene: '1.7',
      title: 'RFQs & Bids \u2014 New RFQ',
      persona: 'Maria',
      desc: 'Maria clicks + New RFQ to open the capture form and enter a new request for quote.',
      dialog: 'While we wait on the award, let\u2019s see how new RFQs enter the system.\n\n\u27A4 Click + New RFQ.',
      clickTarget: '#at-right .btn-primary', clickLabel: '+ New RFQ'
    },
    {
      id: '1.8a',
      page: 'rfq-capture',
      act: 1, scene: '1.8',
      title: 'New RFQ Capture \u2014 Form',
      persona: 'Maria',
      desc: 'How new RFQs enter the system. Maria can manually enter structured fields — RFQ ID, Due Date, Shipyard, Program, line items.',
      dialog: 'The capture form \u2014 structured fields for manual entry. F2AI normalizes different shipyard formats into one consistent data model.\n\n\u27A4 Show the form fields.',
      clickTarget: '#page-rfq-capture .card:first-child', clickLabel: 'RFQ Details form'
    ,
      callout: {"type":"ai","label":"Unified Data Model","text":"F2AI normalizes different shipyard formats into one consistent data-model and allows the addition of unstructured data from other sources like email, slack etc."}},
    {
      id: '1.8b',
      page: 'rfq-capture',
      act: 1, scene: '1.8',
      title: 'New RFQ Capture \u2014 AI Extract',
      persona: 'Maria',
      desc: 'Or Maria can paste unstructured email text and let F2AI\u2019s AI parse it into structured fields. Attach RFQ PDFs and drawings for full extraction.',
      dialog: 'Or Maria can paste unstructured text from an email and let F2AI parse it automatically. She can also attach PDFs and drawings \u2014 the platform extracts everything it needs.\n\n\u27A4 Point to the Paste & Extract area.',
      clickTarget: '#page-rfq-capture .btn-primary', clickLabel: 'Extract Fields'
    ,
      callout: {"type":"ai","label":"Unified Data Model","text":"F2AI normalizes different shipyard formats into one consistent data-model and allows the addition of unstructured data from other sources like email, slack etc."}},
    {
      id: 'transition-1',
      page: 'rfq-capture',
      act: 1, scene: '\u2014',
      title: 'Three Weeks Pass\u2026',
      persona: '',
      desc: 'Three weeks pass. HII-Ingalls awards the contract to Bayside. Maria gets the notification and heads to Award Capture.',
      dialog: 'Three weeks pass. HII-Ingalls awards the contract to Bayside.',
      clickTarget: null, clickLabel: ''
    },
    // ── ACT 2: Award → Production Planning ──
    {
      id: '2.1a',
      page: 'award-capture',
      act: 2, scene: '2.1',
      title: 'Award Capture \u2014 Comparison',
      persona: 'Maria & Dave',
      desc: 'Maria records the award in F2AI. The system compares the award to the original quote and flags discrepancies in price or dates.',
      dialog: 'Maria records the award. The system automatically compares award terms against the original quote and flags any discrepancies.\n\n\u27A4 Show the award vs. quote comparison.',
      clickTarget: '#page-award-capture .card:nth-child(2)', clickLabel: 'Award vs Quote Comparison'
    },
    {
      id: '2.1b',
      page: 'award-capture',
      act: 2, scene: '2.1',
      title: 'Award Capture \u2014 Generate Jobs',
      persona: 'Maria & Dave',
      desc: 'One click generates Job J-2026-042, carrying forward the entire routing, materials, and requirements from the bid.',
      dialog: 'One click creates the job \u2014 carrying forward the entire routing, materials, and requirements from the bid. No re-typing. Dave gets notified.\n\n\u27A4 Click Generate Jobs.',
      clickTarget: '#page-award-capture .btn-success', clickLabel: 'Generate Jobs & RTW Packages'
    },
    {
      id: '2.2',
      page: 'jobs',
      act: 2, scene: '2.2',
      title: 'Jobs List',
      persona: 'Dave',
      desc: 'Dave sees J-2026-042 at the top of his Jobs list, status: Planned. All active and completed jobs with key dates and status badges.',
      dialog: 'Dave opens the Jobs List to find the new planned job to review and schedule.\n\n\u27A4 Click J-2026-042 to open the Job Overview.',
      clickTarget: '#job-row-042', clickLabel: 'J-2026-042 \u2014 Pump bracket'
    },
    {
      id: '2.3a',
      page: 'job-overview',
      act: 2, scene: '2.3',
      title: 'Job Overview \u2014 Operations',
      persona: 'Dave',
      desc: 'Single source of truth for the job: operation progress bar (Saw \u2192 CNC Mill \u2192 Weld \u2192 NDT \u2192 Final QA) with schedule and cost summaries.',
      dialog: 'Job Overview \u2014 single source of truth. Operation progress bar across the top, schedule and cost tracking below.\n\n\u27A4 Point to the step bar.',
      clickTarget: '#page-job-overview .step-bar', clickLabel: 'Operations step bar'
    },
    {
      id: '2.3b',
      page: 'job-overview',
      act: 2, scene: '2.3',
      title: 'Job Overview \u2014 RTW Checklist',
      persona: 'Dave',
      desc: 'RTW checklist confirms materials, traveler approval, and QA plan are all green before the job goes to the floor.',
      dialog: 'Ready-to-Work checklist \u2014 This job is ready.\n\n\u27A4 Point to the RTW checklist.',
      clickTarget: '#rtw-checklist-card', clickLabel: 'RTW Checklist'
    },
    {
      id: '2.3c',
      page: 'job-overview',
      act: 2, scene: '2.3',
      title: 'Job Overview \u2014 Traveler Tab',
      persona: 'Dave',
      desc: 'Dave clicks the Traveler tab to review the digital work package for this job.',
      dialog: '\n\n\u27A4 Click the Traveler tab.',
      clickTarget: '#page-job-overview .seg-btn:nth-child(2)', clickLabel: 'Traveler tab'
    },
    {
      id: '2.4a',
      page: 'job-traveler',
      act: 2, scene: '2.4',
      title: 'Job Traveler \u2014 Operations',
      persona: 'Dave & Sarah',
      desc: 'The digital work package. Left panel lists operations with status; right panel shows work instructions with caution callouts.',
      dialog: 'The digital traveler replaces paper. Each operation has step-by-step instructions. Notice the caution callout on the weld op \u2014 preheat and interpass temps. The kind of Navy-specific detail that used to get lost on paper.\n\n\u27A4 Click through the operation list.',
      clickTarget: '#page-job-traveler .col-left-right > .card', clickLabel: 'Operation list'
    ,
      callout: {"type":"ai","label":"Digital Traveler","text":"F2AI captures the Navy specific details in the digital traveler, and provides direct access to artifacts needed on the shop floor or for real-time engineering review."}},
    {
      id: '2.4b',
      page: 'job-traveler',
      act: 2, scene: '2.4',
      title: 'Job Traveler \u2014 Attachments',
      persona: 'Dave & Sarah',
      desc: 'Linked attachments \u2014 drawings, weld procedures, and fixture setup PDFs \u2014 right at the operation level.',
      dialog: 'Attachments linked right to each operation \u2014 drawings, weld procedures, fixture setups. No hunting through shared drives.\n\n\u27A4 Point to the Attachments panel.',
      clickTarget: '#traveler-attachments-card', clickLabel: 'Attachments'
    ,
      callout: {"type":"ai","label":"Digital Traveler","text":"F2AI captures the Navy specific details in the digital traveler, and provides direct access to artifacts needed on the shop floor or for real-time engineering review."}},
    {
      id: '2.4c',
      page: 'job-traveler',
      act: 2, scene: '2.4',
      title: 'Job Traveler \u2014 QA Tab',
      persona: 'Sarah',
      desc: 'Sarah clicks QA & Inspections to review the inspection plan and auto data collection setup.',
      dialog: 'Sarah takes over to set up the QA plan.\n\n\u27A4 Click QA & Inspections tab.',
      clickTarget: '#page-job-traveler .seg-btn:nth-child(3)', clickLabel: 'QA & Inspections tab'
    },
    {
      id: '2.5a',
      page: 'job-qa',
      act: 2, scene: '2.5',
      title: 'Auto Data Collection Setup',
      persona: 'Sarah',
      desc: 'Sarah configures automated data collection for each operation \u2014 digitized tools, vision stations, and manual QR entry methods.',
      dialog: 'Sarah configures automated data collection for each operation. The band saw and CNC are digitized \u2014 data flows automatically. The weld cell uses QR scans plus a vision station. NDT sends digital reports direct.\n\n\u27A4 Point to the data source matrix.',
      clickTarget: '#qa-data-source-matrix', clickLabel: 'Data source matrix',
      callout: { type: 'ai', label: 'Automated Data Collection Setup', text: 'Op 10 (Saw) — digitized; auto-logs cut start/stop times, blade speed, piece count.\nOp 20 (CNC Mill) — networked; cycle times, tool changes, piece count flow automatically.\nOp 30 (Weld) — manual; QR scan in/out plus vision station at weld cell exit captures build progress images.\nOp 40 (NDT) — UT machine sends digital reports directly.' }
    },
    {
      id: '2.5b',
      page: 'job-qa',
      act: 2, scene: '2.5',
      title: 'QA \u2014 Acceptance Package',
      persona: 'Sarah',
      desc: 'The acceptance package tracks which documents are ready — COC, CMTR, weld maps, NDT reports — auto-generated on job completion.',
      dialog: 'Acceptance Package \u2014 what the shipyard needs. Two documents already complete, the rest auto-generate as the job progresses.\n\n\u27A4 Point to the Acceptance Package.',
      clickTarget: '#page-job-qa .two-col .card:nth-child(2)', clickLabel: 'Acceptance Package',
      callout: { type: 'signal', label: 'Shipyard Signaling Configuration', text: 'Automated milestone signals get sent to HII-Ingalls\u2019 ERP/PLM at 25%, 50%, 75%, and 100% completion. Each signal includes: percentage complete, NCR status, the latest production image from the vision station, and a revised estimated completion date.\n\nNear real-time supply chain visibility for the shipyard — no emails, no phone calls. The data flows from tools, vision stations, and QR scans the operators are already using.' }
    },
    {
      id: '2.5c',
      page: 'job-qa',
      act: 2, scene: '2.5',
      title: 'QA \u2014 Compliance Tab',
      persona: 'Sarah',
      desc: 'Sarah clicks the Compliance tab to review Navy-specific documentation requirements.',
      dialog: 'Sarah checks Compliance for Navy documentation requirements.\n\n\u27A4 Click the Compliance tab.',
      clickTarget: '#page-job-qa .seg-btn:nth-child(4)', clickLabel: 'Compliance tab'
    },
    {
      id: '2.6a',
      page: 'job-compliance',
      act: 2, scene: '2.6',
      title: 'Job QA \u2014 TDP Checklist',
      persona: 'Sarah',
      desc: 'TDP element checklist confirms all Navy documentation requirements per MIL-STD-31000C. Security classification: Unclass.',
      dialog: 'TDP checklist confirms all Navy documentation requirements. Three of six complete.\n\n\u27A4 Point to the TDP checklist.',
      clickTarget: '#tdp-checklist-card', clickLabel: 'TDP Element Checklist'
    },
    {
      id: '2.6b',
      page: 'job-compliance',
      act: 2, scene: '2.6',
      title: 'Job QA \u2014 Acceptance & TIP',
      persona: 'Sarah',
      desc: 'Acceptance package builder and TIP table with (I)/(V)/(Q)/(G) codes mapping to NAVSEA requirements.',
      dialog: 'The Test and Inspection Plan maps every inspection code.\n\n\u27A4 Point to the TIP table.',
      clickTarget: '#page-job-compliance .data-table', clickLabel: 'TIP table'
    },
    {
      id: '2.7a',
      page: 'scheduler',
      act: 2, scene: '2.7',
      title: 'Scheduler \u2014 MES Sync',
      persona: 'Dave',
      desc: 'F2AI passes the job to Bayside\u2019s existing MES with all data intact. The MES returns scheduled dates.',
      dialog: 'Dave opens the Scheduler. F2AI syncs with Bayside\u2019s existing MES \u2014 it\u2019s not replacing it, it\u2019s the single pane of glass that connects scheduling to the bid, traveler, QA, and shipyard signaling.\n\n\u27A4 Point to the MES sync indicator.',
      clickTarget: '#mes-sync-indicator', clickLabel: 'MES sync status'
    ,
      callout: {"type":"ai","label":"MES Integration","text":"F2AI synchronizes with the existing shop's MES system to integrate the job schedule into a single pane of glass for bid, build and acceptance."}},
    {
      id: '2.7b',
      page: 'scheduler',
      act: 2, scene: '2.7',
      title: 'Scheduler \u2014 Gantt Chart',
      persona: 'Dave',
      desc: 'Gantt timeline showing J-2026-042 across work centers \u2014 CNC Mill Bay 1 next week, weld cell the week after.',
      dialog: 'The Gantt shows the work slotted across work centers over the next two weeks.\n\n\u27A4 Point to the Gantt chart.',
      clickTarget: '#scheduler-gantt-card', clickLabel: 'Gantt chart'
    },
    {
      id: '2.7c',
      page: 'scheduler',
      act: 2, scene: '2.7',
      title: 'Scheduler \u2014 Capacity',
      persona: 'Dave',
      desc: 'Capacity utilization sourced from MES data \u2014 CNC Mill at 95%, Weld Cell at 70%, NDT Lab at 30%.',
      dialog: 'The capacity utilization shows real-time work cell loading sourced from MES data.\n\n\u27A4 Point to capacity.',
      clickTarget: '#scheduler-capacity-card', clickLabel: 'Capacity Utilization'
    },
    {
      id: 'transition-2',
      page: 'scheduler',
      act: 2, scene: '\u2014',
      title: 'RTW Complete \u2014 Released to Floor',
      persona: '',
      desc: 'RTW checklist complete. Job J-2026-042 is released to the shop floor. Mike picks it up on second shift.',
      dialog: 'Job released to the shop floor. Mike picks it up on second shift.',
      clickTarget: null, clickLabel: ''
    },
    // ── ACT 3: Shop Floor Execution ──
    {
      id: '3.1a',
      page: 'login-tablet',
      act: 3, scene: '3.1',
      title: 'Tablet Login \u2014 Badge Scan',
      persona: 'Mike',
      desc: 'Mike walks up to the ruggedized tablet at his weld cell and scans his badge. Two-factor auth \u2014 badge first, then PIN.',
      dialog: 'Second shift. Mike walks up to the tablet. Two-factor login \u2014 badge scan first, then PIN. Simple and secure.\n\n\u27A4 Scan badge.',
      clickTarget: '#badge-scan-btn', clickLabel: 'Badge scanner'
    },
    {
      id: '3.1b',
      page: 'login-tablet',
      act: 3, scene: '3.1',
      title: 'Tablet Login \u2014 PIN',
      persona: 'Mike',
      desc: 'Badge verified. Now Mike enters his 4-digit PIN to confirm identity. No passwords, no email.',
      dialog: 'Badge verified.\n\n\u27A4 Enter PIN.',
      clickTarget: '#pin-btn-1', clickLabel: 'PIN pad "1"'
    },
    {
      id: '3.1c',
      page: 'login-tablet',
      act: 3, scene: '3.1',
      title: 'Tablet Login \u2014 PIN contd.',
      persona: 'Mike',
      desc: 'Mike continues entering his PIN \u2014 third and fourth digits.',
      dialog: 'Pin verified.\n\n\u27A4 Tap 5.',
      clickTarget: '#page-login-tablet #pin-btn-5', clickLabel: 'PIN pad "5"'
    },
    {
      id: '3.1d',
      page: 'login-tablet',
      act: 3, scene: '3.1',
      title: 'Tablet Login \u2014 Sign In',
      persona: 'Mike',
      desc: 'Tap the green check and he\u2019s in. Two-factor done \u2014 no IT support calls.',
      dialog: 'Work center selected. He\u2019s in \u2014 two-factor complete.\n\n\u27A4 Tap the green check button.',
      clickTarget: '#login-check-btn', clickLabel: 'Login button'
    },
    {
      id: '3.2',
      page: 'tab-work',
      act: 3, scene: '3.2',
      title: 'Tablet My Work',
      persona: 'Mike',
      desc: 'Large, tap-friendly job tiles in priority order. Mike sees Op 30 \u2014 Weld for J-2026-042 at the top of his list.',
      dialog: 'My Work \u2014 exactly what Mike needs to do today. Large tap-friendly tiles in priority order. He sees the pump bracket weld at the top.\n\n\u27A4 Tap the Op 30 Weld tile.',
      clickTarget: '#page-tab-work .tile', clickLabel: 'Op 30 \u2014 Weld tile'
    },
    {
      id: '3.2b',
      page: 'tab-operation',
      act: 3, scene: '3.2',
      title: 'Tablet \u2014 3D Quick Look',
      persona: 'Mike',
      desc: 'Same 3D model from the RFQ process is available right here on the tablet. Mike can orbit the part, see weld callouts, and review geometry before starting.',
      dialog: 'The same 3D Quick Look from the quoting process is right here on Mike\u2019s tablet. He can see the part geometry, weld locations, and reference dimensions before picking up the torch.\n\n\u27A4 Scroll down to see the 3D viewer.',
      clickTarget: '#tab-3d-viewer-card', clickLabel: '3D Quick Look'
    },
    {
      id: '3.3a',
      page: 'tab-operation',
      act: 3, scene: '3.3',
      title: 'Tablet \u2014 Scan Part',
      persona: 'Mike',
      desc: 'Mike scans the QR code on the part traveler tag. The system confirms bracket #1 of 12, Job J-2026-042.',
      dialog: 'This replaces the paper traveler. Check-in is complete.\n\n\u27A4 Tap Scan Part.',
      clickTarget: '#tab-scan-part', clickLabel: 'Scan Part QR',
      callout: {"type":"ai","label":"QR Code Scan — Part & Tool Check-In","text":"The paper traveler is replaced with a QR scan of the part, operator and machine. Artifacts and visual renderings are all available in 1 screen on the tablet. No typing is required, gloves stay on!"}
    },
    {
      id: '3.3b',
      page: 'tab-operation',
      act: 3, scene: '3.3',
      title: 'Tablet \u2014 Scan Station',
      persona: 'Mike',
      desc: 'Mike scans the weld cell QR. F2AI logs which machine/cell is being used for full traceability.',
      dialog: 'Operator, parts and station are scanned and identified.\n\n\u27A4 Tap Scan Station.',
      clickTarget: '#tab-scan-station', clickLabel: 'Scan Station QR'
    },
    {
      id: '3.3c',
      page: 'tab-operation',
      act: 3, scene: '3.3',
      title: 'Tablet \u2014 Welding',
      persona: 'Mike',
      desc: 'Confirmed: Bracket #1 \u2192 Weld Cell 1 \u2192 Mike Johnson \u2192 Started 14:32. Completed parts pass the vision station automatically.',
      dialog: 'Mike starts welding. As completed brackets leave his cell, they pass a vision station that captures a 3D model automatically.\n\n\u27A4 Tap Complete Op.',
      clickTarget: '#scan-confirmation', clickLabel: 'Scan confirmation'
    },
    {
      id: '3.4',
      page: 'shipyard',
      act: 3, scene: '3.4',
      title: 'Shipyard Signaling',
      persona: 'Sarah & Maria',
      desc: 'The Shipyard Signaling screen shows delivery timelines, automated progress updates, and 3D inspection results for all active jobs.',
      dialog: 'Meanwhile, the Shipyard Signaling screen keeps the customer informed automatically \u2014 delivery timeline, vision results, milestone signals.\n\n\u27A4 Scroll down to see the vision station results.',
      clickTarget: null, clickLabel: ''
    ,
      callout: {"type":"ai","label":"Shipyard Signaling","text":"Near real-time feedback is automatically sent to the shipyard and integrated into their PLM system via FastAPI calls. The shipyard has an updated expectation of predicted quality and timing."}},
    {
      id: '3.4a',
      page: 'shipyard',
      act: 3, scene: '3.4',
      title: '3D Model Comparison',
      persona: 'Sarah & Maria',
      desc: 'Vision station compares in-process 3D scans against the TDP reference. Geometry match: 98.6%, all critical dimensions within tolerance.',
      dialog: 'The vision station compares each bracket against the TDP reference model.\n\n\u27A4 Point to the 3D comparison overlay.',
      clickTarget: '#model-comparison', clickLabel: '3D comparison overlay',
      callout: {"type":"ai","label":"Vision Station AI","text":"F2AI's stereo vision capture of the part and conversion to a 3D model extracts features to compare the as-is part against the TDP. This is minimally invasive to the manufacturer because of F2AI's unique drawing based transformer ML model matched with vision to model AI workflow (NeRF, point cloud, mesh etc.). This is not replacing inspection but providing additional near real-time digital fabrication signals to the shipyard and enterprise AI to reduce unexpected supply-chain issues."}
    },
    {
      id: '3.4b',
      page: 'shipyard',
      act: 3, scene: '3.4',
      title: 'Shipyard Signal \u2014 25%',
      persona: 'Sarah & Maria',
      desc: 'At 25% complete, an automated signal goes to HII-Ingalls: 3 of 12 units fabricated, 0 NCRs, geometry match 98.6%.',
      dialog: 'At 25% complete, the first automated signal goes to the shipyard \u2014 progress, NCR status, geometry match, estimated completion. No phone calls needed.\n\n\u27A4 Point to the signal log.',
      clickTarget: '#shipyard-signal-card', clickLabel: '25% shipyard signal',
      callout: { type: 'signal', label: 'Automated Shipyard Signal — 25% Milestone', text: 'The 25% milestone triggers the first automated signal to the shipyard: J-2026-042 is 25% complete. 3 of 12 units fabricated. 0 open NCRs. Geometry match: 98.6%. Estimated completion: on track for March 15.\n\nThe formatted update is sent to HII-Ingalls\u2019 ERP/PLM. The shipyard sees a near real-time production update without a single phone call from Bayside.' }
    },
    {
      id: 'transition-3',
      page: 'tab-operation',
      act: 3, scene: '\u2014',
      title: 'Porosity Detected',
      persona: '',
      desc: 'Three brackets in, Mike spots porosity in the weld bead on bracket #4. Time to raise an NCR.',
      dialog: 'Three brackets in, Mike spots porosity on bracket four. Time to raise an NCR.',
      clickTarget: null, clickLabel: ''
    },
    {
      id: 'transition-3b',
      page: 'tab-operation',
      act: 3, scene: '\u2014',
      title: 'Raise NCR',
      persona: 'Mike',
      desc: 'Mike taps the NCR button on the tablet to report the defect.',
      dialog: 'Mike initiates an NCR without removing his gloves.\n\n\u27A4 Tap NCR.',
      clickTarget: '#page-tab-operation .action-btn.ncr', clickLabel: 'NCR button'
    },
    // ── ACT 4: Quality & NCR ──
    {
      id: '4.1a',
      page: 'tab-ncr',
      act: 4, scene: '4.1',
      title: 'Tablet NCR \u2014 Defect Type',
      persona: 'Mike',
      desc: 'Mike taps the NCR button. A minimal form designed for gloves-on speed. Dropdown selects \u201cPorosity.\u201d Quantity: 2.',
      dialog: 'NCR is sent for internal review.\n\n\u27A4 Show the defect dropdown.',
      clickTarget: '#ncr-defect-group', clickLabel: 'Defect type dropdown'
    },
    {
      id: '4.1b',
      page: 'tab-ncr',
      act: 4, scene: '4.1',
      title: 'Tablet NCR \u2014 Camera',
      persona: 'Mike',
      desc: 'Mike taps the camera button to photograph the defective welds.',
      dialog: 'He snaps a photo of the porosity.\n\n\u27A4 Tap the camera button.',
      clickTarget: '#ncr-camera-btn', clickLabel: 'Camera button'
    },
    {
      id: '4.1b2',
      page: 'tab-ncr',
      act: 4, scene: '4.1',
      title: 'Tablet NCR \u2014 Photos Captured',
      persona: 'Mike',
      desc: 'Two photos captured — close-ups of the porosity in the weld bead.',
      dialog: 'Two photos attached, geotagged to the weld cell.\n\n\u27A4 Tap Submit NCR.',
      clickTarget: '#page-tab-ncr .btn-danger', clickLabel: 'Submit NCR'
    },
    {
      id: '4.1c',
      page: 'tab-ncr',
      act: 4, scene: '\u2014',
      title: 'NCR Submitted',
      persona: '',
      desc: 'NCR-042 submitted in under 60 seconds. Tied to Job J-2026-042, Op 30 (Weld). Mike continues welding while Sarah is notified.',
      dialog: 'NCR-042 logged instantly, tied to the job. Mike keeps welding while quality investigates. Sarah gets the notification.',
      clickTarget: null, clickLabel: ''
    },
    {
      id: '4.2a',
      page: 'ncr-detail',
      act: 4, scene: '4.2',
      title: 'NCR Detail \u2014 Evidence',
      persona: 'Sarah',
      desc: 'Sarah reviews NCR-042 with photos, defect description, timeline, and linked items.',
      dialog: 'Sarah opens the NCR \u2014 defect details, Mike\u2019s photos, affected job, full timeline.\n\n\u27A4 Point to the timeline and photo evidence.',
      clickTarget: '#ncr-timeline-card', clickLabel: 'NCR Timeline'
    },
    {
      id: '4.2b',
      page: 'ncr-detail',
      act: 4, scene: '4.2',
      title: 'NCR Detail \u2014 Disposition',
      persona: 'Sarah',
      desc: 'Sarah reviews the photos, consults the WPS, and selects \u201cRepair\u201d as the disposition.',
      dialog: 'She reviews the photos, checks the WPS, and determines it\u2019s repairable.\n\n\u27A4 Select Repair from the disposition dropdown.',
      clickTarget: '#ncr-disp-repair-opt', clickLabel: 'Repair option'
    },
    {
      id: '4.2c',
      page: 'ncr-detail',
      act: 4, scene: '4.2',
      title: 'NCR Detail \u2014 Hold Signal',
      persona: 'Sarah',
      desc: 'F2AI automatically signaled a delivery hold to HII-Ingalls the moment the NCR was created.',
      dialog: 'Here\u2019s the key part \u2014 the moment that NCR was created, F2AI automatically sent a delivery signal to the shipyard. No surprises. The program manager at Ingalls is informed.\n\n\u27A4 Point to the shipyard hold signal.',
      clickTarget: '#ncr-hold-signal-card', clickLabel: 'Shipyard hold signal log',
      callout: { type: 'signal', label: 'Automatic Delivery Hold Signal', text: 'The moment the NCR was created, F2AI automatically signaled a hold on the projected delivery date. The HII-Ingalls program manager sees: J-2026-042 — Previous delivery estimate: 3/10/27. Status: NCR pending disposition. 2 of 12 units affected.\n\nNo surprises — the shipyard knows about the issue before it becomes a schedule problem.' }
    },
    {
      id: '4.3',
      page: 'ncr-detail',
      act: 4, scene: '4.3',
      title: 'NCR Resolution',
      persona: 'Sarah & Mike',
      desc: 'Repair completed, re-inspection passed. F2AI sends an updated signal: NCR resolved, delivery estimate restored.',
      dialog: 'Sarah completes the disposition \u2014 repair authorized, instructions pushed to Mike\u2019s tablet. He grinds out and re-welds the two brackets, passes re-inspection. F2AI sends an updated signal: NCR resolved, delivery restored. The whole thing opened and closed without a phone call.\n\n\u27A4 Point to the completed disposition.',
      clickTarget: '#ncr-disp-notes', clickLabel: 'Disposition notes'
    },
    {
      id: 'transition-4',
      page: 'ncr-detail',
      act: 4, scene: '\u2014',
      title: 'All 12 Brackets Complete',
      persona: '',
      desc: 'NCR resolved. All 12 brackets complete. NDT passed. Final QA and shipyard acceptance ahead.',
      dialog: 'NCR resolved. All 12 brackets complete. Final QA ahead.',
      clickTarget: null, clickLabel: ''
    },
    // ── ACT 5: Closeout & Learning ──
    {
      id: '5.1a',
      page: 'shipyard',
      act: 5, scene: '5.1',
      title: 'Shipyard Acceptance \u2014 Package',
      persona: 'Sarah & Maria',
      desc: 'F2AI auto-assembled the complete submission package: COC, CMTR, weld maps, NDT reports, traveler history, and final 3D scans.',
      dialog: 'All 12 brackets done, NDT passed. F2AI auto-assembled the complete submission package from data captured throughout the job.\n\n\u27A4 Point to the submission package.',
      clickTarget: '#shipyard-submission-pkg', clickLabel: 'Submission Package'
    },
    {
      id: '5.1b',
      page: 'shipyard',
      act: 5, scene: '5.1',
      title: 'Shipyard Acceptance \u2014 Learning Loop',
      persona: 'Sarah & Maria',
      desc: 'On close, the Learning Loop stores actual production data, 3D scans, and build timing \u2014 making the next bid smarter.',
      dialog: 'Sarah reviews, confirms completeness, and submits to HII-Ingalls. When this job closes, F2AI updates its knowledge base \u2014 actual production times, 3D scans, Dave\u2019s weld hour correction. The next bid will be smarter.\n\n\u27A4 Click Submit Package.',
      clickTarget: '#btn-submit-package', clickLabel: 'Submit to HII-Ingalls',
      callout: { type: 'ai', label: 'F2AI Learning Loop', text: 'When the job closes, F2AI updates its knowledge base:\n\n\u2022 Actual production times stored alongside the ML estimate — next bid uses real data\n\u2022 Final 3D scan stored as a reference model for future TDP comparison\n\u2022 Complete TDP packaged for the Navy\u2019s digital library per MIL-STD-31000C\n\u2022 Cycle times, material yield, and Dave\u2019s weld hour correction captured for future bids' }
    },
    {
      id: '5.2',
      page: 'reports',
      act: 5, scene: '5.2',
      title: 'Reports Dashboard',
      persona: 'Maria & Dave',
      desc: 'The Reports screen gives leadership the analytics they need \u2014 bid metrics, on-time delivery, throughput, and estimate accuracy.',
      dialog: 'Reports give leadership the full picture \u2014 bid metrics, production throughput, quality trends. All flowing from data captured throughout the workflow.\n\n\u27A4 Scroll down to Estimate Accuracy.',
      clickTarget: null, clickLabel: ''
    },
    {
      id: '5.2a',
      page: 'reports',
      act: 5, scene: '5.2',
      title: 'Reports \u2014 Estimate Accuracy',
      persona: 'Maria & Dave',
      desc: 'The Estimate Accuracy by Program chart shows how close ML predictions were to actual production costs.',
      dialog: 'Estimate accuracy by program \u2014 how close the ML analysis was to actual costs. This is the feedback loop.\n\n\u27A4 Click the chart.',
      clickTarget: '#rpt-accuracy-by-program', clickLabel: 'Open Estimate Accuracy detail'
    },
    {
      id: '5.2b',
      page: 'reports',
      act: 5, scene: '5.2',
      title: 'Reports \u2014 Close Detail',
      persona: 'Maria & Dave',
      desc: 'The detail view breaks down estimate accuracy by program — showing predicted vs. actual costs.',
      dialog: 'Detail breakdown by program.\n\n\u27A4 Close the overlay.',
      clickTarget: '#rpt-overlay-close', clickLabel: 'Close overlay'
    },
    {
      id: '5.3',
      page: 'settings',
      act: 5, scene: '5.3',
      title: 'Settings',
      persona: 'All',
      desc: 'Platform configuration: work centers, material libraries, rate tables, user roles, MES integration, vision stations, and shipyard signaling rules.',
      dialog: 'Settings \u2014 where admins configure work centers, MES integration, vision stations, shipyard signaling rules, and user roles.\n\n\u27A4 Point to the settings sections.',
      clickTarget: '#page-settings .seg-btn', clickLabel: 'Settings tabs'
    },
    {
      id: 'end',
      page: 'splash',
      act: 5, scene: 'END',
      title: 'Demo Complete',
      persona: '',
      desc: 'One RFQ, four people, zero paper. F2AI \u2014 Foundry & Forge. Built for the shops that build the fleet.',
      dialog: 'And that\u2019s the full journey. One RFQ, four people, zero paper.\n\nF2AI gave Maria ML-powered confidence in which jobs to bid. It let the team visualize the part in 3D before a single cut was made. It gave Dave a one-click path from award to production. It gave Sarah automated data collection and real-time shipyard signaling. And it gave Mike clear instructions and a 60-second NCR process.\n\nWhen the job closed, the platform learned from it \u2014 so the next bid is smarter, the next estimate tighter.\n\nThat\u2019s Foundry and Forge. Built for the shops that build the fleet.',
      clickTarget: null, clickLabel: ''
    ,
      callout: { type: 'ai', label: 'F2AI Platform Summary', text: 'F2AI gives:\n\n\u2022 Maria ML-powered confidence in which jobs to bid.\n\u2022 The team visualization of the part in 3D before a single cut was made.\n\u2022 Dave a one-click path from award to production.\n\u2022 Sarah automated data collection and real-time shipyard signaling.\n\u2022 Mike clear instructions and a 60-second NCR process.\n\nWhen the job closed, the platform learned from it \u2014 so the next bid is smarter, the next estimate tighter.' }}
  ];

  // ── State ─────────────────────────────────────────────────
  let currentStep = 0;
  let trayExpanded = false;
  let voiceoverEnabled = false;
  let voiceoverUtterance = null;
  var voiceoverSpeedIdx = 0;
  var voiceoverSpeeds = [1, 1.25, 1.5, 1.75, 2];
  var speechGeneration = 0;  // incremented on every navigation to invalidate stale callbacks
  // Track position within current step's full text for word-level pause/resume
  var currentSpeechText = '';    // the full cleaned text for the active step
  var currentCharOffset = 0;    // character offset of the last word boundary heard
  var currentSpeechStep = -1;   // which step index this text belongs to

  // ── Google Cloud TTS ─────────────────────────────────────────
  var googleTtsApiKey = '';
  var googleTtsVoice = 'en-US-Neural2-D';
  var googleTtsAudio = null;
  var googleTtsCache = {};
  var googleTtsFetching = {};
  var useGoogleTts = false;
  var googleTtsVoices = [
    { id: 'en-US-Neural2-D', name: 'Neural2-D', desc: 'Male · natural, warm' },
    { id: 'en-US-Neural2-F', name: 'Neural2-F', desc: 'Female · natural, clear' },
    { id: 'en-US-Neural2-A', name: 'Neural2-A', desc: 'Female · warm, conversational' },
    { id: 'en-US-Neural2-J', name: 'Neural2-J', desc: 'Male · authoritative' },
    { id: 'en-US-Neural2-I', name: 'Neural2-I', desc: 'Male · smooth' },
    { id: 'en-US-Chirp3-HD-Charon', name: 'Chirp3 Charon HD', desc: 'Male · premium quality' },
    { id: 'en-US-Chirp3-HD-Kore',   name: 'Chirp3 Kore HD',   desc: 'Female · premium quality' },
    { id: 'en-US-Chirp3-HD-Aoede',  name: 'Chirp3 Aoede HD',  desc: 'Female · expressive' },
    { id: 'en-US-Chirp3-HD-Fenrir', name: 'Chirp3 Fenrir HD', desc: 'Male · deep, confident' }
  ];

  // ── ElevenLabs TTS ──────────────────────────────────────────
  var elevenLabsApiKey = '';
  var elevenLabsVoiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel — warm conversational
  var elevenLabsAudio = null;   // current Audio element
  var elevenLabsCache = {};     // stepIndex → blob URL
  var elevenLabsFetching = {};  // stepIndex → true while fetch in flight
  var useElevenLabs = false;    // true = ElevenLabs, false = Web Speech API (system voice)

  // Available ElevenLabs voices (free tier)
  var elevenLabsVoices = [
    { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', desc: 'Warm, conversational' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', desc: 'Soft, friendly' },
    { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', desc: 'Deep, confident' },
    { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', desc: 'Smooth, professional' },
    { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli', desc: 'Young, clear' },
    { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', desc: 'Warm, engaging' }
  ];

  // Load saved Google TTS settings
  try {
    var _savedGoogleKey = localStorage.getItem('f2ai-google-tts-key');
    if (_savedGoogleKey) { googleTtsApiKey = _savedGoogleKey; useGoogleTts = true; }
    var _savedGoogleVoice = localStorage.getItem('f2ai-google-tts-voice');
    if (_savedGoogleVoice) googleTtsVoice = _savedGoogleVoice;
  } catch(e) {}

  // Load saved ElevenLabs settings from localStorage
  try {
    var _savedKey = localStorage.getItem('f2ai-11labs-key');
    if (_savedKey) elevenLabsApiKey = _savedKey;
    var _savedVoice = localStorage.getItem('f2ai-11labs-voice');
    if (_savedVoice) elevenLabsVoiceId = _savedVoice;
  } catch(e) {}
  var manualMode = false;        // Cmd+M easter egg — hide controls, user clicks through proto

  // ── Act Colors ────────────────────────────────────────────
  const actColors = {
    0: '#d4960f', // intro — gold
    1: '#d4960f', // Act 1 — gold
    2: '#22c55e', // Act 2 — green
    3: '#c084fc', // Act 3 — purple
    4: '#f97316', // Act 4 — orange
    5: '#ef4444'  // Act 5 — red
  };

  // ── Build Tray ────────────────────────────────────────────
  function buildTray() {
    const tray = document.createElement('div');
    tray.id = 'demo-tray';
    tray.innerHTML = `
      <div class="demo-dialog-area" id="demo-dialog-area">
        <div id="demo-dialog" class="demo-dialog"></div>
      </div>
      <div class="demo-tray-footer">
        <div class="demo-footer-content">
          <div class="demo-meta">
            <span id="demo-act-badge" class="demo-act-badge">ACT 1</span>
            <span id="demo-scene-num" class="demo-scene-num">1.1</span>
            <span id="demo-title" class="demo-title">Desktop Login</span>
            <span id="demo-persona" class="demo-persona">Maria</span>
          </div>
          <div id="demo-desc" class="demo-desc">Description text here</div>
        </div>
        <div class="demo-counter" id="demo-counter">1 / ${steps.length}</div>
        <div class="demo-jump-wrap" id="demo-jump-wrap" style="position:relative">
          <div id="demo-jump-popover" style="display:none;position:absolute;bottom:calc(100% + 8px);right:0;background:var(--steel-800,#1e293b);border:1px solid var(--steel-600,#475569);border-radius:10px;padding:10px 12px;box-shadow:0 8px 24px rgba(0,0,0,.4);z-index:100001;white-space:nowrap">
            <label style="font-size:11px;color:var(--steel-300,#94a3b8);display:block;margin-bottom:6px">Jump to step (1–${steps.length})</label>
            <div style="display:flex;gap:6px;align-items:center">
              <input id="demo-jump-input" type="number" min="1" max="${steps.length}" placeholder="#" style="width:64px;padding:5px 8px;border-radius:6px;border:1px solid var(--steel-600,#475569);background:var(--steel-900,#0f172a);color:#fff;font-size:13px;outline:none;-moz-appearance:textfield" />
              <button id="demo-jump-go" style="padding:5px 10px;border-radius:6px;border:none;background:var(--blue-500,#0e6d96);color:#fff;font-size:12px;font-weight:600;cursor:pointer">Go</button>
            </div>
          </div>
        </div>
        <div class="demo-nav-group">
          <button id="demo-expand" class="demo-nav-btn" title="Show full script dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
          </button>
          <button id="demo-voiceover" class="demo-nav-btn" title="Play voiceover narration">
            <svg id="demo-vo-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 4 20 12 6 20 6 4"/></svg>
            <svg id="demo-vo-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="display:none"><rect x="5" y="4" width="4" height="16"/><rect x="15" y="4" width="4" height="16"/></svg>
          </button>
          <button id="demo-speed" class="demo-nav-btn demo-speed-btn" title="Playback speed">1x</button>
          <button id="demo-prev" class="demo-nav-btn" title="Previous step">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button id="demo-next" class="demo-nav-btn" title="Next step">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div class="demo-progress"><div id="demo-progress-bar" class="demo-progress-fill"></div></div>
    `;
    document.body.appendChild(tray);

    // Callout FAB — follows mouse cursor, dark blue + blur
    var fab = document.createElement('div');
    fab.id = 'demo-callout-fab';
    fab.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8a820" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>';
    document.body.appendChild(fab);

    // Callout popover — dark blue, light text
    var calloutPanel = document.createElement('div');
    calloutPanel.id = 'demo-callout-panel';
    calloutPanel.innerHTML = '<div id="demo-callout-header" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.06)"><div style="display:flex;align-items:center;gap:8px"><svg id="demo-callout-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg><span id="demo-callout-label" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:rgba(255,255,255,.7)"></span></div><button id="demo-callout-close" style="background:none;border:none;color:rgba(255,255,255,.5);cursor:pointer;padding:4px;font-size:18px;line-height:1">&times;</button></div><div id="demo-callout-text" style="padding:14px 16px;font-size:13px;line-height:1.65;color:rgba(255,255,255,.82)"></div>';
    document.body.appendChild(calloutPanel);

    // Track real mouse for callout panel positioning (click location)
    document.addEventListener('mousemove', function(e) {
      _fabMouseX = e.clientX;
      _fabMouseY = e.clientY;
    }, true);

    // FAB click handler
    fab.addEventListener('click', function(e) { e.stopPropagation(); toggleCalloutPanel(); });
    document.getElementById('demo-callout-close').addEventListener('click', function(e) { e.stopPropagation(); closeCalloutPanel(); });

    // Voice Settings modal (Google TTS + ElevenLabs + System tabs)
    var modal = document.createElement('div');
    modal.id = 'demo-11labs-modal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:100002;background:rgba(0,0,0,.6);align-items:center;justify-content:center;backdrop-filter:blur(4px)';
    modal.innerHTML = `
      <div class="demo-11labs-card">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8a820" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          <span style="font-size:15px;font-weight:600;color:#f3f4f6">Voice Settings</span>
        </div>
        <div style="display:flex;gap:0;margin-bottom:16px;border-bottom:1px solid #333a44">
          <button id="demo-voice-tab-google" class="demo-voice-tab demo-voice-tab-active" onclick="demoSwitchVoiceTab('google')">&#127381; Google TTS</button>
          <button id="demo-voice-tab-eleven" class="demo-voice-tab" onclick="demoSwitchVoiceTab('eleven')" style="margin-left:4px">ElevenLabs</button>
          <button id="demo-voice-tab-system" class="demo-voice-tab" onclick="demoSwitchVoiceTab('system')" style="margin-left:4px">System Voice</button>
        </div>
        <div id="demo-voice-panel-google">
          <label style="font-size:12px;color:#9aa2b1;display:block;margin-bottom:4px">Google Cloud API Key</label>
          <div style="font-size:11px;color:#697182;margin-bottom:6px">Get a free key at console.cloud.google.com → Cloud Text-to-Speech API</div>
          <input id="demo-google-key-input" type="password" placeholder="AIza..." style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #485162;background:#191d23;color:#f3f4f6;font-size:13px;outline:none;margin-bottom:12px;box-sizing:border-box" />
          <label style="font-size:12px;color:#9aa2b1;display:block;margin-bottom:6px">Voice</label>
          <select id="demo-google-voice-select" style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #485162;background:#191d23;color:#f3f4f6;font-size:13px;outline:none;margin-bottom:16px;box-sizing:border-box;cursor:pointer;appearance:auto">
            ${googleTtsVoices.map(function(v) {
              return '<option value="' + v.id + '"' + (v.id === googleTtsVoice ? ' selected' : '') + '>' + v.name + ' \u2014 ' + v.desc + '</option>';
            }).join('')}
          </select>
          <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap">
            <button id="demo-google-test" style="padding:7px 14px;border-radius:6px;border:1px solid #485162;background:transparent;color:#9aa2b1;font-size:12px;cursor:pointer">&#9654; Test Voice</button>
            <button id="demo-google-cancel" style="padding:7px 14px;border-radius:6px;border:1px solid #485162;background:transparent;color:#9aa2b1;font-size:12px;cursor:pointer">Cancel</button>
            <button id="demo-google-save" style="padding:7px 14px;border-radius:6px;border:none;background:#1a73e8;color:#fff;font-size:12px;font-weight:600;cursor:pointer">Enable Google TTS</button>
          </div>
          <div id="demo-google-test-status" style="font-size:12px;margin-top:8px;min-height:18px;text-align:right"></div>
          <p style="font-size:11px;color:#697182;margin:10px 0 0;line-height:1.4">~$4 per 1M characters (Neural2). Audio cached per step &mdash; replays are free.</p>
        </div>
        <div id="demo-voice-panel-eleven" style="display:none">
          <label style="font-size:12px;color:#9aa2b1;display:block;margin-bottom:4px">ElevenLabs API Key</label>
          <div style="font-size:11px;color:#697182;margin-bottom:6px">Get a free key at elevenlabs.io (10,000 chars/month free)</div>
          <input id="demo-11labs-key-input" type="password" placeholder="sk_..." style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #485162;background:#191d23;color:#f3f4f6;font-size:13px;outline:none;margin-bottom:12px;box-sizing:border-box" />
          <label style="font-size:12px;color:#9aa2b1;display:block;margin-bottom:6px">Voice</label>
          <select id="demo-11labs-voice-select" style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #485162;background:#191d23;color:#f3f4f6;font-size:13px;outline:none;margin-bottom:16px;box-sizing:border-box;cursor:pointer;appearance:auto">
            ${elevenLabsVoices.map(function(v) {
              return '<option value="' + v.id + '"' + (v.id === elevenLabsVoiceId ? ' selected' : '') + '>' + v.name + ' \u2014 ' + v.desc + '</option>';
            }).join('')}
          </select>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button id="demo-11labs-cancel" style="padding:7px 14px;border-radius:6px;border:1px solid #485162;background:transparent;color:#9aa2b1;font-size:12px;cursor:pointer">Cancel</button>
            <button id="demo-11labs-save" style="padding:7px 14px;border-radius:6px;border:none;background:#0e6d96;color:#fff;font-size:12px;font-weight:600;cursor:pointer">Enable ElevenLabs</button>
          </div>
        </div>
        <div id="demo-voice-panel-system" style="display:none">
          <p style="font-size:13px;color:#9aa2b1;line-height:1.6;margin:0 0 16px">Uses your browser's built-in speech synthesis. No API key needed.</p>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button id="demo-system-cancel" style="padding:7px 14px;border-radius:6px;border:1px solid #485162;background:transparent;color:#9aa2b1;font-size:12px;cursor:pointer">Cancel</button>
            <button id="demo-system-save" style="padding:7px 14px;border-radius:6px;border:none;background:#22c55e;color:#fff;font-size:12px;font-weight:600;cursor:pointer">Use System Voice</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Tab switcher exposed on window so inline onclick works inside IIFE
    window.demoSwitchVoiceTab = function(tab) {
      ['google','eleven','system'].forEach(function(t) {
        var btn = document.getElementById('demo-voice-tab-' + t);
        var panel = document.getElementById('demo-voice-panel-' + t);
        if (btn) btn.classList.toggle('demo-voice-tab-active', t === tab);
        if (panel) panel.style.display = t === tab ? '' : 'none';
      });
    };

    document.getElementById('demo-google-test').addEventListener('click', function() {
      var keyInput = document.getElementById('demo-google-key-input');
      var voiceSelect = document.getElementById('demo-google-voice-select');
      var statusEl = document.getElementById('demo-google-test-status');
      var key = keyInput && keyInput.value.trim();
      var voice = voiceSelect ? voiceSelect.value : googleTtsVoice;
      if (!key) { statusEl.style.color = '#f87171'; statusEl.textContent = 'Enter an API key first'; return; }
      statusEl.style.color = '#9aa2b1'; statusEl.textContent = 'Testing\u2026';
      fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + key, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: { text: 'Google TTS is working.' }, voice: { languageCode: 'en-US', name: voice }, audioConfig: { audioEncoding: 'MP3' } })
      }).then(function(resp) {
        if (!resp.ok) return resp.json().then(function(e) { throw new Error((e && e.error && e.error.message) || ('HTTP ' + resp.status)); });
        return resp.json();
      }).then(function(data) {
        if (!data || !data.audioContent) throw new Error('No audio returned');
        var audio = new Audio('data:audio/mp3;base64,' + data.audioContent);
        audio.play().catch(function(e) { throw new Error('Playback blocked: ' + e.message); });
        statusEl.style.color = '#22c55e'; statusEl.textContent = '\u2714 Success! Google TTS is working.';
      }).catch(function(err) {
        statusEl.style.color = '#f87171'; statusEl.textContent = '\u26A0 ' + err.message;
      });
    });

    document.getElementById('demo-google-cancel').addEventListener('click', function() {
      document.getElementById('demo-11labs-modal').style.display = 'none';
    });
    document.getElementById('demo-google-save').addEventListener('click', function() {
      var keyInput = document.getElementById('demo-google-key-input');
      var voiceSelect = document.getElementById('demo-google-voice-select');
      if (keyInput && keyInput.value.trim()) {
        googleTtsApiKey = keyInput.value.trim();
        googleTtsVoice = voiceSelect.value;
        googleTtsCache = {};
        useGoogleTts = true;
        useElevenLabs = false;
        try { localStorage.setItem('f2ai-google-tts-key', googleTtsApiKey); localStorage.setItem('f2ai-google-tts-voice', googleTtsVoice); } catch(e) {}
        document.getElementById('demo-11labs-modal').style.display = 'none';
        voiceoverEnabled = true;
        updateVoiceoverIcon();
        speakStep(steps[currentStep]);
      }
    });
    document.getElementById('demo-11labs-cancel').addEventListener('click', function() {
      document.getElementById('demo-11labs-modal').style.display = 'none';
    });
    document.getElementById('demo-11labs-save').addEventListener('click', function() {
      var keyInput = document.getElementById('demo-11labs-key-input');
      var voiceSelect = document.getElementById('demo-11labs-voice-select');
      if (keyInput && keyInput.value.trim()) {
        elevenLabsApiKey = keyInput.value.trim();
        elevenLabsVoiceId = voiceSelect.value;
        elevenLabsCache = {};
        useElevenLabs = true;
        useGoogleTts = false;
        try { localStorage.setItem('f2ai-11labs-key', elevenLabsApiKey); localStorage.setItem('f2ai-11labs-voice', elevenLabsVoiceId); } catch(e) {}
        document.getElementById('demo-11labs-modal').style.display = 'none';
        voiceoverEnabled = true;
        updateVoiceoverIcon();
        speakStep(steps[currentStep]);
      }
    });
    document.getElementById('demo-system-cancel').addEventListener('click', function() {
      document.getElementById('demo-11labs-modal').style.display = 'none';
    });
    document.getElementById('demo-system-save').addEventListener('click', function() {
      useGoogleTts = false; useElevenLabs = false;
      try { localStorage.removeItem('f2ai-google-tts-key'); localStorage.removeItem('f2ai-11labs-key'); } catch(e) {}
      document.getElementById('demo-11labs-modal').style.display = 'none';
      voiceoverEnabled = true;
      updateVoiceoverIcon();
      speakStep(steps[currentStep]);
    });
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.style.display = 'none'; });
    if (googleTtsApiKey) { var gki = document.getElementById('demo-google-key-input'); if (gki) gki.value = googleTtsApiKey; }
    if (elevenLabsApiKey) { var ki = document.getElementById('demo-11labs-key-input'); if (ki) ki.value = elevenLabsApiKey; }

    // Event listeners
    document.getElementById('demo-prev').addEventListener('click', prevStep);
    document.getElementById('demo-next').addEventListener('click', nextStep);
    document.getElementById('demo-expand').addEventListener('click', toggleExpand);
    document.getElementById('demo-voiceover').addEventListener('click', toggleVoiceover);
    document.getElementById('demo-speed').addEventListener('click', cycleSpeed);
    // Long-press voiceover button (500ms) → open voice settings
    (function() {
      var _lp = null;
      var vob = document.getElementById('demo-voiceover');
      vob.addEventListener('mousedown', function() { _lp = setTimeout(function() { _lp = null; openVoiceModal(); }, 500); });
      vob.addEventListener('mouseup',    function() { if (_lp) { clearTimeout(_lp); _lp = null; } });
      vob.addEventListener('mouseleave', function() { if (_lp) { clearTimeout(_lp); _lp = null; } });
    })();

    // Splash Begin button → advance to next step
    var beginBtn = document.getElementById('splash-begin-btn');
    if (beginBtn) beginBtn.addEventListener('click', nextStep);

    // Jump-to-step popover (triggered by G key only)
    var jumpPop = document.getElementById('demo-jump-popover');
    var jumpInput = document.getElementById('demo-jump-input');
    var jumpGo = document.getElementById('demo-jump-go');

    function toggleJumpPopover() {
      var open = jumpPop.style.display !== 'none';
      jumpPop.style.display = open ? 'none' : 'block';
      if (!open) { jumpInput.value = ''; jumpInput.focus(); }
    }

    function executeJump() {
      var num = parseInt(jumpInput.value, 10);
      if (num >= 1 && num <= steps.length) {
        jumpPop.style.display = 'none';
        goToStep(num - 1);
      } else {
        jumpInput.style.borderColor = '#ef4444';
        setTimeout(function() { jumpInput.style.borderColor = 'var(--steel-600,#475569)'; }, 800);
      }
    }

    jumpGo.addEventListener('click', function(e) { e.stopPropagation(); executeJump(); });
    jumpInput.addEventListener('keydown', function(e) {
      e.stopPropagation(); // prevent arrow keys from navigating steps
      if (e.key === 'Enter') executeJump();
      if (e.key === 'Escape') jumpPop.style.display = 'none';
    });

    // Close popover on outside click
    document.addEventListener('click', function(e) {
      if (jumpPop.style.display !== 'none' && !document.getElementById('demo-jump-wrap').contains(e.target)) {
        jumpPop.style.display = 'none';
      }
    });

    // Keyboard nav
    document.addEventListener('keydown', function(e) {
      // Cmd+Shift+M (Mac) / Ctrl+Shift+M (Win) — toggle manual mode
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        toggleManualMode();
        return;
      }
      // Don't hijack keys when jump input is focused
      if (document.activeElement === jumpInput) return;
      // In manual mode, disable all walkthrough shortcuts — user navigates freely
      if (manualMode) return;
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextStep(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevStep(); }
      if (e.key === 'e' || e.key === 'E') { e.preventDefault(); toggleExpand(); }
      if (e.key === 'g' || e.key === 'G') { e.preventDefault(); toggleJumpPopover(); }
    });
  }

  // ── Expand / Collapse Toggle ───────────────────────────────
  function toggleExpand() {
    trayExpanded = !trayExpanded;
    var tray = document.getElementById('demo-tray');
    var dialogArea = document.getElementById('demo-dialog-area');
    var expandBtn = document.getElementById('demo-expand');

    if (trayExpanded) {
      tray.classList.add('demo-tray-expanded');
      dialogArea.style.display = 'block';
      expandBtn.classList.add('demo-nav-btn-active');
      expandBtn.title = 'Collapse script dialog';
    } else {
      tray.classList.remove('demo-tray-expanded');
      dialogArea.style.display = 'none';
      expandBtn.classList.remove('demo-nav-btn-active');
      expandBtn.title = 'Show full script dialog';
    }

    // Re-adjust body padding & action tray position, then reposition pointer
    adjustLayout(true);
  }

  // ── Manual Mode (Cmd+M) ──────────────────────────────────
  // Toggles between guided walkthrough and free-roam mode.
  // ON:  Hide tray entirely, remove pointer, jump to Dashboard, user explores freely.
  // OFF: Restore tray, restart walkthrough from the beginning (splash screen).
  function toggleManualMode() {
    manualMode = !manualMode;

    var pointer = document.getElementById('demo-pointer');
    var tray = document.getElementById('demo-tray');

    if (manualMode) {
      // Stop voiceover if playing
      if (voiceoverEnabled) {
        voiceoverEnabled = false;
        updateVoiceoverIcon();
        stopSpeaking();
      }
      // Hide mouse pointer completely
      if (pointer) pointer.style.display = 'none';
      // Hide the entire tray
      if (tray) tray.style.display = 'none';
      // Remove body padding that the tray was occupying
      var allPages = document.querySelectorAll('.page');
      for (var pi = 0; pi < allPages.length; pi++) {
        allPages[pi].style.paddingBottom = '0px';
      }
      var actionTray = document.querySelector('.action-tray');
      if (actionTray) actionTray.style.bottom = '0px';
      // Dismiss any transition overlays
      setTransitionOverlay('');
      // Navigate to the Dashboard screen
      if (typeof navigateTo === 'function') {
        navigateTo('dashboard');
      }
      var pg = getActivePage();
      if (pg) pg.scrollTop = 0;
    } else {
      // Full page reload to reset all prototype state cleanly
      // (manual mode interactions change filters, tables, cards, etc.)
      window.location.reload();
      return;
    }
  }

  // ── Voiceover ──────────────────────────────────────────────
  function openVoiceModal() {
    if (useGoogleTts)     window.demoSwitchVoiceTab('google');
    else if (useElevenLabs) window.demoSwitchVoiceTab('eleven');
    else                  window.demoSwitchVoiceTab('google');
    document.getElementById('demo-11labs-modal').style.display = 'flex';
  }

  function toggleVoiceover() {
    // First click with no engine configured → show voice settings modal
    if (!voiceoverEnabled && !useGoogleTts && !useElevenLabs && !googleTtsApiKey && !elevenLabsApiKey) {
      openVoiceModal();
      return;
    }

    voiceoverEnabled = !voiceoverEnabled;
    updateVoiceoverIcon();
    if (voiceoverEnabled) {
      if (useGoogleTts && googleTtsAudio && !googleTtsAudio.ended && googleTtsAudio.paused && currentSpeechStep === currentStep) {
        googleTtsAudio.play();
      } else if (useElevenLabs && elevenLabsAudio && !elevenLabsAudio.ended && elevenLabsAudio.paused && currentSpeechStep === currentStep) {
        elevenLabsAudio.play();
      } else if (!useGoogleTts && !useElevenLabs && currentSpeechStep === currentStep && currentSpeechText && currentCharOffset > 0) {
        speakFromChar(currentCharOffset);
      } else {
        speakStep(steps[currentStep]);
      }
    } else {
      stopSpeaking();
    }
  }

  function updateVoiceoverIcon() {
    var btn = document.getElementById('demo-voiceover');
    var playIcon = document.getElementById('demo-vo-play');
    var pauseIcon = document.getElementById('demo-vo-pause');
    if (!btn) return;
    if (voiceoverEnabled) {
      btn.classList.add('demo-nav-btn-active');
      btn.title = 'Pause voiceover';
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    } else {
      btn.classList.remove('demo-nav-btn-active');
      btn.title = 'Play voiceover narration';
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    }
  }

  function cycleSpeed() {
    voiceoverSpeedIdx = (voiceoverSpeedIdx + 1) % voiceoverSpeeds.length;
    var label = voiceoverSpeeds[voiceoverSpeedIdx];
    var btn = document.getElementById('demo-speed');
    if (btn) btn.textContent = label + 'x';

    if (useGoogleTts) {
      if (googleTtsAudio && !googleTtsAudio.ended) googleTtsAudio.playbackRate = voiceoverSpeeds[voiceoverSpeedIdx];
    } else if (useElevenLabs) {
      if (elevenLabsAudio && !elevenLabsAudio.ended) elevenLabsAudio.playbackRate = voiceoverSpeeds[voiceoverSpeedIdx];
    } else {
      if (voiceoverEnabled && window.speechSynthesis.speaking) {
        var resumeFrom = currentCharOffset;
        stopSpeaking();
        speechGeneration++;
        speakFromChar(resumeFrom);
      }
    }
  }

  // ── Text Cleaning (shared by both engines) ─────────────────
  function cleanDialogText(step) {
    var text = step.dialog || step.desc || '';
    if (!text) return '';
    // Remove ➤ action cue lines
    var lines = text.split('\n');
    var kept = [];
    for (var li = 0; li < lines.length; li++) {
      var trimmed = lines[li].trim();
      if (trimmed.indexOf('\u27A4') === 0) continue;
      if (trimmed) kept.push(trimmed);
    }
    text = kept.join('. ');
    // Strip emoji
    text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu, '');
    text = text.replace(/\u27A4/g, '');
    text = text.replace(/\.\s*\./g, '.').replace(/,\s*\./g, '.').replace(/\s{2,}/g, ' ').trim();
    return text;
  }

  // ── ElevenLabs TTS Engine ─────────────────────────────────
  function fetchElevenLabsAudio(text, stepIndex) {
    // Return cached audio if available
    if (elevenLabsCache[stepIndex]) {
      return Promise.resolve(elevenLabsCache[stepIndex]);
    }
    // Prevent duplicate fetches
    if (elevenLabsFetching[stepIndex]) {
      return new Promise(function(resolve) {
        var check = setInterval(function() {
          if (elevenLabsCache[stepIndex]) { clearInterval(check); resolve(elevenLabsCache[stepIndex]); }
          if (!elevenLabsFetching[stepIndex] && !elevenLabsCache[stepIndex]) { clearInterval(check); resolve(null); }
        }, 100);
      });
    }
    elevenLabsFetching[stepIndex] = true;

    return fetch('https://api.elevenlabs.io/v1/text-to-speech/' + elevenLabsVoiceId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    }).then(function(resp) {
      elevenLabsFetching[stepIndex] = false;
      if (!resp.ok) {
        console.warn('ElevenLabs API error:', resp.status, '— falling back to system voice');
        return null;
      }
      return resp.blob();
    }).then(function(blob) {
      if (!blob) return null;
      var url = URL.createObjectURL(blob);
      elevenLabsCache[stepIndex] = url;
      return url;
    }).catch(function(err) {
      elevenLabsFetching[stepIndex] = false;
      console.warn('ElevenLabs fetch failed:', err);
      return null;
    });
  }

  // Pre-fetch the NEXT step's audio while current step plays
  // ── TTS error toast ──────────────────────────────────────────
  function showTtsError(msg) {
    var existing = document.getElementById('demo-tts-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.id = 'demo-tts-toast';
    toast.style.cssText = 'position:fixed;bottom:110px;left:50%;transform:translateX(-50%);z-index:100010;background:#7f1d1d;color:#fecaca;border:1px solid #dc2626;border-radius:8px;padding:10px 18px;font-size:13px;font-family:system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.4);max-width:90vw;text-align:center;cursor:pointer';
    toast.textContent = '\u26A0\uFE0F ' + msg;
    toast.title = 'Click to open Voice Settings';
    toast.addEventListener('click', function() { toast.remove(); openVoiceModal(); });
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 8000);
  }

  // ── Google Cloud TTS Engine ──────────────────────────────────
  function fetchGoogleTTSAudio(text, stepIndex) {
    if (googleTtsCache[stepIndex]) return Promise.resolve(googleTtsCache[stepIndex]);
    if (googleTtsFetching[stepIndex]) {
      return new Promise(function(resolve) {
        var check = setInterval(function() {
          if (googleTtsCache[stepIndex])  { clearInterval(check); resolve(googleTtsCache[stepIndex]); }
          if (!googleTtsFetching[stepIndex] && !googleTtsCache[stepIndex]) { clearInterval(check); resolve(null); }
        }, 100);
      });
    }
    googleTtsFetching[stepIndex] = true;
    return fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + googleTtsApiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text: text },
        voice: { languageCode: 'en-US', name: googleTtsVoice },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 1.05 }
      })
    }).then(function(resp) {
      googleTtsFetching[stepIndex] = false;
      if (!resp.ok) {
        return resp.json().then(function(errBody) {
          var msg = (errBody && errBody.error && errBody.error.message) ? errBody.error.message : ('HTTP ' + resp.status);
          console.error('Google TTS error:', msg);
          showTtsError('Google TTS: ' + msg);
          return null;
        }).catch(function() {
          console.error('Google TTS HTTP error:', resp.status);
          showTtsError('Google TTS error ' + resp.status + ' — check API key & billing');
          return null;
        });
      }
      return resp.json();
    }).then(function(data) {
      if (!data || !data.audioContent) return null;
      var url = 'data:audio/mp3;base64,' + data.audioContent;
      googleTtsCache[stepIndex] = url;
      return url;
    }).catch(function(err) {
      googleTtsFetching[stepIndex] = false;
      console.error('Google TTS fetch failed:', err);
      showTtsError('Google TTS unreachable — check your network');
      return null;
    });
  }

  function playGoogleTTSAudio(dataUrl, myGen) {
    if (myGen !== speechGeneration) return;
    googleTtsAudio = new Audio(dataUrl);
    googleTtsAudio.playbackRate = voiceoverSpeeds[voiceoverSpeedIdx];
    googleTtsAudio.onended = function() { if (myGen !== speechGeneration) return; autoAdvanceAfterSpeech(); };
    googleTtsAudio.onerror = function() { if (myGen !== speechGeneration) return; speakFromChar(0); };
    googleTtsAudio.play().catch(function(e) { console.warn('Audio play blocked:', e); });
    prefetchNextStep();
  }

  function prefetchNextStep() {
    var nextIdx = currentStep + 1;
    if (nextIdx >= steps.length) return;
    var nextText = cleanDialogText(steps[nextIdx]);
    if (useGoogleTts && nextText && !googleTtsCache[nextIdx]) {
      fetchGoogleTTSAudio(nextText, nextIdx);
    } else if (useElevenLabs && nextText && !elevenLabsCache[nextIdx]) {
      fetchElevenLabsAudio(nextText, nextIdx);
    }
  }

  function playElevenLabsAudio(blobUrl, myGen) {
    if (myGen !== speechGeneration) return;
    elevenLabsAudio = new Audio(blobUrl);
    elevenLabsAudio.playbackRate = voiceoverSpeeds[voiceoverSpeedIdx];
    elevenLabsAudio.onended = function() {
      if (myGen !== speechGeneration) return;
      autoAdvanceAfterSpeech();
    };
    elevenLabsAudio.onerror = function() {
      if (myGen !== speechGeneration) return;
      console.warn('ElevenLabs audio playback error');
    };
    elevenLabsAudio.play().catch(function(e) { console.warn('Audio play blocked:', e); });
    // Pre-fetch next step while this one plays
    prefetchNextStep();
  }

  // ── Web Speech API Fallback ───────────────────────────────
  var _cachedVoice = null;
  var _voiceCacheReady = false;
  function getBestVoice() {
    if (_voiceCacheReady) return _cachedVoice;
    var voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    var prefs = [
      'Evan (Premium)', 'Ava (Premium)', 'Tom (Premium)', 'Zoe (Premium)',
      'Evan (Enhanced)', 'Ava (Enhanced)', 'Tom (Enhanced)', 'Zoe (Enhanced)',
      'Google US English', 'Google UK English Male', 'Google UK English Female',
      'Microsoft Guy Online (Natural) - English (United States)',
      'Microsoft Aria Online (Natural) - English (United States)',
      'Evan', 'Ava', 'Tom', 'Samantha', 'Daniel', 'Karen'
    ];
    var best = null;
    for (var i = 0; i < prefs.length; i++) {
      best = voices.find(function(v) { return v.name === prefs[i]; });
      if (best) break;
    }
    if (!best) best = voices.find(function(v) { return v.lang.indexOf('en') === 0 && v.localService; });
    if (!best) best = voices.find(function(v) { return v.lang.indexOf('en') === 0; });
    _cachedVoice = best;
    _voiceCacheReady = true;
    return best;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = function() { _voiceCacheReady = false; };
    }
  }

  function speakFromChar(charOffset) {
    if (!currentSpeechText) return;
    var remaining = currentSpeechText.substring(charOffset).trim();
    if (!remaining) { autoAdvanceAfterSpeech(); return; }
    var myGen = speechGeneration;
    var voice = getBestVoice();
    var utt = new SpeechSynthesisUtterance(remaining);
    voiceoverUtterance = utt;
    utt.rate = 0.92 * voiceoverSpeeds[voiceoverSpeedIdx];
    utt.pitch = 1.05;
    utt.volume = 1.0;
    if (voice) utt.voice = voice;
    utt.onboundary = function(e) {
      if (myGen !== speechGeneration) return;
      if (e.name === 'word') currentCharOffset = charOffset + e.charIndex;
    };
    utt.onend = function() {
      if (myGen !== speechGeneration) return;
      currentCharOffset = currentSpeechText.length;
      autoAdvanceAfterSpeech();
    };
    utt.onerror = function() {
      if (myGen !== speechGeneration) return;
      currentCharOffset = currentSpeechText.length;
    };
    window.speechSynthesis.speak(utt);
  }

  // ── Shared: speakStep, autoAdvance, stopSpeaking ──────────
  function speakStep(step) {
    if (!voiceoverEnabled || !step) return;
    stopSpeaking();
    speechGeneration++;

    var text = cleanDialogText(step);
    if (!text) { autoAdvanceAfterSpeech(); return; }

    currentSpeechText = text;
    currentCharOffset = 0;
    currentSpeechStep = currentStep;

    if (useGoogleTts && googleTtsApiKey) {
      var myGen = speechGeneration;
      fetchGoogleTTSAudio(text, currentStep).then(function(dataUrl) {
        if (dataUrl) { playGoogleTTSAudio(dataUrl, myGen); }
        else { console.warn('Google TTS unavailable, falling back to system voice'); speakFromChar(0); }
      });
    } else if (useElevenLabs && elevenLabsApiKey) {
      var myGen2 = speechGeneration;
      fetchElevenLabsAudio(text, currentStep).then(function(blobUrl) {
        if (blobUrl) { playElevenLabsAudio(blobUrl, myGen2); }
        else { console.warn('ElevenLabs unavailable, falling back to system voice'); speakFromChar(0); }
      });
    } else {
      speakFromChar(0);
    }
  }

  function autoAdvanceAfterSpeech() {
    var myGen = speechGeneration;
    if (voiceoverEnabled && myGen === speechGeneration) {
      setTimeout(function() {
        if (myGen !== speechGeneration) return;
        if (!voiceoverEnabled) return;
        if (currentStep < steps.length - 1) { nextStep(); }
        else { voiceoverEnabled = false; updateVoiceoverIcon(); }
      }, 900);
    }
  }

  // ── Callout FAB ─────────────────────────────────────────────
  var _fabVisible = false;
  var _fabMouseX = 0, _fabMouseY = 0;
  var calloutOpen = false;
  var calloutPausedAutoplay = false; // tracks if we paused auto-play for the callout

  function positionFabAtPointer() {
    var fab = document.getElementById('demo-callout-fab');
    if (!fab || !_fabVisible) return;
    var fabSize = 36;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    // Read the demo pointer's current position
    var ptr = document.getElementById('demo-pointer');
    var px, py;
    if (ptr && ptr.style.display !== 'none' && ptr.style.left) {
      px = parseFloat(ptr.style.left) || 0;
      py = parseFloat(ptr.style.top) || 0;
    } else {
      // Fallback: center-right area above tray
      px = vw * 0.5;
      py = vh * 0.45;
    }
    // Place FAB just below and slightly right of the pointer fingertip
    var x = px + 10;
    var y = py + 40;
    // Clamp so FAB stays on screen
    if (x < 4) x = 4;
    if (x + fabSize > vw - 4) x = vw - fabSize - 4;
    if (y + fabSize > vh - 4) y = py - fabSize - 8; // flip above if near bottom
    if (y < 4) y = 4;
    fab.style.left = x + 'px';
    fab.style.top = y + 'px';
  }

  function updateCalloutFab(step) {
    var fab = document.getElementById('demo-callout-fab');
    if (!fab) return;
    if (step && step.callout) {
      _fabVisible = true;
      fab.style.display = 'flex';
      // Position will be set by positionFabAtPointer() after pointer settles
    } else {
      _fabVisible = false;
      fab.style.display = 'none';
      closeCalloutPanel();
    }
  }

  function toggleCalloutPanel() {
    if (calloutOpen) {
      closeCalloutPanel();
    } else {
      openCalloutPanel();
    }
  }

  function openCalloutPanel() {
    var step = steps[currentStep];
    if (!step || !step.callout) return;
    var c = step.callout;
    var panel = document.getElementById('demo-callout-panel');
    var label = document.getElementById('demo-callout-label');
    var textEl = document.getElementById('demo-callout-text');
    var icon = document.getElementById('demo-callout-icon');
    var header = document.getElementById('demo-callout-header');
    if (!panel) return;

    var accentColor = '#e8a820'; // gold highlight for all callout types

    header.style.color = 'rgba(255,255,255,.7)';
    label.textContent = c.label;
    icon.style.stroke = accentColor;

    // Render text with paragraphs
    var paragraphs = c.text.split('\n\n');
    textEl.innerHTML = paragraphs.map(function(p) {
      return '<p style="margin-bottom:10px">' + p.replace(/\n/g, '<br>') + '</p>';
    }).join('');

    // Position panel near the FAB (which follows demo pointer)
    var fab = document.getElementById('demo-callout-fab');
    var fabLeft = parseFloat(fab.style.left) || 0;
    var fabTop = parseFloat(fab.style.top) || 0;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var panelW = 360;
    var panelH = 320; // max-height

    // Horizontal: try to place panel aligned with FAB, clamped to screen
    var px = fabLeft;
    if (px + panelW > vw - 24) px = vw - panelW - 24;
    if (px < 24) px = 24;

    // Vertical: prefer above FAB, fall back to below
    var spaceAbove = fabTop;
    if (spaceAbove > panelH + 20) {
      panel.style.top = '';
      panel.style.bottom = (vh - fabTop + 12) + 'px';
    } else {
      panel.style.bottom = '';
      panel.style.top = (fabTop + 48) + 'px';
    }
    panel.style.right = '';
    panel.style.left = px + 'px';
    panel.style.display = 'block';
    calloutOpen = true;

    // If voiceover auto-play is running, pause it
    if (voiceoverEnabled) {
      calloutPausedAutoplay = true;
      voiceoverEnabled = false;
      updateVoiceoverIcon();
      stopSpeaking();
    }
  }

  function closeCalloutPanel() {
    var panel = document.getElementById('demo-callout-panel');
    if (panel) panel.style.display = 'none';
    calloutOpen = false;

    // Resume auto-play if we paused it
    if (calloutPausedAutoplay) {
      calloutPausedAutoplay = false;
      voiceoverEnabled = true;
      updateVoiceoverIcon();
      speakStep(steps[currentStep]);
    }
  }

  function stopSpeaking() {
    speechGeneration++;
    if (googleTtsAudio) { googleTtsAudio.pause(); googleTtsAudio.currentTime = 0; googleTtsAudio = null; }
    if (elevenLabsAudio) { elevenLabsAudio.pause(); elevenLabsAudio.currentTime = 0; elevenLabsAudio = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    voiceoverUtterance = null;
  }

  // Find the currently visible .page element (the scroll container)
  function getActivePage() {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].style.display === 'block' || pages[i].classList.contains('active')) {
        return pages[i];
      }
    }
    return null;
  }

  function adjustLayout(repositionPointer) {
    // Double rAF ensures the browser has fully laid out the tray before measuring
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        var tray = document.getElementById('demo-tray');
        var h = tray.offsetHeight;
        // Pad ALL pages so content can scroll above the fixed tray
        var pad = h + 'px';
        var allPages = document.querySelectorAll('.page');
        for (var i = 0; i < allPages.length; i++) {
          allPages[i].style.paddingBottom = pad;
        }
        var actionTray = document.querySelector('.action-tray');
        if (actionTray) actionTray.style.bottom = h + 'px';

        // After layout settles, reposition pointer so it scrolls into view above the new tray
        if (repositionPointer && steps[currentStep]) {
          setTimeout(function() { positionPointer(steps[currentStep]); }, 50);
        }
      });
    });
  }

  // ── Pointer Hand ─────────────────────────────────────────
  let pointerEl = null;

  // Track the currently hovered target so we can remove hover on step change
  let currentHoverTarget = null;

  function buildPointer() {
    pointerEl = document.createElement('div');
    pointerEl.id = 'demo-pointer';
    // Both cursor types — arrow (default) and hand (for clickable targets)
    pointerEl.innerHTML = `
      <svg class="demo-cursor-arrow" width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#pa)">
          <path d="M1.5 1L1.5 18L5.5 14L9 21L12 19.5L8.5 13L14 13Z" fill="white" stroke="black" stroke-width="1.4" stroke-linejoin="round"/>
        </g>
        <defs>
          <filter id="pa" x="0" y="0" width="17" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feDropShadow dx="1" dy="1" stdDeviation="0.8" flood-color="#000" flood-opacity=".35"/>
          </filter>
        </defs>
      </svg>
      <svg class="demo-cursor-hand" width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
        <g filter="url(#ps)">
          <path d="M9.5 1C8.5 1 7.8 1.8 7.8 2.8L7.8 11.5L7 10.4C6.3 9.5 5.2 9.2 4.3 9.8C3.4 10.4 3.2 11.5 3.8 12.5L7 17.5L7.5 20C7.8 21.5 9 23 10.8 23.5L13 24C15 24.3 17 23.2 17.8 21.3L19 18C19.5 16.8 19.5 15.5 19.2 14.2L18.2 10C18 9 17 8.2 16 8.4C15.5 8.5 15 8.8 14.8 9.2L14.5 8C14.2 7 13.2 6.3 12.2 6.5C11.8 6.6 11.5 6.8 11.2 7.1L11.2 2.8C11.2 1.8 10.5 1 9.5 1Z" fill="white" stroke="black" stroke-width="1.6" stroke-linejoin="round"/>
        </g>
        <defs>
          <filter id="ps" x="0" y="0" width="22" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#000" flood-opacity=".35"/>
          </filter>
        </defs>
      </svg>
    `;
    document.body.appendChild(pointerEl);
  }

  function showArrowCursor() {
    if (!pointerEl) return;
    pointerEl.querySelector('.demo-cursor-arrow').style.display = '';
    pointerEl.querySelector('.demo-cursor-hand').style.display = 'none';
  }

  function showHandCursor() {
    if (!pointerEl) return;
    pointerEl.querySelector('.demo-cursor-arrow').style.display = 'none';
    pointerEl.querySelector('.demo-cursor-hand').style.display = '';
  }

  function clearHoverState() {
    if (currentHoverTarget) {
      currentHoverTarget.classList.remove('demo-hover-active');
      currentHoverTarget = null;
    }
  }

  // Check if an element is interactive (would show a hand cursor in a real browser)
  function isClickable(el) {
    if (!el) return false;
    var tag = el.tagName.toLowerCase();
    // Native interactive elements
    if (tag === 'button' || tag === 'a' || tag === 'select' || tag === 'input') return true;
    // Elements with explicit cursor pointer or role
    if (el.getAttribute('role') === 'button' || el.getAttribute('role') === 'link') return true;
    // Common clickable classes in the prototype
    var clickableClasses = [
      'btn-primary', 'btn-success', 'btn-danger', 'btn-ghost', 'btn-outline',
      'pin-btn', 'seg-btn', 'tab', 'nav-link',
      'rfq-card', 'report-card', 'metric-tile', 'tile', 'kanban-card',
      'chip', 'view-toggle-btn', 'sort-trigger', 'fb-funnel', 'th-sort',
      'data-table-row', 'dropdown-item', 'toggle-switch', 'checkbox-label'
    ];
    for (var i = 0; i < clickableClasses.length; i++) {
      if (el.classList.contains(clickableClasses[i])) return true;
    }
    // Also check parent for table rows (clicking a td should show hand for the tr)
    if (tag === 'td' && el.parentElement && el.parentElement.tagName.toLowerCase() === 'tr') {
      var table = el.closest('.data-table');
      if (table) return true;
    }
    // Check computed cursor style
    var cs = window.getComputedStyle(el);
    if (cs.cursor === 'pointer') return true;
    return false;
  }

  function positionPointer(step) {
    if (!pointerEl) return;
    // In manual mode, keep pointer hidden and don't auto-scroll
    if (manualMode) {
      pointerEl.style.display = 'none';
      return;
    }
    clearHoverState();

    if (!step.clickTarget) {
      // No target — show arrow in a neutral position
      showArrowCursor();
      pointerEl.style.display = 'block';
      var tray = document.getElementById('demo-tray');
      var trayH = tray ? tray.offsetHeight : 90;
      pointerEl.style.left = (window.innerWidth * 0.5) + 'px';
      pointerEl.style.top = ((window.innerHeight - trayH) * 0.45) + 'px';
      return;
    }

    // Try each selector in comma-separated list
    const selectors = step.clickTarget.split(',').map(function(s) { return s.trim(); });
    let target = null;
    for (let i = 0; i < selectors.length; i++) {
      target = document.querySelector(selectors[i]);
      if (target) break;
    }
    if (!target) {
      showArrowCursor();
      pointerEl.style.display = 'block';
      var tray2 = document.getElementById('demo-tray');
      var trayH2 = tray2 ? tray2.offsetHeight : 90;
      pointerEl.style.left = (window.innerWidth * 0.5) + 'px';
      pointerEl.style.top = ((window.innerHeight - trayH2) * 0.45) + 'px';
      return;
    }

    // Check if target is inside a fixed-position container (action tray, demo tray)
    // Fixed elements are already visible — no page scrolling needed
    var isFixed = false;
    var ancestor = target;
    while (ancestor && ancestor !== document.body) {
      if (ancestor.id === 'action-tray' || ancestor.id === 'demo-tray') { isFixed = true; break; }
      var pos = window.getComputedStyle(ancestor).position;
      if (pos === 'fixed') { isFixed = true; break; }
      ancestor = ancestor.parentElement;
    }

    if (isFixed) {
      // Target is in a fixed container — place pointer directly, no scroll
      placePointerOnTarget(target);
      return;
    }

    // Scroll the target into view within the active .page scroll container
    var trayEl = document.getElementById('demo-tray');
    var trayH = trayEl ? trayEl.offsetHeight : 90;
    var safeZone = 60;
    var visibleBottom = window.innerHeight - trayH - safeZone;
    var targetRect = target.getBoundingClientRect();
    var scrollContainer = getActivePage();

    if (targetRect.bottom > visibleBottom || targetRect.top < 60) {
      // Scroll the .page container so target is visible above the tray
      if (scrollContainer) {
        var desiredViewportPos = Math.min(visibleBottom * 0.35, 200);
        var scrollDelta = targetRect.top - desiredViewportPos;
        scrollContainer.scrollBy({ top: scrollDelta, behavior: 'smooth' });
      }
      // Wait for scroll to finish, then position pointer
      setTimeout(function() { placePointerOnTarget(target); }, 400);
    } else {
      placePointerOnTarget(target);
    }
  }

  function placePointerOnTarget(target) {
    // Position on the target using fresh viewport coords after any scroll
    pointerEl.style.display = 'block';
    const rect = target.getBoundingClientRect();
    // Guard: if element has zero dimensions (hidden/display:none parent), fall back to center
    if (rect.width === 0 && rect.height === 0) {
      var trayFb = document.getElementById('demo-tray');
      var trayHFb = trayFb ? trayFb.offsetHeight : 90;
      pointerEl.style.left = (window.innerWidth * 0.5) + 'px';
      pointerEl.style.top = ((window.innerHeight - trayHFb) * 0.45) + 'px';
      return;
    }
    const x = rect.left + rect.width * 0.55;
    const y = rect.top + rect.height * 0.25;
    pointerEl.style.left = x + 'px';
    pointerEl.style.top = y + 'px';

    // Show hand only if the target is actually interactive, otherwise arrow
    if (isClickable(target)) {
      showHandCursor();
      target.classList.add('demo-hover-active');
      currentHoverTarget = target;
    } else {
      showArrowCursor();
    }
  }

  // ── Navigation ────────────────────────────────────────────
  let lastPage = '';
  function goToStep(index) {
    if (index < 0 || index >= steps.length) return;
    // Immediately kill any in-flight speech and invalidate stale callbacks
    stopSpeaking();
    // Close any open callout panel (without resuming auto-play)
    calloutPausedAutoplay = false;
    if (calloutOpen) { var cp = document.getElementById('demo-callout-panel'); if (cp) cp.style.display = 'none'; calloutOpen = false; }
    speechGeneration++;
    currentStep = index;
    const step = steps[currentStep];

    // Navigate prototype to the correct page
    // Always verify the correct page is active (a click handler may have navigated away)
    var pageChanged = (step.page !== lastPage);
    lastPage = step.page;
    var expectedPageEl = document.getElementById('page-' + step.page);
    var pageActuallyWrong = expectedPageEl && !expectedPageEl.classList.contains('active');
    if (pageChanged || pageActuallyWrong) {
      if (typeof navigateTo === 'function') {
        navigateTo(step.page);
      }
      // Scroll to top when landing on a new page (scroll the .page container)
      var pg = getActivePage();
      if (pg) pg.scrollTop = 0;
    }

    // Swap welcome page content for end screen
    var splashBegin = document.getElementById('splash-begin-btn');
    var splashThankYou = document.getElementById('splash-thank-you');
    var splashTagline = document.getElementById('splash-tagline');
    if (step.scene === 'END' && step.page === 'splash') {
      if (splashBegin) splashBegin.style.display = 'none';
      if (splashTagline) splashTagline.style.display = 'none';
      if (splashThankYou) splashThankYou.style.display = '';
    } else {
      if (splashBegin) splashBegin.style.display = '';
      if (splashTagline) splashTagline.style.display = '';
      if (splashThankYou) splashThankYou.style.display = 'none';
    }

    // Update tray content
    const actBadge = document.getElementById('demo-act-badge');
    const sceneNum = document.getElementById('demo-scene-num');
    const title    = document.getElementById('demo-title');
    const persona  = document.getElementById('demo-persona');
    const desc     = document.getElementById('demo-desc');
    const dialog   = document.getElementById('demo-dialog');
    const counter  = document.getElementById('demo-counter');
    const progress = document.getElementById('demo-progress-bar');

    const color = actColors[step.act] || '#d4960f';

    if (step.act === 0) {
      actBadge.textContent = 'INTRO';
    } else if (step.scene === 'END') {
      actBadge.textContent = 'END';
    } else if (step.scene === '\u2014') {
      actBadge.textContent = '\u23F8 TRANSITION';
    } else {
      actBadge.textContent = 'ACT ' + step.act;
    }
    actBadge.style.background = color + '22';
    actBadge.style.color = color;

    sceneNum.textContent = step.scene !== '\u2014' ? step.scene : '';
    title.textContent = step.title;
    persona.textContent = step.persona ? '\uD83D\uDC64 ' + step.persona : '';
    desc.textContent = step.desc;

    // Populate dialog (convert \n to paragraphs)
    if (step.dialog) {
      var paragraphs = step.dialog.split('\n\n');
      dialog.innerHTML = paragraphs.map(function(p) {
        return '<p class="demo-dialog-p">' + p.replace(/\n/g, '<br>') + '</p>';
      }).join('');
    } else {
      dialog.innerHTML = '';
    }

    counter.textContent = (currentStep + 1) + ' / ' + steps.length;

    // Progress bar
    const pct = ((currentStep) / (steps.length - 1)) * 100;
    progress.style.width = pct + '%';
    progress.style.background = color;

    // Disable buttons at boundaries
    document.getElementById('demo-prev').style.opacity = currentStep === 0 ? '0.3' : '1';
    document.getElementById('demo-prev').style.pointerEvents = currentStep === 0 ? 'none' : 'auto';
    document.getElementById('demo-next').style.opacity = currentStep === steps.length - 1 ? '0.3' : '1';
    document.getElementById('demo-next').style.pointerEvents = currentStep === steps.length - 1 ? 'none' : 'auto';

    // Scroll dialog area back to top on step change
    var dialogArea = document.getElementById('demo-dialog-area');
    if (dialogArea) dialogArea.scrollTop = 0;

    // Re-measure tray height for body padding & action tray
    adjustLayout();

    // Update callout FAB visibility
    updateCalloutFab(step);

    // Voiceover: stop any current speech and speak the new step
    if (voiceoverEnabled) {
      // Small delay to let the page settle before speaking
      setTimeout(function() { speakStep(step); }, 400);
    }

    // ── Step-aware UI state + pointer positioning ────────
    // Delay to let navigateTo() and action tray fully settle
    setTimeout(function() {
      // Manage Comparison Analysis expand/collapse per step
      setComparisonState(step.id === '1.3b');

      // For 1.3b: scroll the page so the expanded detail is visible
      // but the ML Comparison Analysis header is near the top
      if (step.id === '1.3b') {
        var compCard = document.getElementById('rfq-comparison-table');
        var pg = getActivePage();
        if (compCard && pg) {
          // Find the card's parent (.card) to include the title
          var cardParent = compCard.closest('.card') || compCard;
          var el = cardParent;
          var offset = 0;
          while (el && el !== pg) {
            offset += el.offsetTop;
            el = el.offsetParent;
          }
          pg.scrollTop = Math.max(0, offset - 20);
        }
      }

      // Manage tablet login state (badge scan vs PIN phase)
      setTabletLoginState(step.id);

      // Manage PIN pad dot state per step
      setPinState(step.id);

      // Manage scan confirmation banner per step
      setScanConfirmationState(step.id);

      // Manage Quick Look Share state per step
      setQuickLookShareState(step.id);

      // Manage Quote Output approval state per step
      setQuoteApprovalState(step.id);

      // Manage RFQ list/cards view state per step
      setRfqViewState(step.id);

      // Manage NCR photo state
      setNcrPhotoState(step.id);

      // Manage NCR disposition state
      setNcrDispositionState(step.id);

      // Manage shipyard acceptance state (Act 5)
      setShipyardAcceptanceState(step.id);

      // Manage report overlay state (open for 5.2c, closed otherwise)
      setReportOverlayState(step.id);

      // Manage transition overlay (time-skip screens)
      setTransitionOverlay(step.id);

      // Paste text animation for RFQ AI Extract step (1.8b)
      setRfqPasteState(step.id);

      // Extra delay for pointer to let DOM fully settle (tray re-render)
      setTimeout(function() {
        positionPointer(step);
        // Position callout FAB near the demo pointer after it settles
        setTimeout(function() { positionFabAtPointer(); }, 450);
      }, 100);
    }, 200);
  }

  // ── Scan confirmation state management ────────────────
  // Progressive scan status: part scan → station scan → full confirmation
  function setScanConfirmationState(stepId) {
    var partBanner = document.getElementById('scan-confirm-part');
    var stationBanner = document.getElementById('scan-confirm-station');
    var fullBanner = document.getElementById('scan-confirmation');
    if (!partBanner) return;
    // 3.3b: part scanned, about to scan station
    // 3.3c: both scanned, full confirmation
    var showPart = (stepId === '3.3b' || stepId === '3.3c' || stepId === '3.4a' || stepId === '3.4b');
    var showStation = (stepId === '3.3c' || stepId === '3.4a' || stepId === '3.4b');
    var showFull = (stepId === '3.3c' || stepId === '3.4a' || stepId === '3.4b');
    partBanner.style.display = showPart ? 'block' : 'none';
    stationBanner.style.display = showStation ? 'block' : 'none';
    fullBanner.style.display = showFull ? 'block' : 'none';
    // Hide part + station when full confirmation is showing (replaces them)
    if (showFull) {
      partBanner.style.display = 'none';
      stationBanner.style.display = 'none';
    }
  }

  // ── Tablet login state management ────────────────
  // Controls badge scan vs PIN phase, and how many PIN dots are filled.
  // 3.1a = badge scan phase, 3.1b+ = PIN phase
  function setTabletLoginState(stepId) {
    var badgePhase = document.getElementById('tablet-badge-scan');
    var pinPhase = document.getElementById('tablet-pin-phase');
    var badgeSuccess = document.getElementById('badge-scan-success');
    if (!badgePhase || !pinPhase) return;

    if (stepId === '3.1a') {
      // Badge scan step — show badge phase, hide PIN
      badgePhase.style.display = '';
      pinPhase.style.display = 'none';
      if (badgeSuccess) badgeSuccess.style.display = 'none';
    } else if (stepId === '3.1b' || stepId === '3.1c' || stepId === '3.1d') {
      // PIN steps — hide badge phase, show PIN
      badgePhase.style.display = 'none';
      pinPhase.style.display = '';
    } else {
      // Default: show badge phase (for when navigating back)
      badgePhase.style.display = '';
      pinPhase.style.display = 'none';
      if (badgeSuccess) badgeSuccess.style.display = 'none';
    }
  }

  function setPinState(stepId) {
    var dots = document.querySelectorAll('#pin-dots .pin-dot');
    if (!dots.length) return;
    var filled = 4; // default: all filled
    if (stepId === '3.1b') filled = 2;
    else if (stepId === '3.1c') filled = 3;
    dots.forEach(function(dot, i) {
      if (i < filled) {
        dot.textContent = '\u2022';
        dot.style.borderColor = 'var(--steel-400)';
      } else if (i === filled) {
        dot.textContent = '';
        dot.style.borderColor = 'var(--cyan-500)';
      } else {
        dot.textContent = '';
        dot.style.borderColor = 'var(--steel-600)';
      }
    });
  }

  // ── Quick Look Share state management ────────────────
  // Controls team checkmarks, message text, and comments visibility
  // based on where we are in the 1.4 step sequence.
  function setQuickLookShareState(stepId) {
    var daveCheck = document.querySelector('#ql-team-dave .ql-check');
    var sarahCheck = document.querySelector('#ql-team-sarah .ql-check');
    var msgBox = document.getElementById('ql-message');
    var commentsCard = document.getElementById('ql-team-comments');

    // Determine state based on step progression
    var teamSelected = ['1.4c', '1.4d', '1.4e'].indexOf(stepId) >= 0;
    var msgFilled = ['1.4d', '1.4e'].indexOf(stepId) >= 0;
    var commentsVisible = (stepId === '1.4e');

    // Toggle team checkmarks
    if (daveCheck && sarahCheck) {
      if (teamSelected) {
        daveCheck.textContent = 'check_circle';
        daveCheck.style.color = 'var(--success)';
        sarahCheck.textContent = 'check_circle';
        sarahCheck.style.color = 'var(--success)';
      } else {
        daveCheck.textContent = 'radio_button_unchecked';
        daveCheck.style.color = 'var(--steel-500)';
        sarahCheck.textContent = 'radio_button_unchecked';
        sarahCheck.style.color = 'var(--steel-500)';
      }
    }

    // Fill or clear message
    if (msgBox) {
      msgBox.value = msgFilled
        ? 'Hey, take a look at this part \u2014 what do you think on weld hours and process?'
        : '';
    }

    // Show/hide Team Comments card (only after team has responded)
    if (commentsCard) {
      commentsCard.style.display = commentsVisible ? '' : 'none';
    }
  }

  // ── Quote Approval state management ────────────────
  // After clicking Approve (1.6b), update the step bar and hide the buttons
  function setQuoteApprovalState(stepId) {
    var stepPending = document.getElementById('quote-step-pending');
    var stepApproved = document.getElementById('quote-step-approved');
    var approvalInfo = document.getElementById('quote-approval-info');
    var approvalBtns = document.getElementById('quote-approval-btns');
    if (!stepPending) return;

    var isApproved = (stepId === '1.6c');

    if (isApproved) {
      // Move step bar to Approved
      stepPending.className = 'step done';
      stepApproved.className = 'step done';
      approvalInfo.textContent = 'Approved by Maria · Feb 12, 2026 3:48 PM';
      approvalBtns.style.display = 'none';
    } else {
      // Reset to Pending Approval
      stepPending.className = 'step current';
      stepApproved.className = 'step';
      approvalInfo.textContent = 'Submitted for approval by Maria · Feb 12, 2026 3:42 PM';
      approvalBtns.style.display = '';
    }
  }

  // ── RFQ View state management ────────────────
  // Switch between list and cards view on the RFQs page for demo steps
  function setRfqViewState(stepId) {
    if (typeof switchRfqView !== 'function') return;
    if (stepId === '1.7c' || stepId === '1.7d') {
      switchRfqView('cards');
    } else if (stepId === '1.7a' || stepId === '1.7b') {
      switchRfqView('list');
    }
  }

  // ── NCR Photo state management ────────────────
  // Shows photo thumbnails from step 4.1b onward (through 4.1c)
  function setNcrPhotoState(stepId) {
    var photo1 = document.getElementById('ncr-photo-1');
    var photo2 = document.getElementById('ncr-photo-2');
    var cameraBtn = document.getElementById('ncr-camera-btn');
    if (!photo1 || !photo2) return;
    var showPhotos = (stepId === '4.1b2' || stepId === '4.1c');
    photo1.style.display = showPhotos ? 'block' : 'none';
    photo2.style.display = showPhotos ? 'block' : 'none';
    // Camera button hover state when pointer is on it
    if (cameraBtn) {
      if (stepId === '4.1b') {
        cameraBtn.style.borderColor = 'var(--cyan-400)';
        cameraBtn.style.background = 'rgba(6,182,212,.08)';
        cameraBtn.style.color = 'var(--cyan-400)';
      } else {
        cameraBtn.style.borderColor = '';
        cameraBtn.style.background = '';
        cameraBtn.style.color = '';
      }
    }
  }

  // ── NCR Disposition state management ────────────────
  // Manages disposition card state across steps 4.2a–4.3 and transition-4
  function setNcrDispositionState(stepId) {
    var dispCard = document.getElementById('ncr-disposition-card');
    var dispSelect = document.getElementById('ncr-disp-select');
    var authSelect = document.getElementById('ncr-auth-select');
    var navseaSelect = document.getElementById('ncr-navsea-select');
    var dispNotes = document.getElementById('ncr-disp-notes');
    var dispBadge = document.getElementById('ncr-disp-badge');
    var submitBtn = document.getElementById('ncr-submit-disp-btn');
    var holdCard = document.getElementById('ncr-hold-signal-card');
    if (!dispCard) return;

    // Default: reset everything
    if (dispSelect) dispSelect.selectedIndex = 0;
    if (authSelect) authSelect.selectedIndex = 0;
    if (navseaSelect) navseaSelect.selectedIndex = 0;
    if (dispNotes) dispNotes.value = '';
    if (dispBadge) { dispBadge.textContent = 'Requires Engineering'; dispBadge.className = 'badge badge-navy'; }
    if (dispCard) dispCard.style.borderColor = 'var(--warning)';
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Disposition'; submitBtn.className = 'btn btn-success'; }
    if (holdCard) holdCard.style.display = 'none';
    // Remove dynamically added resolved entry
    var resolvedEl = document.getElementById('ncr-hold-resolved');
    if (resolvedEl) resolvedEl.remove();
    // Hide fake dropdown
    var fakeDd = document.getElementById('ncr-disp-fake-dropdown');
    if (fakeDd) fakeDd.style.display = 'none';

    // Step 4.2b: Show fake dropdown open with "Repair" highlighted
    if (stepId === '4.2b') {
      if (fakeDd) fakeDd.style.display = 'block';
    }
    // Step 4.2c: Repair selected, show hold signal card
    else if (stepId === '4.2c') {
      if (dispSelect) dispSelect.selectedIndex = 2;
      if (holdCard) holdCard.style.display = 'block';
    }
    // Step 4.3: Full disposition completed — Repair, authority signed, notes filled
    else if (stepId === '4.3' || stepId === 'transition-4') {
      if (dispSelect) dispSelect.selectedIndex = 2;
      if (authSelect) authSelect.selectedIndex = 3; // T. Williams — Weld Engineer
      if (navseaSelect) navseaSelect.selectedIndex = 0; // Not required
      if (dispNotes) dispNotes.value = 'Porosity within repair limits per WPS-HY80-GMAW-01 \u00A74.3. Grind-out and re-weld of affected area on brackets #4 and #6. Re-inspect per VT and RT.';
      if (dispBadge) { dispBadge.textContent = 'Disposition Complete'; dispBadge.className = 'badge badge-success'; }
      if (dispCard) dispCard.style.borderColor = 'var(--success)';
      if (holdCard) holdCard.style.display = 'block';

      // Show resolved signal in hold card
      var holdCardEl = document.getElementById('ncr-hold-signal-card');
      if (holdCardEl && stepId === '4.3') {
        // Add a resolved entry if not already present
        if (!document.getElementById('ncr-hold-resolved')) {
          var resolvedDiv = document.createElement('div');
          resolvedDiv.id = 'ncr-hold-resolved';
          resolvedDiv.style.cssText = 'position:relative;padding-top:14px';
          resolvedDiv.innerHTML = '<div style="position:absolute;left:-20px;top:17px;width:10px;height:10px;border-radius:50%;background:var(--success);border:2px solid var(--steel-850)"></div>'
            + '<div style="font-size:12px;font-weight:600;color:var(--success)">Delivery Hold Lifted</div>'
            + '<div style="font-size:11px;color:var(--steel-400)">Auto-sent \u00B7 Feb 12, 4:15 PM</div>'
            + '<div style="font-size:11px;color:var(--steel-300);margin-top:3px;padding:6px 8px;background:var(--steel-800);border-radius:6px;border-left:3px solid var(--success)">NCR-042 resolved. Disposition: Repair.<br>Delivery estimate restored to 3/10/27.</div>';
          var timeline = holdCardEl.querySelector('[style*="padding-left:24px"]');
          if (timeline) timeline.appendChild(resolvedDiv);
        }
      }
    }
  }

  // ── Shipyard Acceptance state management ────────────────
  // Updates the shipyard page for Act 5: shows submission package, all 12 brackets green,
  // signal at 100%, and adds J-2026-042 to acceptance events
  var shipyardAct5Applied = false;
  function setShipyardAcceptanceState(stepId) {
    var isAct5Shipyard = (stepId === '5.1a' || stepId === '5.1b');

    // Show/hide submission package card
    var pkgCard = document.getElementById('shipyard-submission-pkg');
    if (pkgCard) pkgCard.style.display = isAct5Shipyard ? 'block' : 'none';

    // Update deviation heatmap: all 12 brackets show as scanned with SVG bracket images
    var heatmap = document.querySelector('#shipyard-signal-card');
    if (heatmap && isAct5Shipyard && !shipyardAct5Applied) {
      // Convert pending wireframe brackets (#4-12) to scanned bracket SVGs matching #1-3
      var grid = heatmap.querySelectorAll('div[style*="aspect-ratio"]');
      grid.forEach(function(cell, i) {
        var num = i + 1;
        // Only update cells that are still pending (cells 4-12, i.e. index 3+)
        if (i >= 3) {
          cell.style.background = '#0a1a0a';
          cell.style.borderColor = 'rgba(34,197,94,.4)';
          // Slight variation in fill opacities per bracket
          var f1 = (0.10 + (num % 3) * 0.04).toFixed(2);
          var f2 = (0.15 + (num % 3) * 0.03).toFixed(2);
          var f3 = (0.18 + (num % 3) * 0.04).toFixed(2);
          var f4 = (0.12 + (num % 3) * 0.03).toFixed(2);
          var dev = (Math.random() * 0.04 + 0.01).toFixed(2);
          cell.innerHTML = '<svg viewBox="0 0 100 100" width="100%" height="100%" style="display:block"><rect width="100" height="100" fill="#0a1a0a"/>'
            + '<polygon points="20,80 50,90 80,80 50,60" fill="rgba(34,197,94,' + f1 + ')" stroke="rgba(34,197,94,.3)" stroke-width=".5"/>'
            + '<polygon points="30,75 30,40 50,28 50,60" fill="rgba(34,197,94,' + f2 + ')" stroke="rgba(34,197,94,.35)" stroke-width=".5"/>'
            + '<polygon points="50,60 50,28 70,40 70,75" fill="rgba(34,197,94,' + f3 + ')" stroke="rgba(34,197,94,.4)" stroke-width=".5"/>'
            + '<polygon points="30,40 50,28 70,40" fill="rgba(34,197,94,' + f4 + ')" stroke="rgba(34,197,94,.35)" stroke-width=".5"/>'
            + '<line x1="38" y1="48" x2="38" y2="72" stroke="rgba(250,180,50,.5)" stroke-width="1.5" stroke-dasharray="2,1.5"/>'
            + '<line x1="62" y1="48" x2="62" y2="72" stroke="rgba(250,180,50,.5)" stroke-width="1.5" stroke-dasharray="2,1.5"/>'
            + '<ellipse cx="45" cy="55" rx="6" ry="4" fill="rgba(34,197,94,.3)" stroke="rgba(34,197,94,.5)" stroke-width=".4"/>'
            + '<ellipse cx="55" cy="70" rx="6" ry="4" fill="rgba(34,197,94,.3)" stroke="rgba(34,197,94,.5)" stroke-width=".4"/>'
            + '<text x="50" y="14" text-anchor="middle" fill="rgba(34,197,94,.9)" font-size="8" font-weight="600">#' + num + '</text>'
            + '<text x="50" y="98" text-anchor="middle" fill="rgba(34,197,94,.6)" font-size="6">' + dev + 'mm</text>'
            + '</svg>';
        }
      });

      // Update signal percentage to 100%
      var pctEl = heatmap.querySelector('div[style*="font-size:42px"]');
      if (pctEl) { pctEl.textContent = '100%'; }
      var pctLabel = heatmap.querySelector('div[style*="font-size:42px"] + div');
      // Update progress bar
      var progBar = heatmap.querySelector('div[style*="width:25%"]');
      if (progBar) progBar.style.width = '100%';
      // Update "3 of 12" text
      var unitText = heatmap.querySelector('span[style*="font-size:11px"]');
      // Update stats boxes
      var statBoxes = heatmap.querySelectorAll('div[style*="padding:10px;background:var(--steel-800)"]');
      statBoxes.forEach(function(box) {
        var label = box.querySelector('div[style*="font-size:10px"]');
        var val = box.querySelector('div[style*="font-weight:700"]');
        if (!label || !val) return;
        var labelText = label.textContent;
        if (labelText === 'Open NCRs') { val.textContent = '0'; }
        else if (labelText === 'Geometry Match') { val.textContent = '98.6%'; }
        else if (labelText === 'Est. Completion') { val.textContent = 'Complete'; val.style.color = 'var(--success)'; }
        else if (labelText === 'Signal Status') { val.innerHTML = '✓ Sent Mar 10'; }
      });

      // Update "3 of 12 units fabricated" text
      var fabText = heatmap.querySelector('span[style*="font-size:11px;color:var(--steel-400)"]');
      if (fabText && fabText.textContent.indexOf('of 12') >= 0) {
        fabText.textContent = '12 of 12 units fabricated';
      }

      // Update 3D comparison card text
      var compCard = document.getElementById('model-comparison');
      if (compCard) {
        var scanText = compCard.querySelector('div[style*="color:var(--success);font-weight:600"]');
        if (scanText && scanText.textContent.indexOf('of 12') >= 0) {
          scanText.innerHTML = '<span style="color:var(--success);font-weight:600">12 of 12</span> brackets scanned';
        }
      }

      // Add J-2026-042 to acceptance events table
      var tbody = document.getElementById('shipyard-acceptance-tbody');
      if (tbody && !document.getElementById('acceptance-row-042')) {
        var row = document.createElement('tr');
        row.id = 'acceptance-row-042';
        row.innerHTML = '<td style="color:var(--cyan-400)">J-2026-042</td><td>Pump bracket</td><td>Package submitted</td><td>Mar 10</td><td><span class="badge badge-green"><span class="mi" style="font-size:14px;vertical-align:middle">check</span> Submitted</span></td>';
        tbody.insertBefore(row, tbody.firstChild);
      }

      shipyardAct5Applied = true;
    }

    // Reset when navigating away from Act 5 shipyard
    if (!isAct5Shipyard && shipyardAct5Applied) {
      // Remove the dynamically added row
      var addedRow = document.getElementById('acceptance-row-042');
      if (addedRow) addedRow.remove();
      shipyardAct5Applied = false;
      // Note: heatmap/signal revert is not needed since earlier steps show a different page
    }
  }

  // ── Report overlay state management ────────────────
  // Ensures the report detail overlay is open on 5.2c and closed on all other steps
  function setReportOverlayState(stepId) {
    var overlay = document.getElementById('rpt-overlay');
    if (!overlay) return;
    if (stepId === '5.2b') {
      // Overlay should already be open from 5.2a click, but ensure it
      if (overlay.style.display !== 'flex' && overlay.style.display !== 'block') {
        if (typeof openRptOverlay === 'function') openRptOverlay('bid-margin-program');
      }
    } else {
      // Close overlay if open (navigated away from 5.2c)
      if (overlay.classList.contains('active') || overlay.style.display === 'flex' || overlay.style.display === 'block') {
        if (typeof closeRptOverlay === 'function') closeRptOverlay();
      }
    }
  }

  // ── Transition overlay management ────────────────
  // Shows a centered time-skip overlay with 30-day calendar for transition steps
  var transitionOverlay = null;

  function buildTransitionOverlay() {
    var el = document.createElement('div');
    el.id = 'demo-transition-overlay';
    // z-index 99998 — above action tray (20) but below demo tray (99999)
    el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,14,20,.88);display:none;align-items:center;justify-content:center;z-index:99998;flex-direction:column;gap:16px;pointer-events:none';

    // Build a 30-day calendar grid (Feb 12 → Mar 13, with Feb 12–Mar 4 = 21 days highlighted)
    var days = ['S','M','T','W','T','F','S'];
    var headerRow = '';
    for (var d = 0; d < 7; d++) {
      headerRow += '<div style="font-size:11px;color:var(--steel-400);font-weight:600;text-align:center;padding:4px 0">' + days[d] + '</div>';
    }

    // Feb 2026 starts on Sunday (day 0). Feb 12 = Thursday (col 4)
    // We show Feb 8 (Sun) through Mar 14 (Sat) = 5 rows
    // Feb 8-14, Feb 15-21, Feb 22-28, Mar 1-7, Mar 8-14
    var calCells = '';
    var dates = [
      // Row 1: Feb 8-14
      {n:8,m:'feb'},{n:9,m:'feb'},{n:10,m:'feb'},{n:11,m:'feb'},{n:12,m:'feb',hl:true},{n:13,m:'feb',hl:true},{n:14,m:'feb',hl:true},
      // Row 2: Feb 15-21
      {n:15,m:'feb',hl:true},{n:16,m:'feb',hl:true},{n:17,m:'feb',hl:true},{n:18,m:'feb',hl:true},{n:19,m:'feb',hl:true},{n:20,m:'feb',hl:true},{n:21,m:'feb',hl:true},
      // Row 3: Feb 22-28
      {n:22,m:'feb',hl:true},{n:23,m:'feb',hl:true},{n:24,m:'feb',hl:true},{n:25,m:'feb',hl:true},{n:26,m:'feb',hl:true},{n:27,m:'feb',hl:true},{n:28,m:'feb',hl:true},
      // Row 4: Mar 1-7
      {n:1,m:'mar',hl:true},{n:2,m:'mar',hl:true},{n:3,m:'mar',hl:true},{n:4,m:'mar',hl:true},{n:5,m:'mar',end:true},{n:6,m:'mar'},{n:7,m:'mar'},
      // Row 5: Mar 8-14
      {n:8,m:'mar'},{n:9,m:'mar'},{n:10,m:'mar'},{n:11,m:'mar'},{n:12,m:'mar'},{n:13,m:'mar'},{n:14,m:'mar'}
    ];

    for (var i = 0; i < dates.length; i++) {
      var dc = dates[i];
      var bg = 'transparent';
      var color = 'var(--steel-500)';
      var border = 'none';
      if (dc.hl) {
        bg = 'rgba(232,168,32,.18)';
        color = 'var(--cyan-400)';
      }
      if (dc.end) {
        bg = 'var(--cyan-400)';
        color = '#0a0e14';
        border = 'none';
      }
      // Dim pre-highlight days
      if (!dc.hl && !dc.end && dc.m === 'feb' && dc.n < 12) {
        color = 'var(--steel-600)';
      }
      // Dim post-range days
      if (!dc.hl && !dc.end && (dc.m === 'mar' && dc.n > 4)) {
        color = 'var(--steel-600)';
      }
      var radius = '4px';
      // First highlighted day gets left rounding
      if (dc.hl && i > 0 && !dates[i-1].hl) radius = '4px 0 0 4px';
      // Last highlighted day before end marker
      if (dc.hl && i < dates.length-1 && dates[i+1].end) radius = '0';
      // End marker
      if (dc.end) radius = '0 4px 4px 0';
      // First day of highlighted row
      if (dc.hl && i % 7 === 0) radius = '4px 0 0 4px';
      // Last day of highlighted row
      if (dc.hl && i % 7 === 6) radius = '0 4px 4px 0';

      calCells += '<div style="text-align:center;padding:6px 2px;font-size:13px;font-weight:500;'
        + 'background:' + bg + ';color:' + color + ';border-radius:' + radius + ';'
        + (dc.end ? 'font-weight:700' : '') + '">' + dc.n + '</div>';
    }

    el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:20px">'
      + '<div style="background:var(--steel-850);border:1px solid var(--steel-700);border-radius:12px;padding:20px 24px;min-width:320px">'
      + '<div style="text-align:center;margin-bottom:14px;font-size:14px;color:var(--steel-300);font-weight:600;letter-spacing:.03em">Feb — Mar 2026</div>'
      + '<div style="display:grid;grid-template-columns:repeat(7,40px);gap:1px 0">'
      + headerRow + calCells
      + '</div>'
      + '</div>'
      + '<div style="font-size:20px;color:var(--steel-200);font-weight:600;letter-spacing:.04em">3 weeks pass</div>'
      + '</div>';

    document.body.appendChild(el);
    return el;
  }

  var transitionOverlay2 = null;

  function buildTransitionOverlay2() {
    var el = document.createElement('div');
    el.id = 'demo-transition-overlay-2';
    el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,14,20,.88);display:none;align-items:center;justify-content:center;z-index:99998;flex-direction:column;gap:16px;pointer-events:none';

    // Clock SVG — 160×160, showing ~6:00 PM (second shift start)
    var clockSvg = '<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">'
      // Outer ring
      + '<circle cx="80" cy="80" r="74" stroke="var(--steel-600)" stroke-width="2" fill="var(--steel-850)"/>'
      // Day half (top) — warm amber
      + '<path d="M 80 6 A 74 74 0 0 1 80 154" fill="rgba(255,180,50,.08)" stroke="none"/>'
      // Night half (bottom) — cool blue
      + '<path d="M 80 154 A 74 74 0 0 1 80 6" fill="rgba(232,168,32,.08)" stroke="none"/>'
      // Hour ticks
      + '<line x1="80" y1="12" x2="80" y2="22" stroke="var(--steel-400)" stroke-width="2"/>'
      + '<line x1="80" y1="138" x2="80" y2="148" stroke="var(--steel-400)" stroke-width="2"/>'
      + '<line x1="12" y1="80" x2="22" y2="80" stroke="var(--steel-400)" stroke-width="2"/>'
      + '<line x1="138" y1="80" x2="148" y2="80" stroke="var(--steel-400)" stroke-width="2"/>'
      // Minor ticks
      + '<line x1="118" y1="14.2" x2="114" y2="21.2" stroke="var(--steel-600)" stroke-width="1.5"/>'
      + '<line x1="145.8" y1="42" x2="138.8" y2="46" stroke="var(--steel-600)" stroke-width="1.5"/>'
      + '<line x1="145.8" y1="118" x2="138.8" y2="114" stroke="var(--steel-600)" stroke-width="1.5"/>'
      + '<line x1="118" y1="145.8" x2="114" y2="138.8" stroke="var(--steel-600)" stroke-width="1.5"/>'
      + '<line x1="42" y1="145.8" x2="46" y2="138.8" stroke="var(--steel-600)" stroke-width="1.5"/>'
      + '<line x1="14.2" y1="118" x2="21.2" y2="114" stroke="var(--steel-600)" stroke-width="1.5"/>'
      + '<line x1="14.2" y1="42" x2="21.2" y2="46" stroke="var(--steel-600)" stroke-width="1.5"/>'
      + '<line x1="42" y1="14.2" x2="46" y2="21.2" stroke="var(--steel-600)" stroke-width="1.5"/>'
      // Hour hand — pointing to 6 (straight down)
      + '<line x1="80" y1="80" x2="80" y2="120" stroke="var(--steel-200)" stroke-width="3.5" stroke-linecap="round"/>'
      // Minute hand — pointing to 12 (straight up)
      + '<line x1="80" y1="80" x2="80" y2="30" stroke="var(--steel-300)" stroke-width="2" stroke-linecap="round"/>'
      // Center dot
      + '<circle cx="80" cy="80" r="4" fill="var(--cyan-400)"/>'
      // Sun icon (top-right, day side)
      + '<circle cx="120" cy="40" r="8" fill="rgba(255,180,50,.5)" stroke="rgba(255,180,50,.7)" stroke-width="1"/>'
      // Moon icon (top-left, night side)
      + '<circle cx="40" cy="40" r="7" fill="rgba(232,168,32,.4)"/>'
      + '<circle cx="44" cy="37" r="6" fill="var(--steel-850)"/>'
      + '</svg>';

    // Shift labels
    var shiftCard = '<div style="background:var(--steel-850);border:1px solid var(--steel-700);border-radius:12px;padding:24px 32px;text-align:center;min-width:300px">'
      + '<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:16px">'
      + '<div style="width:10px;height:10px;border-radius:50%;background:rgba(255,180,50,.6)"></div>'
      + '<span style="font-size:13px;color:var(--steel-400);font-weight:500">Day Shift</span>'
      + '<span style="font-size:13px;color:var(--steel-500);margin:0 4px">\u2192</span>'
      + '<div style="width:10px;height:10px;border-radius:50%;background:var(--cyan-400)"></div>'
      + '<span style="font-size:13px;color:var(--cyan-400);font-weight:600">Second Shift</span>'
      + '</div>'
      + clockSvg
      + '<div style="margin-top:16px;font-size:15px;color:var(--steel-200);font-weight:600">Mike — Machinist, 2nd Shift</div>'
      + '<div style="margin-top:6px;font-size:12px;color:var(--steel-400)">J-2026-042 \u00b7 Released to Floor</div>'
      + '</div>';

    el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:20px">'
      + shiftCard
      + '<div style="font-size:20px;color:var(--steel-200);font-weight:600;letter-spacing:.04em">Shift Change</div>'
      + '</div>';

    document.body.appendChild(el);
    return el;
  }

  var transitionOverlay3 = null;

  function buildTransitionOverlay3() {
    var el = document.createElement('div');
    el.id = 'demo-transition-overlay-3';
    el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,14,20,.92);display:none;align-items:center;justify-content:center;z-index:99998;flex-direction:column;gap:20px;pointer-events:none';

    // Warning triangle SVG
    var warnSvg = '<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M36 6L66 62H6L36 6Z" stroke="#f59e0b" stroke-width="3" fill="rgba(245,158,11,.12)" stroke-linejoin="round"/>'
      + '<line x1="36" y1="26" x2="36" y2="42" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round"/>'
      + '<circle cx="36" cy="50" r="2.5" fill="#f59e0b"/>'
      + '</svg>';

    // Progress bar: 3 of 12 done, problem on #4
    var progressDots = '';
    for (var i = 1; i <= 12; i++) {
      var bg, border, label;
      if (i <= 3) {
        bg = 'rgba(52,211,153,.25)'; border = '2px solid rgba(52,211,153,.6)'; label = '<span style="color:var(--success);font-weight:700">' + i + '</span>';
      } else if (i === 4) {
        bg = 'rgba(245,158,11,.2)'; border = '2px solid #f59e0b'; label = '<span style="color:#f59e0b;font-weight:700">4</span>';
      } else {
        bg = 'var(--steel-800)'; border = '2px solid var(--steel-700)'; label = '<span style="color:var(--steel-500)">' + i + '</span>';
      }
      progressDots += '<div style="width:40px;height:40px;border-radius:8px;background:' + bg + ';border:' + border + ';display:flex;align-items:center;justify-content:center;font-size:13px">' + label + '</div>';
    }

    el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:24px">'
      // Warning icon
      + warnSvg
      // Main title
      + '<div style="font-size:22px;color:var(--steel-100);font-weight:700;letter-spacing:.03em">Porosity Detected</div>'
      // Subtitle
      + '<div style="font-size:14px;color:var(--steel-400);max-width:400px;text-align:center;line-height:1.5">'
      + 'Bracket <span style="color:#f59e0b;font-weight:600">#4</span> — weld bead porosity found during Op 30 Weld'
      + '</div>'
      // Card with bracket progress
      + '<div style="background:var(--steel-850);border:1px solid var(--steel-700);border-radius:12px;padding:20px 24px;min-width:360px">'
      + '<div style="font-size:11px;color:var(--steel-400);font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;text-align:center">J-2026-042 · Bracket Progress</div>'
      + '<div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">' + progressDots + '</div>'
      + '<div style="display:flex;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid var(--steel-700)">'
      + '<div style="font-size:12px;color:var(--success)"><span style="font-weight:600">3</span> completed</div>'
      + '<div style="font-size:12px;color:#f59e0b"><span style="font-weight:600">1</span> NCR required</div>'
      + '<div style="font-size:12px;color:var(--steel-500)"><span style="font-weight:600">8</span> remaining</div>'
      + '</div>'
      + '</div>'
      // Action hint
      + '<div style="font-size:13px;color:var(--steel-500);font-style:italic">Mike will raise an NCR from the tablet</div>'
      + '</div>';

    document.body.appendChild(el);
    return el;
  }

  var transitionOverlay4 = null;

  function buildTransitionOverlay4() {
    var el = document.createElement('div');
    el.id = 'demo-transition-overlay-4';
    el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,14,20,.92);display:none;align-items:center;justify-content:center;z-index:99998;flex-direction:column;gap:20px;pointer-events:none';

    // Green checkmark circle SVG
    var checkSvg = '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<circle cx="40" cy="40" r="36" stroke="rgba(52,211,153,.5)" stroke-width="2.5" fill="rgba(52,211,153,.08)"/>'
      + '<path d="M24 40 L34 50 L56 28" stroke="var(--success)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
      + '</svg>';

    // NCR detail card
    var detailCard = '<div style="background:var(--steel-850);border:1px solid var(--steel-700);border-radius:12px;padding:24px 32px;min-width:340px">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">'
      + '<span style="font-size:18px;color:#fff;font-weight:700">NCR-042</span>'
      + '<span style="font-size:11px;padding:4px 10px;border-radius:20px;background:rgba(52,211,153,.15);color:var(--success);font-weight:600">Submitted</span>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 24px">'
      + '<div><div style="font-size:10px;color:var(--steel-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">Job</div><div style="font-size:13px;color:var(--steel-200);font-weight:500">J-2026-042</div></div>'
      + '<div><div style="font-size:10px;color:var(--steel-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">Operation</div><div style="font-size:13px;color:var(--steel-200);font-weight:500">Op 30 — Weld</div></div>'
      + '<div><div style="font-size:10px;color:var(--steel-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">Defect</div><div style="font-size:13px;color:#f59e0b;font-weight:500">Porosity detected</div></div>'
      + '<div><div style="font-size:10px;color:var(--steel-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">Qty Affected</div><div style="font-size:13px;color:var(--steel-200);font-weight:500">2 brackets</div></div>'
      + '<div><div style="font-size:10px;color:var(--steel-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">Reported By</div><div style="font-size:13px;color:var(--steel-200);font-weight:500">Mike Rodriguez</div></div>'
      + '<div><div style="font-size:10px;color:var(--steel-400);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">Photos</div><div style="font-size:13px;color:var(--steel-200);font-weight:500">2 attached</div></div>'
      + '</div>'
      + '<div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--steel-700);font-size:12px;color:var(--steel-400);text-align:center">'
      + '<span class="mi" style="font-size:14px;vertical-align:middle;margin-right:4px;color:var(--cyan-400)">schedule</span> Submitted in under 60 seconds'
      + '</div>'
      + '</div>';

    el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:20px">'
      + checkSvg
      + '<div style="font-size:22px;color:var(--steel-100);font-weight:700;letter-spacing:.03em">NCR Submitted</div>'
      + detailCard
      + '<div style="font-size:13px;color:var(--steel-500);font-style:italic">Mike continues welding · Sarah is notified for quality review</div>'
      + '</div>';

    document.body.appendChild(el);
    return el;
  }

  var transitionOverlay5 = null;

  function buildTransitionOverlay5() {
    var el = document.createElement('div');
    el.id = 'demo-transition-overlay-5';
    el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,14,20,.92);display:none;align-items:center;justify-content:center;z-index:99998;flex-direction:column;gap:20px;pointer-events:none';

    // Green checkmark circle SVG
    var checkSvg = '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<circle cx="40" cy="40" r="36" stroke="rgba(52,211,153,.5)" stroke-width="2.5" fill="rgba(52,211,153,.08)"/>'
      + '<path d="M24 40 L34 50 L56 28" stroke="var(--success)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
      + '</svg>';

    // 12-bracket progress grid — all green
    var brackets = '';
    for (var i = 1; i <= 12; i++) {
      brackets += '<div style="width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;'
        + 'background:rgba(52,211,153,.15);color:var(--success);border:1.5px solid rgba(52,211,153,.4)'
        + '">#' + i + '</div>';
    }

    // Summary stats
    var stats = '<div style="display:flex;gap:32px;margin-top:8px">'
      + '<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:var(--success)">12/12</div><div style="font-size:11px;color:var(--steel-400)">Brackets</div></div>'
      + '<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:var(--success)">Pass</div><div style="font-size:11px;color:var(--steel-400)">NDT</div></div>'
      + '<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:var(--success)">Resolved</div><div style="font-size:11px;color:var(--steel-400)">NCR-042</div></div>'
      + '<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:var(--cyan-400)">3/10/27</div><div style="font-size:11px;color:var(--steel-400)">Delivery</div></div>'
      + '</div>';

    el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:20px">'
      + checkSvg
      + '<div style="font-size:22px;color:var(--steel-100);font-weight:700;letter-spacing:.03em">All 12 Brackets Complete</div>'
      + '<div style="font-size:13px;color:var(--steel-400);max-width:440px;text-align:center">NCR-042 resolved. Repair complete. NDT passed. All welds cleared re-inspection. Final QA and shipyard acceptance ahead.</div>'
      + '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:4px">' + brackets + '</div>'
      + stats
      + '</div>';

    document.body.appendChild(el);
    return el;
  }

  function setTransitionOverlay(stepId) {
    if (!transitionOverlay) transitionOverlay = buildTransitionOverlay();
    if (!transitionOverlay2) transitionOverlay2 = buildTransitionOverlay2();
    if (!transitionOverlay3) transitionOverlay3 = buildTransitionOverlay3();
    if (!transitionOverlay4) transitionOverlay4 = buildTransitionOverlay4();
    if (!transitionOverlay5) transitionOverlay5 = buildTransitionOverlay5();
    var show1 = false, show2 = false, show3 = false, show4 = false, show5 = false;
    if (stepId === 'transition-1') show1 = true;
    else if (stepId === 'transition-2') show2 = true;
    else if (stepId === 'transition-3') show3 = true;
    else if (stepId === '4.1c') show4 = true;
    else if (stepId === 'transition-4') show5 = true;
    transitionOverlay.style.display = show1 ? 'flex' : 'none';
    transitionOverlay2.style.display = show2 ? 'flex' : 'none';
    transitionOverlay3.style.display = show3 ? 'flex' : 'none';
    transitionOverlay4.style.display = show4 ? 'flex' : 'none';
    transitionOverlay5.style.display = show5 ? 'flex' : 'none';
  }

  // ── RFQ Paste text animation (step 1.8b) ─────────────────
  var _rfqPasteTimer = null;
  var _rfqPasteText = 'Subject: RFQ-2026-0148 Pump Mounting Brackets\n\nHi Maria,\n\nPlease quote 12x pump mounting brackets per attached drawing PKG-DDG51-PM-2026.\n\nMaterial: HY-80 per MIL-S-16216\nQty: 12 ea\nNeed date: 90 days ARO\nProgram: DDG-51 Flight III\n\nPlease include weld certs (AWS D1.6) and NDT (UT per T9074-AS-GIB-010/271).\n\nThanks,\nJ. Rodriguez, HII-Ingalls';

  function setRfqPasteState(stepId) {
    // Clear any in-flight animation
    if (_rfqPasteTimer) { clearInterval(_rfqPasteTimer); _rfqPasteTimer = null; }
    var ta = document.querySelector('#page-rfq-capture textarea');
    if (!ta) return;
    if (stepId === '1.8b') {
      // Animate paste: type text character by character
      ta.value = '';
      var idx = 0;
      _rfqPasteTimer = setInterval(function() {
        if (idx < _rfqPasteText.length) {
          ta.value = _rfqPasteText.substring(0, idx + 1);
          idx++;
        } else {
          clearInterval(_rfqPasteTimer);
          _rfqPasteTimer = null;
        }
      }, 18);
    } else if (stepId === '1.8a') {
      ta.value = '';
    }
  }

  // Guard against double-advance from click handlers that also call nextStep
  let advancing = false;

  // Execute the current step's click target before advancing
  // Skip click for steps whose UI state is managed by goToStep (e.g. 1.3a expand)
  var skipClickSteps = {
    '1.3': true, '1.3a': true, '1.4b': true, '1.4c': true, '1.5c': true, '1.7a': true, '1.7c': true,
    '2.1a': true, '2.3a': true, '2.3b': true, '2.4a': true, '2.4b': true, '2.5a': true, '2.5b': true, '2.6a': true, '2.6b': true,
    '2.7a': true, '2.7b': true, '2.7c': true,
    '3.1a': true, '3.1b': true, '3.3a': true, '3.3b': true, '3.4': true, '3.4a': true, '3.4b': true,
    '4.1a': true, '4.1b': true, '4.2a': true, '4.2b': true, '4.2c': true, '4.3': true,
    '5.1a': true,
    '5.2': true, '5.2b': true
  };

  function executeCurrentClick() {
    var step = steps[currentStep];
    if (!step || !step.clickTarget) return;
    if (skipClickSteps[step.id]) return; // state managed by goToStep
    var selectors = step.clickTarget.split(',').map(function(s) { return s.trim(); });
    var target = null;
    for (var i = 0; i < selectors.length; i++) {
      target = document.querySelector(selectors[i]);
      if (target) break;
    }
    if (target) {
      target.click();
    }
  }

  function nextStep() {
    if (advancing) return; // prevent double-advance
    advancing = true;
    // Fire the click on the current step's target before moving forward
    executeCurrentClick();
    goToStep(currentStep + 1);
    // Reset guard after a tick so future calls work
    setTimeout(function() { advancing = false; }, 100);
  }
  function prevStep() { goToStep(currentStep - 1); }

  // ── Inject CSS ────────────────────────────────────────────
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Demo Walkthrough Tray */
      #demo-tray {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #13161a;
        border-top: 1px solid #292f38;
        z-index: 99999;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        max-height: 240px;
      }

      /* Expanded dialog area — above the footer, scrollable */
      .demo-dialog-area {
        display: none;
        overflow-y: auto;
        flex: 1;
        min-height: 0;
        padding: 10px 16px 8px;
        border-bottom: 1px solid #292f38;
      }

      /* Fixed control bar — always pinned to bottom */
      .demo-tray-footer {
        display: flex;
        align-items: flex-start;
        padding: 8px 16px;
        gap: 12px;
        flex-shrink: 0;
        background: #13161a;
      }
      .demo-footer-content {
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }

      .demo-nav-group {
        display: flex;
        gap: 6px;
        flex-shrink: 0;
      }
      .demo-nav-btn {
        width: 44px;
        height: 44px;
        border-radius: 8px;
        border: 1px solid #333a44;
        background: #1d2229;
        color: #d0d4dc;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 120ms ease;
      }
      .demo-nav-btn:hover {
        background: #292f38;
        border-color: #485162;
        color: #f3f4f6;
      }
      .demo-nav-btn-active {
        background: #d4960f22 !important;
        border-color: #d4960f !important;
        color: #d4960f !important;
      }
      .demo-speed-btn {
        font-size: 12px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
        min-width: 44px;
        padding: 0 6px;
      }
      .demo-meta {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        min-width: 0;
      }
      .demo-act-badge {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.8px;
        padding: 2px 8px;
        border-radius: 4px;
        flex-shrink: 0;
      }
      .demo-scene-num {
        font-size: 12px;
        font-weight: 600;
        color: #9aa2b1;
        font-family: 'SF Mono', ui-monospace, monospace;
        flex-shrink: 0;
      }
      .demo-title {
        font-size: 14px;
        font-weight: 600;
        color: #f3f4f6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .demo-persona {
        font-size: 12px;
        color: #697182;
        flex-shrink: 0;
        white-space: nowrap;
      }
      .demo-desc {
        font-size: 13px;
        color: #9aa2b1;
        line-height: 1.4;
        margin-top: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .demo-dialog {
        font-size: 13px;
        color: #c8cdd6;
        line-height: 1.65;
        padding-top: 4px;
      }
      .demo-dialog-p {
        margin-bottom: 10px;
      }
      .demo-dialog-p:last-child {
        margin-bottom: 0;
      }
      .demo-counter {
        font-size: 11px;
        font-weight: 600;
        color: #485162;
        flex-shrink: 0;
        white-space: nowrap;
        min-width: 50px;
        text-align: center;
      }
      .demo-jump-wrap {
        position: relative;
        flex-shrink: 0;
      }
      #demo-jump-input::-webkit-inner-spin-button,
      #demo-jump-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .demo-progress {
        height: 3px;
        background: #1d2229;
        flex-shrink: 0;
      }
      .demo-progress-fill {
        height: 100%;
        width: 0%;
        transition: width 300ms ease, background 300ms ease;
        border-radius: 0 2px 2px 0;
      }

      /* Voice Settings Modal */
      .demo-11labs-card {
        background: #21262d;
        border: 1px solid #333a44;
        border-radius: 14px;
        padding: 22px 24px;
        width: 340px;
        max-width: 90vw;
        box-shadow: 0 16px 48px rgba(0,0,0,.5);
      }
      .demo-11labs-card input:focus,
      .demo-11labs-card select:focus {
        border-color: #d4960f;
        box-shadow: 0 0 0 3px rgba(232,168,32,.15);
      }
      .demo-11labs-card button:hover { opacity: 0.85; }
      .demo-voice-tab {
        padding: 6px 12px; font-size: 12px; font-weight: 500; color: #9aa2b1;
        background: transparent; border: none; border-bottom: 2px solid transparent;
        cursor: pointer; transition: color 150ms, border-color 150ms;
      }
      .demo-voice-tab:hover { color: #f3f4f6; }
      .demo-voice-tab-active { color: #f3f4f6; border-bottom-color: #1a73e8; }

      /* Callout FAB — dark blue frosted glass with gold accent, follows demo pointer */
      #demo-callout-fab {
        display: none;
        position: fixed;
        z-index: 100001;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(21, 30, 50, .85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(232,168,32,.3);
        box-shadow: 0 4px 16px rgba(0,0,0,.4), 0 0 8px rgba(232,168,32,.15);
        cursor: pointer;
        pointer-events: auto;
        transition: left 400ms cubic-bezier(.4,0,.2,1), top 400ms cubic-bezier(.4,0,.2,1), transform 120ms ease, box-shadow 120ms ease;
      }
      #demo-callout-fab:hover {
        transform: scale(1.12);
        box-shadow: 0 6px 24px rgba(0,0,0,.5), 0 0 12px rgba(232,168,32,.25);
        border-color: rgba(232,168,32,.5);
      }

      /* Callout panel — dark blue frosted glass with gold accent */
      #demo-callout-panel {
        display: none;
        position: fixed;
        z-index: 100001;
        width: 360px;
        max-width: calc(100vw - 48px);
        max-height: 320px;
        overflow-y: auto;
        border-radius: 12px;
        background: rgba(18, 25, 42, .92);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(232,168,32,.25);
        box-shadow: 0 16px 48px rgba(0,0,0,.55), 0 0 0 1px rgba(232,168,32,.06);
      }
      #demo-callout-panel::-webkit-scrollbar {
        width: 6px;
      }
      #demo-callout-panel::-webkit-scrollbar-track {
        background: transparent;
      }
      #demo-callout-panel::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.12);
        border-radius: 3px;
      }

      /* Manual Mode — hide everything except expand button */
      .demo-manual-mode .demo-footer-content {
        display: none !important;
      }
      .demo-manual-mode .demo-progress {
        display: none !important;
      }
      .demo-manual-mode .demo-nav-group {
        margin-left: auto;
      }

      /* Pointing Hand Cursor */
      #demo-pointer {
        position: fixed;
        z-index: 100000;
        pointer-events: none;
        display: none;
        transition: left 400ms cubic-bezier(.4,0,.2,1), top 400ms cubic-bezier(.4,0,.2,1), opacity 200ms ease;
        animation: demo-pointer-bob 1.8s ease-in-out infinite;
      }
      @keyframes demo-pointer-bob {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(1px, 3px); }
      }

      /* Mirror the prototype's natural :hover rules via a class */
      .card.demo-hover-active { border-color: var(--steel-700); box-shadow: var(--shadow-card); }
      .rfq-card.demo-hover-active { border-color: var(--steel-600); box-shadow: var(--shadow-hover); transform: scale(1.015); }
      .metric-tile.demo-hover-active { border-color: var(--steel-600); box-shadow: var(--shadow-hover); transform: scale(1.015); }
      .cost-card.demo-hover-active { border-color: var(--steel-600); box-shadow: var(--shadow-hover); }
      .tile.demo-hover-active { border-color: var(--steel-500); box-shadow: 0 4px 16px rgba(0,0,0,.2); transform: scale(1.01); }
      .btn-primary.demo-hover-active { background: var(--cyan-400); color: var(--steel-900); box-shadow: 0 4px 16px rgba(232,168,32,.25); }
      .btn-success.demo-hover-active { background: #1aad54; }
      .btn-danger.demo-hover-active { background: #dc3545; }
      .data-table tbody tr.demo-hover-active { background: rgba(255,255,255,.02); }
      .pin-btn.demo-hover-active { background: var(--steel-700); border-color: var(--cyan-500); }
      .report-card.demo-hover-active { border-color: var(--steel-600); box-shadow: var(--shadow-hover); transform: scale(1.015); }

      /* Push page content up so tray doesn't cover it */
      body {
        padding-bottom: 90px !important;
      }
      /* Action tray sits above the demo nav tray — no !important on bottom so JS can override */
      .action-tray {
        z-index: 100000 !important;
        transition: bottom 200ms ease;
      }

      /* Scrollbar for expanded dialog area */
      .demo-dialog-area::-webkit-scrollbar {
        width: 6px;
      }
      .demo-dialog-area::-webkit-scrollbar-track {
        background: transparent;
      }
      .demo-dialog-area::-webkit-scrollbar-thumb {
        background: #333a44;
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
  }

  // ── Init ──────────────────────────────────────────────────
  // Toggle the comparison detail row for J-2024-018
  function toggleComparisonDetail() {
    var detailRow = document.getElementById('comparison-detail-1');
    var headerRow = document.getElementById('comparison-row-1');
    if (!detailRow || !headerRow) return;
    var arrow = headerRow.querySelector('.expand-arrow');
    if (detailRow.style.display === 'none' || detailRow.style.display === '') {
      detailRow.style.display = 'table-row';
      if (arrow) arrow.innerHTML = '&#9660;';
    } else {
      detailRow.style.display = 'none';
      if (arrow) arrow.innerHTML = '&#9654;';
    }
  }

  // Force comparison detail to a specific state (true=expanded, false=collapsed)
  function setComparisonState(expanded) {
    var detailRow = document.getElementById('comparison-detail-1');
    var headerRow = document.getElementById('comparison-row-1');
    if (!detailRow) return;
    var arrow = headerRow ? headerRow.querySelector('.expand-arrow') : null;
    if (expanded) {
      detailRow.style.display = 'table-row';
      if (arrow) arrow.innerHTML = '&#9660;';
    } else {
      detailRow.style.display = 'none';
      if (arrow) arrow.innerHTML = '&#9654;';
    }
  }

  function init() {
    injectStyles();
    buildTray();
    buildPointer();
    goToStep(0);

    // Comparison row expand/collapse handler
    var compRow = document.getElementById('comparison-row-1');
    if (compRow) {
      compRow.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleComparisonDetail();
      });
    }

    // Reposition pointer on scroll/resize
    window.addEventListener('scroll', function() {
      positionPointer(steps[currentStep]);
    }, true);
    window.addEventListener('resize', function() {
      positionPointer(steps[currentStep]);
      positionCalloutFab();
    });
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
