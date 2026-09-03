export const documents = [
  {
    code: 'DS-160',
    name: 'Online Nonimmigrant Visa Application',
    tier: 'Core',
    blurb:
      'The primary online application used for most U.S. nonimmigrant visa categories. Accuracy and consistency across the application and supporting documentation are critical.',
    usedFor: 'Nonimmigrant visa applications',
    whyItMatters:
      'Errors, omissions and inconsistencies can create avoidable problems during the visa process.',
  },
  {
    code: 'DS-160',
    name: 'Confirmation Page',
    tier: 'Core',
    blurb:
      'Generated once the DS-160 is submitted. It carries the barcode your consular officer scans at your interview, so it has to match your application exactly.',
    usedFor: 'Every DS-160-based application',
    whyItMatters:
      'A missing or mismatched confirmation page can delay or derail an interview appointment.',
  },
  {
    code: 'I-20',
    name: 'Certificate of Eligibility',
    tier: 'Category-specific',
    blurb:
      'Issued by a SEVP-certified school once you accept an offer of admission. It is the document that makes an F-1 student visa application possible.',
    usedFor: 'F-1 student visa applicants',
    whyItMatters:
      'Program dates, funding figures and SEVIS details on the I-20 must align with everything else in your file.',
  },
  {
    code: 'DS-2019',
    name: 'Certificate of Eligibility for Exchange Visitor Status',
    tier: 'Category-specific',
    blurb:
      'The exchange-visitor equivalent of the I-20, issued by a sponsoring organization for J-1 program participants.',
    usedFor: 'J-1 exchange visitor applicants',
    whyItMatters:
      'Sponsor details and program category need to match the underlying exchange program precisely.',
  },
  {
    code: 'ADMIT',
    name: 'Admission Letter',
    tier: 'Category-specific',
    blurb:
      'The formal offer from an institution or employer. It anchors the purpose of travel that the rest of the case is built around.',
    usedFor: 'Student and some work-visa applicants',
    whyItMatters:
      'Consular officers cross-reference this against your I-20 or petition, so details need to line up.',
  },
  {
    code: 'FIN-01',
    name: 'Bank Statement',
    tier: 'Supporting',
    blurb:
      'Evidence that you, or your sponsor, can meet the costs of the trip, program, or stay without becoming a public charge.',
    usedFor: 'Most visa categories, in some form',
    whyItMatters:
      'Sudden large deposits or unexplained gaps are a common source of officer follow-up questions.',
  },
  {
    code: 'ACAD-01',
    name: 'Academic Transcript',
    tier: 'Supporting',
    blurb:
      'Confirms academic history and standing where a program or visa category depends on it.',
    usedFor: 'Student visa applicants',
    whyItMatters:
      'Should be consistent with the admission letter and I-20 on institution, dates and program.',
  },
  {
    code: 'FEE-01',
    name: 'Visa Fee Receipt',
    tier: 'Core',
    blurb:
      'Proof that the visa application fee (MRV fee) has been paid, required before scheduling most interview appointments.',
    usedFor: 'Every visa applicant',
    whyItMatters:
      'Appointment systems check this before allowing a booking to go through.',
  },
]

