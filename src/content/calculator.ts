// Shared by the hero example and the cost calculator, so both always show the same number.
export const calculator = {
  weeks: 48, // working weeks in a year
  share: 0.5, // conservative: assume one project removes half the manual time
  defaults: { people: 3, hours: 6, rate: 25 },
};

// "Leads and bookings" tab: what one booked appointment really costs = cost per lead / share that book.
export const leadCalculator = {
  defaults: { costPerLead: 40, bookPct: 25, leadsPerMonth: 100 },
};

export const yearlyCost = (people: number, hours: number, rate: number) => people * hours * calculator.weeks * rate;
