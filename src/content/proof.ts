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
