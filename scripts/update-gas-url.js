#!/usr/bin/env node

/**
 * Updates the GAS_URL in docs/index.html after deployment
 * Usage: node scripts/update-gas-url.js <new-url>
 */

const fs = require('fs');
const path = require('path');

const newUrl = process.argv[2];

if (!newUrl) {
  console.error('❌ Error: No URL provided');
  console.error('Usage: node scripts/update-gas-url.js <new-url>');
  process.exit(1);
}

const htmlPath = path.join(__dirname, '../docs/index.html');

if (!fs.existsSync(htmlPath)) {
  console.error(`❌ Error: ${htmlPath} not found`);
  process.exit(1);
}

let content = fs.readFileSync(htmlPath, 'utf8');

// Match the GAS_URL line with various formats
const gasUrlPattern = /const GAS_URL = ['"][^'"]+['"];/;

if (!gasUrlPattern.test(content)) {
  console.error('❌ Error: Could not find GAS_URL in index.html');
  process.exit(1);
}

// Replace with new URL
const updatedContent = content.replace(
  gasUrlPattern,
  `const GAS_URL = '${newUrl}';`
);

// Write back
fs.writeFileSync(htmlPath, updatedContent, 'utf8');

console.log('✅ Successfully updated GAS_URL in docs/index.html');
console.log(`   New URL: ${newUrl}`);
