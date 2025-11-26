#!/usr/bin/env node
/**
 * Invite Generator Script
 *
 * Generates unique invite URLs for wedding guests with UUIDs.
 * Also outputs a mapping JSON file for tracking which UUID belongs to which guest.
 *
 * Usage: npx tsx scripts/generate-invites.ts
 *
 * Requirements:
 * - Node.js 18+ (for crypto.randomUUID())
 * - tsx package (install with: pnpm add -D tsx)
 */

import { writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

// Configuration
// TODO: Replace USERNAME with your GitHub username
const BASE_URL = 'https://USERNAME.github.io/evite';
const OUTPUT_FILE = 'invites.json';

// Guest list - Replace with your actual guest names
const guests = [
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
  'David Kim',
  'Jessica Martinez',
];

interface Invite {
  name: string;
  id: string;
  url: string;
}

/**
 * Generate invite URLs with unique UUIDs for each guest
 */
function generateInvites(): Invite[] {
  return guests.map((name) => {
    const id = randomUUID();
    const url = `${BASE_URL}?id=${id}`;

    return { name, id, url };
  });
}

/**
 * Main execution
 */
function main() {
  console.log('Generating invite URLs...\n');

  const invites = generateInvites();

  // Display invites in console
  console.log('Generated Invites:');
  console.log('='.repeat(80));
  invites.forEach((invite, index) => {
    console.log(`\n${index + 1}. ${invite.name}`);
    console.log(`   UUID: ${invite.id}`);
    console.log(`   URL:  ${invite.url}`);
  });
  console.log('\n' + '='.repeat(80));

  // Save to JSON file
  const output = {
    generated: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalInvites: invites.length,
    invites: invites,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\nInvite mapping saved to: ${OUTPUT_FILE}`);
  console.log(`Total invites generated: ${invites.length}`);

  // Security reminder
  console.log('\nIMPORTANT: Keep the invites.json file private!');
  console.log('Add it to .gitignore to prevent accidentally committing guest data.');
}

// Run the script
main();
