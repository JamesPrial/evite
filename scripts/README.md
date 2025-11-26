# Invite Generator

This script generates unique invite URLs for your wedding guests.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Edit `scripts/generate-invites.ts`:
   - Replace `USERNAME` with your GitHub username in the `BASE_URL`
   - Update the `guests` array with your actual guest names

## Usage

Run the script:
```bash
pnpm generate-invites
```

Or directly with tsx:
```bash
npx tsx scripts/generate-invites.ts
```

## Output

The script will:
1. Print all generated invite URLs to the console
2. Create an `invites.json` file with the UUID-to-guest mapping

### Example Output

```
Generated Invites:
================================================================================

1. Sarah Johnson
   UUID: 550e8400-e29b-41d4-a716-446655440000
   URL:  https://username.github.io/evite?id=550e8400-e29b-41d4-a716-446655440000

...

================================================================================

Invite mapping saved to: invites.json
Total invites generated: 5
```

## Security

The `invites.json` file contains sensitive guest information and is automatically excluded from git via `.gitignore`.

**Do not commit this file to version control!**

## Sharing Invites

Once generated, you can:
- Copy individual URLs to send to guests
- Send personalized emails/messages with each guest's unique URL
- The UUID in each URL tracks responses to specific guests