export const destinations = [
  {
    slug: 'usa',
    name: 'United States',
    summary:
      'The largest single share of our caseload — student, visitor and select work and exchange categories.',
    categories: ['F-1 Student', 'B1/B2 Visitor', 'J-1 Exchange', 'Select employment-based'],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    summary:
      'Student and visitor routes under the UK points-based system, with an emphasis on financial and sponsorship evidence.',
    categories: ['Student Route', 'Standard Visitor', 'Skilled Worker (select cases)'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    summary:
      'Study permits, visitor visas and select work permit pathways, each with distinct proof-of-funds and intent requirements.',
    categories: ['Study Permit', 'Visitor Visa', 'Select Work Permits'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    summary:
      'Student and visitor subclasses with genuine temporary entrant requirements that reward a well-documented case.',
    categories: ['Student Visa (500)', 'Visitor Visa (600)'],
  },
  {
    slug: 'schengen',
    name: 'Europe / Schengen',
    summary:
      'A shared visa area with country-specific consulates — the right entry point depends on your primary destination.',
    categories: ['Short-Stay Schengen', 'National Student Visas'],
  },
  {
    slug: 'other',
    name: 'Other destinations',
    summary:
      'We take on additional destinations on a case-by-case basis. Tell us where you are headed and we will confirm fit.',
    categories: ['Assessed individually'],
  },
]

export const visaCategories = [
  {
    slug: 'visitor',
    name: 'Visitor',
    description:
      'Short-term travel for tourism, family visits or business meetings, where the core question is demonstrating intent to return home.',
  },
  {
    slug: 'student',
    name: 'Student',
    description:
      'Enrollment in an approved academic program, built around a genuine admission, a funding plan and a coherent study rationale.',
  },
  {
    slug: 'business',
    name: 'Business',
    description:
      'Short-term commercial activity — meetings, conferences, negotiations — distinct from employment authorization.',
  },
  {
    slug: 'work',
    name: 'Work',
    description:
      'Employment-based categories tied to a specific employer, role and, in most cases, an underlying petition.',
  },
  {
    slug: 'exchange',
    name: 'Exchange',
    description:
      'Structured cultural or academic exchange programs run through a designated sponsoring organization.',
  },
  {
    slug: 'immigrant',
    name: 'Immigrant',
    description:
      'Pathways toward permanent residence, generally the most document-intensive category and the least forgiving of inconsistency.',
  },
]

export const services = [
  {
    name: 'Visa Assessment',
    detail: 'Understand the appropriate visa pathway before applying.',
  },
  {
    name: 'Application Preparation',
    detail: 'Guidance through forms, documentation and application requirements.',
  },
  {
    name: 'Documentation Review',
    detail: 'Identify inconsistencies, missing information and weak supporting evidence.',
  },
  {
    name: 'Interview Preparation',
    detail: 'Prepare applicants for visa interviews with structured guidance.',
  },
  {
    name: 'Student Visa Assistance',
    detail: 'Support for students applying to study abroad.',
  },
  {
    name: 'Business & Work Visas',
    detail: 'Support for eligible business and employment-related visa pathways.',
  },
]

export const process = [
  { n: '01', title: 'Assessment', detail: 'We review your background and objective to identify the pathway that actually fits.' },
  { n: '02', title: 'Strategy', detail: 'A plan for the category, timeline and evidence your case needs before anything is filed.' },
  { n: '03', title: 'Documentation', detail: 'Every form and supporting document prepared for accuracy and consistency.' },
  { n: '04', title: 'Application', detail: 'Submission handled against a checklist built for your specific case.' },
  { n: '05', title: 'Preparation', detail: 'Interview readiness, where applicable, so nothing is a surprise on the day.' },
]

export const caseStudies = [
  {
    category: 'Student Visa',
    country: 'USA',
    challenge: 'Prior refusal history requiring a clearer case strategy.',
    approach: 'Reviewed the academic and financial narrative and identified inconsistencies requiring attention.',
    outcome: 'Verified outcome to be published only when consented evidence is available.',
  },
  {
    category: 'Business Visa',
    country: 'UK',
    challenge: 'Sponsor documentation required closer alignment with the stated purpose of travel.',
    approach: 'Reviewed the invitation, itinerary and supporting financial evidence for consistency.',
    outcome: 'Verified outcome to be published only when consented evidence is available.',
  },
  {
    category: 'Study Permit',
    country: 'Canada',
    challenge: 'Proof-of-funds documentation required a clearer and more complete presentation.',
    approach: 'Reviewed the financial evidence and funding timeline for consistency.',
    outcome: 'Verified outcome to be published only when consented evidence is available.',
  },
]
