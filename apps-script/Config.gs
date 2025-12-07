// Secrets are stored in Script Properties
// To set: Script Editor → Project Settings → Script Properties
// Required properties:
// - CLIENT_ID: OAuth2 Client ID from Google Cloud Console
// - CLIENT_SECRET: OAuth2 Client Secret
// - DB_SHEET_ID: Google Sheets ID for user database

var CLIENT_ID = PropertiesService.getScriptProperties().getProperty('CLIENT_ID');
var CLIENT_SECRET = PropertiesService.getScriptProperties().getProperty('CLIENT_SECRET');
var DB_SHEET_ID = PropertiesService.getScriptProperties().getProperty('DB_SHEET_ID');

// Validate properties on load
function validateConfig() {
  if (!CLIENT_ID || !CLIENT_SECRET || !DB_SHEET_ID) {
    throw new Error('Missing required Script Properties. Please set CLIENT_ID, CLIENT_SECRET, and DB_SHEET_ID in Project Settings.');
  }
}

// Database Helper
function getDbSheet() {
  return SpreadsheetApp.openById(DB_SHEET_ID).getSheetByName('Users');
}


