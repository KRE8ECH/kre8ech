/**
 * KRE8ECH — Google Sheets Auto-Sync Web App
 *
 * Automatically appends registrations and enquiries from kre8ech.pages.dev
 * into separate tabs inside one Google Spreadsheet (exportable as .xlsx).
 *
 * Deployment steps:
 * 1. Open Google Sheets (sheets.new) -> Extensions -> Apps Script.
 * 2. Paste this entire file into Code.gs and save.
 * 3. Deploy -> New deployment -> Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL (ending in /exec) and set it as
 *    NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL in Cloudflare Pages (and .env.local).
 */

var SHEET_SCHEMAS = {
  "Student Registrations": [
    "ID",
    "Timestamp (IST)",
    "Registered Date",
    "Full Name",
    "Email",
    "Phone Number",
    "School / College",
    "Class / Year",
    "City",
    "Tech Interests",
    "Program",
    "Status",
    "Notes"
  ],
  "Hackready Workshop": [
    "ID",
    "Timestamp (IST)",
    "Registered At",
    "Full Name",
    "Roll No",
    "Branch",
    "Semester",
    "Email",
    "Phone Number",
    "Program",
    "Status"
  ],
  "Contact Enquiries": [
    "ID",
    "Timestamp (IST)",
    "Submitted Date",
    "Name",
    "Email",
    "Enquiry Type",
    "School / Organization",
    "Message",
    "Status"
  ]
};

// Columns formatted as plain text (@) so phone numbers (+91...) and leading-zero roll numbers
// are stored verbatim instead of being evaluated as formulas or numbers.
var TEXT_COLUMNS_BY_SHEET = {
  "Student Registrations": [1, 6],
  "Hackready Workshop": [1, 5, 9],
  "Contact Enquiries": [1]
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("KRE8ECH Sync")
    .addItem("Initialize / Format All Sheet Tabs", "initializeAllSheets")
    .addToUi();
}

function initializeAllSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var names = Object.keys(SHEET_SCHEMAS);
  for (var i = 0; i < names.length; i++) {
    var sheet = getOrCreateSheet(ss, names[i]);
    formatColumnsSafe(sheet, SHEET_SCHEMAS[names[i]].length);
  }
}

function doGet() {
  return jsonResponse({
    ok: true,
    service: "kre8ech-sheets-sync",
    sheets: Object.keys(SHEET_SCHEMAS)
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);

    var rawBody = "";
    if (e && e.postData && typeof e.postData.contents === "string") {
      rawBody = e.postData.contents;
    } else if (e && e.parameter && typeof e.parameter.payload === "string") {
      rawBody = e.parameter.payload;
    }

    if (!rawBody) {
      return jsonResponse({ ok: false, error: "Empty request body" });
    }

    var payload = JSON.parse(rawBody);
    var sheetName = resolveSheetName(payload);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSheet(ss, sheetName);

    var recordId = str(payload.id);
    if (recordId && hasDuplicateId(sheet, recordId)) {
      return jsonResponse({
        ok: true,
        duplicate: true,
        sheet: sheetName,
        id: recordId
      });
    }

    var nowIst = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var rowValues = buildRowValues(sheetName, payload, nowIst);
    appendRowSafely(sheet, sheetName, rowValues);

    return jsonResponse({
      ok: true,
      duplicate: false,
      sheet: sheetName,
      id: recordId || null
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: err && err.message ? err.message : String(err)
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (_ignored) {
      // Lock may already be released if waitLock threw.
    }
  }
}

function resolveSheetName(payload) {
  var explicit = str(payload && payload.sheetName);
  if (SHEET_SCHEMAS[explicit]) {
    return explicit;
  }
  var program = str(payload && payload.program) || str(payload && payload.registeredProgram);
  if (program === "Hackready Workshop" || str(payload && payload.rollNo)) {
    return "Hackready Workshop";
  }
  if (str(payload && payload.message) && !str(payload && payload.phoneNumber)) {
    return "Contact Enquiries";
  }
  return "Student Registrations";
}

function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0) {
    var headers = SHEET_SCHEMAS[sheetName];
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#FFD000");
    headerRange.setFontColor("#202124");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function hasDuplicateId(sheet, recordId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }
  var idValues = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  for (var i = 0; i < idValues.length; i++) {
    if (String(idValues[i][0]).trim() === recordId) {
      return true;
    }
  }
  return false;
}

function buildRowValues(sheetName, payload, nowIst) {
  if (sheetName === "Hackready Workshop") {
    return [
      str(payload.id) || "hr-" + Date.now(),
      nowIst,
      str(payload.registeredAt) || nowIst,
      str(payload.fullName),
      str(payload.rollNo),
      str(payload.branch),
      str(payload.semester),
      str(payload.email),
      str(payload.phoneNumber),
      str(payload.program) || "Hackready Workshop",
      str(payload.status) || "Registered"
    ];
  }

  if (sheetName === "Contact Enquiries") {
    return [
      str(payload.id) || "inq-" + Date.now(),
      nowIst,
      str(payload.submittedAt) || nowIst,
      str(payload.name),
      str(payload.email),
      str(payload.type),
      str(payload.schoolName),
      str(payload.message),
      str(payload.status) || "New"
    ];
  }

  var interests = Array.isArray(payload.techInterests)
    ? payload.techInterests.join(", ")
    : str(payload.techInterests);

  return [
    str(payload.id) || "reg-" + Date.now(),
    nowIst,
    str(payload.registeredAt) || nowIst,
    str(payload.fullName),
    str(payload.email),
    str(payload.phoneNumber),
    str(payload.schoolCollege),
    str(payload.classYear),
    str(payload.city),
    interests,
    str(payload.registeredProgram),
    str(payload.status) || "Confirmed",
    str(payload.notes)
  ];
}

function appendRowSafely(sheet, sheetName, rowValues) {
  var nextRow = sheet.getLastRow() + 1;
  var rowRange = sheet.getRange(nextRow, 1, 1, rowValues.length);
  var textCols = TEXT_COLUMNS_BY_SHEET[sheetName] || [];
  for (var i = 0; i < textCols.length; i++) {
    var col = textCols[i];
    if (col >= 1 && col <= rowValues.length) {
      sheet.getRange(nextRow, col).setNumberFormat("@");
    }
  }
  rowRange.setValues([rowValues]);
  rowRange.setVerticalAlignment("middle");
  rowRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  if (nextRow % 2 === 1) {
    rowRange.setBackground("#FFFDF5");
  }
  formatColumnsSafe(sheet, rowValues.length);
}

function formatColumnsSafe(sheet, colCount) {
  try {
    sheet.autoResizeColumns(1, colCount);
  } catch (_ignored) {
    // Ignore auto-resize limits on headless executions.
  }
}

function str(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).trim();
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
