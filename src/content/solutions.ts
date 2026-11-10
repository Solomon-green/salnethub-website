// Service × industry pages (SEO Phase 3). Each one targets a real search phrase from
// seo-research/service-keywords.csv and must say something genuinely specific to the industry,
// not the parent service page with the industry name swapped in.

export type SolutionPage = {
  slug: string; // keyword-led, used at /solutions/[slug]
  service: string; // parent service slug in content/services.ts
  industry: string;
  name: string;
  seo: { title: string; description: string };
  hero: { title: string; sub: string };
  pains: { title: string; body: string }[];
  conversation: {
    title: string;
    caption: string;
    channel: "whatsapp" | "call";
    lines: { from: "customer" | "ai"; text: string }[];
    outcome: string;
  };
  uses: { title: string; body: string }[];
  pricing: string; // what counts as a result here
  faqs: { q: string; a: string }[];
};

export const solutions: SolutionPage[] = [
  {
    slug: "ai-chatbot-for-real-estate",
    service: "ai-chatbots",
    industry: "Real estate",
    name: "AI chatbot for real estate",
    seo: {
      title: "AI Chatbot for Real Estate Agents & Agencies",
      description: "An AI chatbot for real estate that answers listing questions, qualifies buyers and books viewings on your website and WhatsApp. Pay per booked viewing.",
    },
    hero: {
      title: "An AI chatbot for real estate that books viewings while you show homes",
      sub: "Our AI chatbot for real estate agents answers questions about your listings on your website and WhatsApp, qualifies buyers and renters, and books viewings into your calendar, day or night. You pay per booked viewing, after a free 14-day pilot.",
    },
    pains: [
      { title: "Enquiries arrive when you are busy", body: "Buyers message in the evening, at weekends and while you are in a viewing. By the time you reply, they have booked with the agent who answered first." },
      { title: "The same five questions, every day", body: "Is it still available? What is the price? Is there parking? When can I see it? Answering these by hand takes hours that should go to clients." },
      { title: "Not every lead is ready to buy", body: "Some are browsing, some are renting, some need to sell first. Without a few quick questions, agents spend their time on the wrong conversations." },
    ],
    conversation: {
      title: "What a buyer sees on WhatsApp",
      caption: "The chatbot answers from your listing, asks the questions your agents would ask, and books the viewing.",
      channel: "whatsapp",
      lines: [
        { from: "customer", text: "Hi, is the 3-bed on Oak Street still available?" },
        { from: "ai", text: "Hi, yes it is. It has 3 bedrooms, 2 bathrooms, a garden and off-street parking, listed at $420,000. Are you buying with a mortgage, or is this a cash purchase?" },
        { from: "customer", text: "Mortgage, I'm already pre-approved." },
        { from: "ai", text: "That helps. Would you like to view it? Sarah has Saturday at 10:00 or 11:30 free." },
        { from: "customer", text: "11:30 works." },
        { from: "ai", text: "Booked: Saturday at 11:30 with Sarah at 14 Oak Street. I'll send a reminder the day before. Can I take your full name for the booking?" },
      ],
      outcome: "Viewing booked in Sarah's calendar. Buyer saved to the CRM as pre-approved, with the full chat attached.",
    },
    uses: [
      { title: "Answers listing questions", body: "Price, size, parking, pets, schools nearby: it answers from your listings and website, and says so when it does not know." },
      { title: "Qualifies buyers and renters", body: "It asks about budget, area, timeline and mortgage status, the same questions your agents ask, and tags each lead." },
      { title: "Books viewings", body: "It offers open slots from each agent's calendar and books the viewing, with a reminder the day before." },
      { title: "Works on WhatsApp and your website", body: "The same assistant answers on your website chat and your WhatsApp Business number, where most buyers prefer to message." },
      { title: "Captures sellers too", body: "Owners asking for a valuation are recognised and passed to the right agent with their address and timeline." },
      { title: "Hands over to an agent", body: "Offers, negotiations and anything sensitive go straight to a person, with the full conversation attached." },
    ],
    pricing: "You pay per booked viewing or qualified seller lead. No setup fee, nothing up front, and a free 14-day pilot.",
    faqs: [
      { q: "How much does an AI chatbot for real estate cost?", a: "With SalnetHub there is no setup fee or monthly retainer. You pay per booked viewing or qualified seller lead, at a rate below what a booked viewing costs you today, after a free 14-day pilot. AI usage is billed at cost." },
      { q: "Can the chatbot work on WhatsApp?", a: "Yes. It connects to your WhatsApp Business number through the official WhatsApp Business API, and the same assistant can also run on your website chat." },
      { q: "How does it know about my listings?", a: "We connect it to your listings page, feed or a simple spreadsheet. When a listing changes or sells, its answers change on the next sync, so it does not promise homes that are gone." },
      { q: "How does speed to lead work in real estate?", a: "Buyers often enquire with several agents at once and go with the first one who replies properly. The chatbot replies in seconds at any hour, answers the listing questions and books the viewing, so your speed to lead no longer depends on whether an agent is free." },
      { q: "Can it do marketing automation for real estate too?", a: "Yes. The same setup can follow up buyers who did not book, send new listings that match their budget and area, and remind past clients about valuations. It is AI automation for real estate agents built around the leads you already get." },
      { q: "Will it replace my agents?", a: "No. It handles the first reply, the routine questions and the booking. Your agents get qualified buyers in their calendar and spend their time on viewings and negotiations." },
      { q: "Does it work with my CRM?", a: "Yes, with most CRMs that have an API, such as HubSpot or Zoho, or with a Google Sheet. Every lead arrives with the full chat and their answers." },
      { q: "Does it treat every enquiry fairly?", a: "Yes. It answers every enquiry with the same information and qualifying questions, never steers people towards or away from areas, and you approve its wording before launch." },
    ],
  },
  {
    slug: "ai-receptionist-for-dental-office",
    service: "ai-receptionist",
    industry: "Dental",
    name: "AI receptionist for dental offices",
    seo: {
      title: "AI Receptionist for Dental Offices: Books 24/7",
      description: "An AI receptionist for dental offices that answers every call, books new patients and flags emergencies, day or night. Pay per booked appointment.",
    },
    hero: {
      title: "An AI receptionist for dental offices that books patients around the clock",
      sub: "Our AI receptionist for dental offices answers your practice line when the front desk is busy or closed. It books new patients and check-ups, handles common questions and flags urgent cases using your protocol. You pay per booked appointment, after a free 14-day pilot.",
    },
    pains: [
      { title: "The phone rings during check-in", body: "Your front desk is greeting patients, taking payments and answering insurance questions. The call that goes to voicemail is often a new patient." },
      { title: "Toothaches do not wait for office hours", body: "Patients in pain call in the evening and at weekends. If nobody answers, they book with the practice that does." },
      { title: "New patients are worth the most", body: "A new patient can mean years of check-ups and treatment. Losing one call can cost far more than the appointment it would have been." },
    ],
    conversation: {
      title: "What a patient hears on a Saturday call",
      caption: "The receptionist follows your emergency protocol, books the first suitable slot and logs the call for Monday.",
      channel: "call",
      lines: [
        { from: "ai", text: "Good morning, Bayside Dental, this is the practice's AI assistant. How can I help?" },
        { from: "customer", text: "Hi, I've had a bad toothache since last night. Is anyone there today?" },
        { from: "ai", text: "I'm sorry you're in pain. Is there any swelling in your face or jaw, or a fever?" },
        { from: "customer", text: "No swelling, it just really hurts when I bite." },
        { from: "ai", text: "Thank you. Our first emergency slot is Monday at 8:30. Would you like that one? If the pain gets worse or swelling starts, please call the out-of-hours number I'll text you." },
        { from: "customer", text: "Yes, Monday at 8:30 please." },
        { from: "ai", text: "You're booked for Monday at 8:30 with Dr. Lee. I'm texting you the confirmation and our address now." },
      ],
      outcome: "Emergency slot booked. The call, symptoms and booking are logged for the front desk to see first thing on Monday.",
    },
    uses: [
      { title: "Books new patients and check-ups", body: "It collects the patient's details, offers open times and books cleanings, exams and consultations." },
      { title: "Follows your emergency protocol", body: "It asks the questions you set, books urgent slots and sends serious cases to your on-call number. It never gives medical advice." },
      { title: "Answers front-desk questions", body: "Opening hours, location, parking, accepted insurance plans and new-patient forms, all from information you approve." },
      { title: "Handles reschedules and cancellations", body: "Patients can move or cancel appointments by phone at any hour, and the freed slot is offered to the next caller." },
      { title: "Logs every call", body: "Caller, reason, urgency and booking go into a booking sheet or your practice software, ready for the front desk." },
      { title: "Covers the hours you choose", body: "Run it after hours only, during lunch, or as overflow when the front desk is busy. Your number stays the same." },
    ],
    pricing: "You pay per booked appointment. No setup fee, nothing up front, and a free 14-day pilot on after-hours and missed calls.",
    faqs: [
      { q: "How much does an AI dental receptionist cost?", a: "With SalnetHub there is no setup fee or monthly retainer. You pay per booked appointment, at a rate below what a new booking costs your practice today, after a free 14-day pilot. Phone and AI usage are billed at cost." },
      { q: "Is the AI receptionist HIPAA compliant?", a: "For US practices we set it up as a HIPAA-ready system: providers that sign a Business Associate Agreement, call data kept in your own accounts and only the details needed to book. We agree the setup with you in writing before the pilot." },
      { q: "Does it work with Dentrix, Open Dental or Eaglesoft?", a: "Where your practice software allows a connection, we book straight into it. Where it does not, the receptionist books into a shared booking sheet and your front desk confirms each appointment in a few seconds." },
      { q: "What happens with dental emergencies?", a: "It follows the protocol you give us: it asks about pain, swelling and fever, books the first emergency slot, and sends serious cases to your on-call number. It never diagnoses or gives medical advice." },
      { q: "What other AI automation do you do for dental clinics?", a: "Besides the receptionist: appointment reminders and recall messages for check-ups, new-patient forms sent before the visit, review requests after treatment and a daily summary of calls for the front desk." },
      { q: "Will it replace my front desk?", a: "No. It answers the calls your team cannot get to, such as after hours, at lunch and during busy check-ins. Your front desk keeps the patient relationships." },
      { q: "Can patients still talk to a person?", a: "Yes. Callers are told they are speaking with an AI assistant and can ask for a person at any time. During office hours the call is transferred; after hours, a call back is booked." },
    ],
  },
  {
    slug: "ai-receptionist-for-medical-office",
    service: "ai-receptionist",
    industry: "Medical",
    name: "AI receptionist for medical offices",
    seo: {
      title: "AI Receptionist for Medical Offices & Clinics",
      description: "An AI receptionist for medical offices that answers the morning call rush, books and reschedules visits and routes clinical calls to your team. Pay per booking.",
    },
    hero: {
      title: "An AI receptionist for medical offices that clears the morning phone queue",
      sub: "Our AI receptionist for medical offices answers when every line is busy or the clinic is closed. It books, moves and cancels appointments, answers practical questions and sends anything clinical to the right person on your team. You pay per booked appointment, after a free 14-day pilot.",
    },
    pains: [
      { title: "Every line rings at 8 am", body: "Patients call the moment you open. Callers sit on hold, give up and try again later, and your staff start the day already behind." },
      { title: "Half the calls are not bookings", body: "Test results, prescription refills, opening hours and directions all arrive on the same line, and each one pulls a person away from the patients in front of them." },
      { title: "Empty slots from no-shows", body: "Patients forget, or cannot get through to cancel. The slot goes unused while someone else waits weeks for an appointment." },
    ],
    conversation: {
      title: "What a patient hears at 7:45 on a Monday",
      caption: "The receptionist books routine visits, takes clinical requests as messages for your staff and never gives medical advice.",
      channel: "call",
      lines: [
        { from: "ai", text: "Good morning, Riverside Family Practice, this is the practice's AI assistant. How can I help?" },
        { from: "customer", text: "Hi, I need to see a doctor about my blood pressure, and I also need my prescription renewed." },
        { from: "ai", text: "I can help with both. For the appointment, Dr. Patel has Wednesday at 9:20 or Thursday at 2:40. Which suits you?" },
        { from: "customer", text: "Wednesday at 9:20, please." },
        { from: "ai", text: "Booked for Wednesday at 9:20 with Dr. Patel. For the prescription, I'll pass a request to the nurse team with your name and the medication. Which medication is it?" },
        { from: "customer", text: "Amlodipine, 5 milligrams." },
        { from: "ai", text: "Thank you. The nurse team will review it today and contact you if they need anything. I'm texting your appointment confirmation now." },
      ],
      outcome: "Appointment booked. Refill request logged for the nurse team with the patient's details. No one on staff had to pick up the phone.",
    },
    uses: [
      { title: "Takes the opening rush", body: "It answers every caller at once, so nobody waits on hold for a routine booking at 8 am." },
      { title: "Books, moves and cancels visits", body: "Patients book, reschedule or cancel by phone at any hour, and freed slots are offered to the next caller." },
      { title: "Routes clinical requests", body: "Test results, refills and symptom questions become messages for the right staff member. It never gives medical advice or reads out results." },
      { title: "Sends reminders", body: "Appointment reminders by text, with an easy way to cancel, so slots are freed up instead of wasted." },
      { title: "Answers practical questions", body: "Opening hours, location, parking, accepted insurance and what to bring, all from information you approve." },
      { title: "Escalates urgent calls", body: "If a caller describes an emergency, it tells them to call emergency services and alerts your team, using the wording you approve." },
    ],
    pricing: "You pay per booked appointment. No setup fee, nothing up front, and a free 14-day pilot on the morning rush, after-hours and missed calls.",
    faqs: [
      { q: "How much does an AI receptionist for a medical office cost?", a: "With SalnetHub there is no setup fee or monthly retainer. You pay per booked appointment, at a rate below what a booking costs your practice today, after a free 14-day pilot. Phone and AI usage are billed at cost." },
      { q: "Is it HIPAA compliant?", a: "For US practices we set it up as a HIPAA-ready system: providers that sign a Business Associate Agreement, call data kept in your own accounts and only the details needed to book or pass on a request. We agree the setup with you in writing before the pilot." },
      { q: "Does it give medical advice?", a: "No. It books, reschedules and answers practical questions. Anything clinical, such as symptoms, results or medication, is taken as a message for your staff, and emergencies are told to call emergency services." },
      { q: "Does it work with our practice management or EHR system?", a: "Where your scheduling system allows a connection, we book straight into it. Where it does not, the receptionist books into a shared booking sheet and your staff confirm each appointment in a few seconds." },
      { q: "Which kinds of clinics is it for?", a: "Family and primary care practices, specialist clinics, physiotherapy, chiropractic and other outpatient clinics that book by phone. For dental practices, see our AI receptionist for dental offices." },
      { q: "Can patients still talk to a person?", a: "Yes. Callers are told they are speaking with an AI assistant and can ask for a person at any time. During office hours the call is transferred; after hours, a call back is booked." },
    ],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
export const solutionsFor = (serviceSlug: string) => solutions.filter((s) => s.service === serviceSlug);
