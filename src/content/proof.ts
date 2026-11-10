// Social proof. Only real, attributable reviews go here: every section that reads this file
// stays hidden until it has something true to show.

export type Testimonial = {
  quote: string;
  name: string; // "Sarah K." or a full name, as the client agreed
  role: string; // "Founder, Northwind Dental" or "Operations lead, e-commerce brand"
  company?: string; // used as the logo's alt text
  logo?: string; // optional client logo in public/clients/, e.g. "/clients/northwind.svg"
  result?: string; // optional headline outcome, e.g. "12 hours a week back"
  source?: "Upwork" | "Direct";
  sample?: boolean; // design preview only: hidden on the live production site
};

// Paste Upwork feedback here (with the client's permission to quote it).
export const testimonials: Testimonial[] = [
  {
    quote: "Solomon took a complex brief, with a router, four separate brains, Luganda and English, and wellbeing safeguards, and delivered a bot that works exactly as we hoped. We were thrilled with the result and are already planning the next phase with him.",
    name: "Edith",
    role: "US-based youth coaching team, Uganda",
    result: "Live Telegram AI coach in n8n",
    source: "Upwork",
  },
  {
    quote: "Bwire does a great job for our company and we have used him multiple times. Great hire! I suggest you do the same!",
    name: "CEO",
    role: "Defence and commercial construction contractor",
    result: "Hired for a second build",
    source: "Upwork",
  },
  {
    quote:
      "Solomon is a fantastic person who will get the job done with integrity. Not only will he deliver, but he will also think about optimising your current workflow for efficiency. His communication skills are great, and he is great at keeping deadlines. I would not hesitate to hire him anytime we need an automation specialist.",
    name: "CEO",
    role: "Retention marketing agency for Shopify brands",
    result: "Meetings booked: 15–30 → 30–45 a month",
    source: "Upwork",
  },
  // SAMPLE reviews for the design preview (sample: true hides them on the live site). Replace with real Upwork feedback.
  {
    quote: "Every enquiry now gets a reply in minutes and lands in HubSpot without anyone touching it. Our front desk finally has time for patients.",
    name: "Dana Ortiz",
    role: "Practice manager, Northwind Dental",
    company: "Northwind Dental",
    logo: "/clients/sample-northwind-dental.svg",
    source: "Upwork",
    sample: true,
  },
  {
    quote: "The quote agent drafts most replies before we have opened the inbox. We approve, send and move on. Same-day quotes are now normal.",
    name: "Marcus Bell",
    role: "Operations director, Atlas Freight",
    company: "Atlas Freight",
    logo: "/clients/sample-atlas-freight.svg",
    source: "Upwork",
    sample: true,
  },
  {
    quote: "Monday mornings used to be spreadsheets. Now the report is waiting in my inbox at 8 am, and it is right every time.",
    name: "Priya Shah",
    role: "Founder, Brightleaf Home",
    company: "Brightleaf Home",
    logo: "/clients/sample-brightleaf-home.svg",
    source: "Direct",
    sample: true,
  },
];

// Upwork profile stats. Leave a field null and it is simply not shown.
export const upwork: {
  rating: number | null; // e.g. 5.0
  jobSuccess: number | null; // e.g. 100 (percent)
  badge: string | null; // e.g. "Top Rated"
  profileUrl: string | null;
} = {
  rating: null,
  jobSuccess: null,
  badge: null,
  profileUrl: null,
};
