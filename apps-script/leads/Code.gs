/**
 * SalnetHub Website Leads: receives leads from www.salnethub.com and writes one row per
 * contact-form enquiry or booked call, with the visitor's page journey.
 *
 * Bound to the "SalnetHub Website Leads" sheet (Extensions → Apps Script).
 * One-time setup:
 *   1. Run setup() once and approve access. It formats the sheet, sets the Kampala time zone
 *      and creates the shared secret (shown in the execution log).
 *   2. Deploy → New deployment → Web app · Execute as: Me · Who has access: Anyone.
 *   3. Put the web app URL and the secret in Vercel as LEADS_WEBHOOK_URL and LEADS_WEBHOOK_SECRET.
 *
 * The website's server calls this, never the visitor's browser, so the secret is not public.
 */

const LEADS_TAB = 'Leads';
const TEST_TAB = 'Test Leads';
const TIME_ZONE = 'Africa/Kampala';
const MAX_CELL = 5000;

const COLUMNS = [
  'Time', 'Action', 'Name', 'Email', 'Company', 'Team size', 'Interest', 'Message / notes', 'Call time',
  'Source', 'Medium', 'Campaign', 'Referrer', 'First page', 'Pages visited', 'Page count', 'Visits',
  'Time on site', 'First seen', 'Device', 'Status', 'Follow-up notes',
];
const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal sent', 'Won', 'Lost'];

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const secret = PropertiesService.getScriptProperties().getProperty('LEADS_SECRET');
    if (!secret || body.secret !== secret) return json_({ ok: false, error: 'unauthorized' });

    const lead = body.lead || {};
    if (!lead.email || !lead.name) return json_({ ok: false, error: 'missing name or email' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = tab_(body.test ? TEST_TAB : LEADS_TAB);
      sheet.appendRow(row_(lead, body.journey || {}));
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server error' });
  }
}

// Health check: opening the web app URL in a browser shows this.
function doGet() {
  return json_({ ok: true, service: 'SalnetHub leads' });
}

function row_(lead, j) {
  const pages = Array.isArray(j.pages) ? j.pages : [];
  const trail = pages.map((p) => p.path).filter(Boolean).join(' → ');
  return [
    new Date(),
    lead.action === 'booking' ? 'Booked call' : 'Contact form',
    lead.name,
    lead.email,
    lead.company,
    lead.teamSize,
    lead.interest,
    lead.message,
    lead.callTime ? Utilities.formatDate(new Date(lead.callTime), TIME_ZONE, 'd MMM yyyy, HH:mm') + ' (Kampala)' : '',
    j.source || (pages.length ? '(direct)' : ''),
    j.medium,
    j.campaign,
    j.referrer,
    j.landing,
    trail,
    pages.length || '',
    j.visits || '',
    duration_(j.timeOnSite),
    j.firstSeen ? new Date(j.firstSeen) : '',
    j.device,
    'New',
    '',
  ].map(clean_);
}

// Plain text only: trims long values and stops "=", "+", "-", "@" from running as formulas.
function clean_(v) {
  if (v instanceof Date || typeof v === 'number') return v;
  let s = v == null ? '' : String(v).slice(0, MAX_CELL);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function duration_(seconds) {
  const s = Math.round(Number(seconds) || 0);
  if (!s) return '';
  const m = Math.floor(s / 60);
  return m ? `${m}m ${s % 60}s` : `${s}s`;
}

function tab_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || format_(ss.insertSheet(name));
}

function format_(sheet) {
  sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS])
    .setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#475BFF').setVerticalAlignment('middle');
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(3);
  sheet.setRowHeight(1, 32);
  const widths = [150, 110, 160, 220, 160, 90, 170, 320, 190, 120, 100, 130, 200, 220, 420, 90, 70, 100, 150, 90, 120, 260];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  const rows = sheet.getMaxRows() - 1;
  sheet.getRange(2, 1, rows, 1).setNumberFormat('d mmm yyyy, hh:mm');
  sheet.getRange(2, 19, rows, 1).setNumberFormat('d mmm yyyy');
  sheet.getRange(2, 8, rows, 1).setWrap(true);
  sheet.getRange(2, 15, rows, 1).setWrap(true);
  sheet.getRange(2, 21, rows, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build());
  if (!sheet.getFilter()) sheet.getRange(1, 1, sheet.getMaxRows(), COLUMNS.length).createFilter();
  return sheet;
}

/** Run once from the editor. Safe to run again: it keeps existing rows and the existing secret. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIME_ZONE);

  let leads = ss.getSheetByName(LEADS_TAB);
  if (!leads) {
    leads = ss.getSheets()[0];
    leads.setName(LEADS_TAB);
  }
  if (leads.getFilter()) leads.getFilter().remove();
  format_(leads);
  if (ss.getSheetByName(TEST_TAB)) {
    const test = ss.getSheetByName(TEST_TAB);
    if (test.getFilter()) test.getFilter().remove();
    format_(test);
  } else {
    format_(ss.insertSheet(TEST_TAB));
  }

  const props = PropertiesService.getScriptProperties();
  let secret = props.getProperty('LEADS_SECRET');
  if (!secret) {
    secret = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    props.setProperty('LEADS_SECRET', secret);
  }
  console.log('Setup done. LEADS_WEBHOOK_SECRET for Vercel: ' + secret);
}

/** Optional: run from the editor to check a row lands in "Test Leads". */
function testLead() {
  const secret = PropertiesService.getScriptProperties().getProperty('LEADS_SECRET');
  const res = doPost({ postData: { contents: JSON.stringify({
    secret, test: true,
    lead: { action: 'contact', name: 'Test Lead', email: 'test@example.com', company: 'Example Ltd', teamSize: '2-10', interest: 'CRM automation', message: 'Editor test.' },
    journey: {
      source: 'google', medium: 'organic', landing: '/blog/sample', visits: 2, timeOnSite: 312,
      firstSeen: new Date().toISOString(), device: 'Desktop',
      pages: [{ path: '/blog/sample' }, { path: '/services' }, { path: '/engagements' }, { path: '/contact' }],
    },
  }) } });
  console.log(res.getContent());
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
