# DaftarHub Leads Dashboard

A lightweight, modern dashboard interface and Google Apps Script integration for managing, filtering, and tracking B2B leads backed by Google Sheets.

## Overview

This project provides:
- **`daftarhub-dashboard.html`**: A responsive, standalone single-page dashboard featuring search, status filters (Fit, Contacted, Follow-ups), direct communication shortcuts (WhatsApp, Email, Phone, Social Profiles), and real-time synchronization with Google Sheets.
- **`Code.gs`**: A Google Apps Script endpoint (`doGet` and `doPost`) deployed as a Web App to interface securely between the dashboard and your Google Sheets database.
- **Reference Docs**: Architectural and CRM comparison references.

---

## Setup & Deployment

### 1. Google Sheets & Apps Script Setup
1. Open your target Google Sheet.
2. In the top menu, navigate to **Extensions > Apps Script**.
3. Replace any existing boilerplate code with the contents of [`Code.gs`](./Code.gs).
4. Save the script (`Ctrl + S` or `Cmd + S`).
5. Click **Deploy > New deployment**.
6. Select type: **Web app**.
   - **Description**: `DaftarHub API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
7. Click **Deploy**, authorize permissions when prompted, and copy the generated **Web App URL**.

### 2. Connect Dashboard
1. Open [`daftarhub-dashboard.html`](./daftarhub-dashboard.html) in your browser.
2. Enter your deployed Google Apps Script Web App URL into the configuration/API prompt.
3. Your leads will load automatically from the Google Sheet, enabling live status updates and follow-up tracking.

---

## License
MIT
