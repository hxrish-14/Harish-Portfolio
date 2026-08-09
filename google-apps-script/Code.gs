/**
 * HARISH'S PORTFOLIO — Contact Form Backend
 * ------------------------------------------------------------------
 * Deploy this as a Google Apps Script Web App bound to a Google Sheet.
 * It receives POSTs from the contact form (name, email, message),
 * validates them, and appends a row: [timestamp, name, email, message].
 *
 * SETUP
 * 1. Go to https://sheet.new to create a fresh Google Sheet.
 *    (Optional) Rename the first row's cells to: Timestamp | Name | Email | Message
 * 2. In the Sheet, open Extensions → Apps Script.
 * 3. Delete any starter code in Code.gs and paste this entire file in its place.
 * 4. Click Deploy → New deployment.
 *      - Select type: Web app
 *      - Description: anything, e.g. "Portfolio contact form"
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize the script when prompted (it only needs access
 *    to this one spreadsheet), then copy the Web app URL it gives you.
 * 6. Paste that URL into `portfolioData.formEndpoint` in script.js.
 * 7. Re-deploy (Deploy → Manage deployments → Edit → New version) any time
 *    you change this file — Apps Script doesn't auto-update a live URL.
 *
 * SECURITY NOTE
 * This URL is safe to put in frontend code: it only accepts POSTs and only
 * writes rows to this one sheet. It never exposes a private API key — the
 * Web App URL itself is the access boundary, and it can only append data,
 * never read arbitrary files or run other actions.
 * ------------------------------------------------------------------
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No data received." });
    }

    var data = JSON.parse(e.postData.contents);
    var name = (data.name || "").toString().trim();
    var email = (data.email || "").toString().trim();
    var message = (data.message || "").toString().trim();

    // ---- Validation ----
    if (!name || !email || !message) {
      return jsonResponse({ status: "error", message: "Please fill in every field." });
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return jsonResponse({ status: "error", message: "That email address doesn't look right." });
    }

    if (name.length > 200 || email.length > 200 || message.length > 5000) {
      return jsonResponse({ status: "error", message: "One of the fields is too long." });
    }

    // ---- Basic duplicate-submission guard (same email + message within 2 minutes) ----
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow > 0) {
      var recentRows = Math.min(lastRow, 5);
      var range = sheet.getRange(lastRow - recentRows + 1, 1, recentRows, 4).getValues();
      var now = new Date();
      for (var i = 0; i < range.length; i++) {
        var rowTime = new Date(range[i][0]);
        var rowEmail = range[i][2];
        var rowMessage = range[i][3];
        var secondsAgo = (now - rowTime) / 1000;
        if (rowEmail === email && rowMessage === message && secondsAgo < 120) {
          return jsonResponse({ status: "success", message: "We'll get in touch soon !" });
        }
      }
    }

    // ---- Append row ----
    sheet.appendRow([new Date(), name, email, message]);

    return jsonResponse({ status: "success", message: "We'll get in touch soon !" });
  } catch (err) {
    return jsonResponse({ status: "error", message: "Server error. Please try again later." });
  }
}

// Optional: lets you sanity-check the deployed URL by visiting it directly in a browser.
function doGet(e) {
  return jsonResponse({ status: "ok", message: "Portfolio contact form endpoint is live." });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
