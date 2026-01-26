#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const log = {
  error: (msg) => console.error(`${colors.red}${colors.bold}✗ ERROR${colors.reset} ${msg}`),
  warn: (msg) => console.warn(`${colors.yellow}${colors.bold}⚠ WARNING${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}${colors.bold}ℹ INFO${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}${colors.bold}✓ SUCCESS${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.cyan}${colors.bold}${msg}${colors.reset}`),
};

// Paths
const i18nDir = path.join(__dirname, '../src/i18n');
const languages = ['en', 'pt', 'fr', 'de', 'zh', 'ja', 'ko'];

let hasErrors = false;
let hasWarnings = false;

// Step 1: Check if i18n directory exists
if (!fs.existsSync(i18nDir)) {
  log.error(`i18n directory not found at ${i18nDir}`);
  process.exit(1);
}

log.header('🔍 Checking i18n Translation Files');

// Step 2: Load all translation files
const translations = {};
const fileStats = {};

for (const lang of languages) {
  const filePath = path.join(i18nDir, `${lang}.json`);
  
  if (!fs.existsSync(filePath)) {
    log.error(`Missing file: ${lang}.json`);
    hasErrors = true;
    continue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    translations[lang] = JSON.parse(content);
    fileStats[lang] = {
      path: filePath,
      size: fs.statSync(filePath).size,
      keys: Object.keys(translations[lang]).length,
    };
  } catch (error) {
    log.error(`Failed to parse ${lang}.json: ${error.message}`);
    hasErrors = true;
  }
}

// Step 3: Check for duplicate keys (shouldn't happen in valid JSON, but check anyway)
log.header('📋 Checking for Duplicate Keys');

let duplicatesFound = false;
for (const [lang, trans] of Object.entries(translations)) {
  const keys = Object.keys(trans);
  const uniqueKeys = new Set(keys);
  
  if (keys.length !== uniqueKeys.size) {
    log.error(`Duplicate keys found in ${lang}.json`);
    duplicatesFound = true;
    hasErrors = true;
  }
}

if (!duplicatesFound) {
  log.success('No duplicate keys found in any language file');
}

// Step 4: Compare keys across languages (using en.json as base)
log.header('🔗 Comparing Keys Across Languages');

if (!translations.en) {
  log.error('Base language file (en.json) not found or failed to parse');
  process.exit(1);
}

const baseKeys = new Set(Object.keys(translations.en));
let keyComparisonErrors = false;

for (const lang of languages) {
  if (lang === 'en' || !translations[lang]) continue;

  const langKeys = new Set(Object.keys(translations[lang]));
  
  // Check for missing keys
  const missingKeys = Array.from(baseKeys).filter(key => !langKeys.has(key));
  
  // Check for extra keys
  const extraKeys = Array.from(langKeys).filter(key => !baseKeys.has(key));

  if (missingKeys.length > 0) {
    log.error(`${lang}.json is missing ${missingKeys.length} key(s):`);
    missingKeys.forEach((key, idx) => {
      console.error(`  ${idx + 1}. ${key}`);
    });
    keyComparisonErrors = true;
    hasErrors = true;
  }

  if (extraKeys.length > 0) {
    log.warn(`${lang}.json has ${extraKeys.length} extra key(s) not in en.json:`);
    extraKeys.forEach((key, idx) => {
      console.warn(`  ${idx + 1}. ${key}`);
    });
    hasWarnings = true;
  }

  if (missingKeys.length === 0 && extraKeys.length === 0) {
    log.success(`${lang}.json matches en.json (${langKeys.size} keys)`);
  }
}

// Step 5: Summary
log.header('📊 Summary');

console.log('\nFile Statistics:');
for (const [lang, stats] of Object.entries(fileStats)) {
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`  ${lang.toUpperCase()}: ${stats.keys} keys, ${sizeKB} KB`);
}

console.log(`\nTotal Languages: ${Object.keys(fileStats).length}`);
console.log(`Total Keys (en.json): ${baseKeys.size}`);

// Final result
if (hasErrors) {
  log.header('❌ Validation Failed');
  console.error(`\n${colors.red}${colors.bold}BUILD BLOCKED${colors.reset}`);
  console.error('Please fix the errors above before deploying.\n');
  process.exit(1);
} else if (hasWarnings) {
  log.header('⚠️ Validation Passed with Warnings');
  console.warn(`\n${colors.yellow}${colors.bold}BUILD ALLOWED (with warnings)${colors.reset}`);
  console.warn('Please review the warnings above.\n');
  process.exit(0);
} else {
  log.header('✅ Validation Passed');
  console.log(`\n${colors.green}${colors.bold}All checks passed! Ready to build.${colors.reset}\n`);
  process.exit(0);
}
