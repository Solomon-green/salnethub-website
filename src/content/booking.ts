// Booking rules for the Book a call calendar. Free times are these hours minus anything
// already on the Google Calendar, so blocking time in Google Calendar removes it here too.
export const booking = {
  title: "SalnetHub automation call",
  durationMinutes: 20,
  // Minutes between the start of one offered slot and the next.
  slotStepMinutes: 30,
  // Kept clear before and after every existing event.
  bufferMinutes: 10,
  minNoticeHours: 12,
  daysAhead: 21,
  timeZone: "Africa/Nairobi",
  // 0 = Sunday ... 6 = Saturday
  workDays: [1, 2, 3, 4, 5],
  dayStart: "09:00",
  dayEnd: "17:00",
};
