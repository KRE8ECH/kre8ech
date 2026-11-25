/**
 * KRE8ECH Registration -> Google Sheets Web App
 *
 * Setup:
 * 1. Create or open your Google Sheet (you can download it as .xlsx anytime via File -> Download -> Microsoft Excel).
 * 2. Open Extensions -> Apps Script, replace Code.gs with this file, and Save.
 * 3. Click Deploy -> New deployment -> Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL (ends with /exec) and set it as:
 *    - GitHub Actions repository variable: NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL
 *    - Or local .env.local: NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

var SHEET_CONFIG = {
  "Student Registrations": [
    "Timestamp (IST)",
    "Record ID",
    "Full Name",
    "Email",
    "Phone / WhatsApp",
    "School / College",
    "Class / Year",
    "City",
    "Program",
    "Tech Interests",
    "Status",
    "Registered Date",
    "Notes"
  ],
  "Hackready Workshop": [
    "Timestamp (IST)",
    "Record ID",
    "Full Name",
    "Roll No",
    "Branch",
    "Semester",
    "Email",
    "Phone / WhatsApp",
    "College Name",
    "Status",
    "Registered Date",
    "Notes"
  ],
  "Contact Enquiries": [
    "Timestamp (IST)",
    "Record ID",
    "Name",
    "Email",
    "Enquiry Type",
    "School / Organization",
    "Message"
  ]
};

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: "kre8ech-sheets-sync" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    var data = JSON.parse(raw);

    var targetSheetName = resolveSheetName_(data);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSheet_(ss, targetSheetName);

    // Prevent duplicate rows for the same record ID
    var recordId = String(data.id || "");
    if (recordId && hasRecordId_(sheet, recordId)) {
      return jsonResponse_({ ok: true, duplicate: true, sheet: targetSheetName });
    }

    var istTime = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var row = buildRow_(targetSheetName, istTime, data);
    sheet.appendRow(row);

    return jsonResponse_({ ok: true, sheet: targetSheetName, id: recordId });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function resolveSheetName_(data) {
  if (data.sheetName && SHEET_CONFIG[data.sheetName]) {
    return data.sheetName;
  }
  if (data.program === "Hackready Workshop" || data.registeredProgram === "Hackready Workshop" || data.rollNo) {
    return "Hackready Workshop";
  }
  if (data.enquiryType || data.message) {
    return "Contact Enquiries";
  }
  return "Student Registrations";
}

function getOrCreateSheet_(ss, name) {
  var sheet = ss.getSheetByName(name);
  var headers = SHEET_CONFIG[name];

  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  if (sheet.getLastRow() === 0 && headers) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#F6C900");
    headerRange.setFontColor("#202124");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function hasRecordId_(sheet, recordId) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;
  var ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === recordId) return true;
  }
  return false;
}

function buildRow_(sheetName, istTime, d) {
  if (sheetName === "Hackready Workshop") {
    return [
      istTime,
      d.id || "",
      d.fullName || "",
      d.rollNo || "",
      d.branch || "",
      d.semester || "",
      d.email || "",
      d.phoneNumber || "",
      d.collegeName || "",
      d.status || "Confirmed",
      d.registeredAt || "",
      d.notes || ""
    ];
  }

  if (sheetName === "Contact Enquiries") {
    return [
      istTime,
      d.id || "",
      d.name || "",
      d.email || "",
      d.enquiryType || "",
      d.schoolName || "",
      d.message || ""
    ];
  }

  var interests = Array.isArray(d.techInterests)
    ? d.techInterests.join(", ")
    : (d.techInterests || "");

  return [
    istTime,
    d.id || "",
    d.fullName || "",
    d.email || "",
    d.phoneNumber || "",
    d.schoolCollege || "",
    d.classYear || "",
    d.city || "",
    d.registeredProgram || "",
    interests,
    d.status || "Confirmed",
    d.registeredAt || "",
    d.notes || ""
  ];
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
