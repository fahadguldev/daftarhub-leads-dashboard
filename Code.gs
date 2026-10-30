/**
 * Google Apps Script for DaftarHub Leads Dashboard
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1AiuP1lstXRkSq-WR7nt5HBICgsNQzkxYriXWdu93Wps/edit
 * 2. Click Extensions > Apps Script
 * 3. Delete any default code, paste this entire file, and click Save (Ctrl+S / Cmd+S).
 * 4. Click Deploy > New deployment.
 * 5. Select type: "Web app".
 * 6. Set Description: "DaftarHub API"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone" (allows your HTML dashboard to read/write).
 * 9. Click Deploy, Authorize access, and copy the Web App URL.
 * 10. Paste that URL into your DaftarHub Dashboard!
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", leads: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = data[0];
    var leads = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[0] && !row[6]) continue; // Skip empty rows
      
      var lead = {
        rowIndex: i + 1, // 1-based index in Sheet
        companyName: row[0] || "",
        industry: row[1] || "",
        location: row[2] || "",
        estimatedEmployees: row[3] || "",
        website: row[4] || "",
        googleMaps: row[5] || "",
        decisionMakerName: row[6] || "",
        designation: row[7] || "",
        email: row[8] || "",
        phone: row[9] || "",
        whatsapp: row[10] || "",
        decisionMakerLinkedIn: row[11] || "",
        companyLinkedIn: row[12] || "",
        instagram: row[13] || "",
        facebook: row[14] || "",
        otherProfiles: row[15] || "",
        daftarHubFit: row[16] || "",
        contacted: row[17] || "No",
        contactDate: row[18] ? Utilities.formatDate(new Date(row[18]), "Asia/Karachi", "yyyy-MM-dd") : "",
        followup1Date: row[19] ? Utilities.formatDate(new Date(row[19]), "Asia/Karachi", "yyyy-MM-dd") : "",
        followup1Status: row[20] || "Pending",
        followup2Date: row[21] ? Utilities.formatDate(new Date(row[21]), "Asia/Karachi", "yyyy-MM-dd") : "",
        followup2Status: row[22] || "Pending",
        notes: row[23] || "",
        dateAdded: row[24] ? Utilities.formatDate(new Date(row[24]), "Asia/Karachi", "yyyy-MM-dd") : ""
      };
      leads.push(lead);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", leads: leads }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    
    var rowIndex = payload.rowIndex;
    if (!rowIndex || rowIndex < 2) {
      throw new Error("Invalid rowIndex: " + rowIndex);
    }
    
    // Column indices (1-based in Apps Script):
    // R (18): Contacted?
    // S (19): Contact Date
    // T (20): Follow-up 1 Date
    // U (21): Follow-up 1 Status
    // V (22): Follow-up 2 Date
    // W (23): Follow-up 2 Status
    // X (24): Notes
    
    if (payload.contacted !== undefined) sheet.getRange(rowIndex, 18).setValue(payload.contacted);
    if (payload.contactDate !== undefined) sheet.getRange(rowIndex, 19).setValue(payload.contactDate);
    if (payload.followup1Date !== undefined) sheet.getRange(rowIndex, 20).setValue(payload.followup1Date);
    if (payload.followup1Status !== undefined) sheet.getRange(rowIndex, 21).setValue(payload.followup1Status);
    if (payload.followup2Date !== undefined) sheet.getRange(rowIndex, 22).setValue(payload.followup2Date);
    if (payload.followup2Status !== undefined) sheet.getRange(rowIndex, 23).setValue(payload.followup2Status);
    if (payload.notes !== undefined) sheet.getRange(rowIndex, 24).setValue(payload.notes);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", updatedRow: rowIndex }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
