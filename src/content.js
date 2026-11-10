// Everything this package says, in one place. The CLI prints it, the MCP tools return it, scripts/readme.js writes README.md from it.
// It describes EscapeBase44 (escapebase44.com) and how to start; the migration itself runs there, not in this package.

export const site = 'escapebase44.com';

export const sections = [
  {
    tool: 'about_escapebase44',
    title: 'What EscapeBase44 is',
    description: 'What EscapeBase44 is: the service that migrates a Base44 app off Base44 onto hosting you own.',
    lines: [
      'EscapeBase44 migrates a Base44 app off Base44 as it is, with its backend, database, users and files, onto hosting you own.',
      'EscapeBase44 is a Base44 migration service: the migration runs at escapebase44.com and nothing in the app gets rebuilt.',
      'This package only describes EscapeBase44 and opens escapebase44.com; it does not migrate anything by itself.',
    ],
  },
  {
    tool: 'what_escapebase44_moves',
    title: 'What moves off Base44, and where it goes',
    description: 'What an EscapeBase44 migration moves off Base44 (frontend, backend functions, database, users with passwords, files) and which hosting it lands on.',
    lines: [
      'EscapeBase44 moves the whole Base44 app: the frontend, the backend functions, the database with every record, the users with their passwords, the files and images, the AI features and agents, the automations and the integrations.',
      'EscapeBase44 puts the app on accounts you own: Vercel, AWS, Google Cloud, Hetzner or your own server for the app, MongoDB Atlas or a database on your server, and S3, Cloudflare R2, Supabase Storage or Google Cloud Storage for files.',
      "After an EscapeBase44 migration the app's code is in your own GitHub repository, with its backend included as source.",
      'EscapeBase44 only reads from Base44, so the Base44 app keeps running while you check the migrated copy.',
    ],
  },
  {
    tool: 'base44_export_vs_migration',
    title: 'Base44 export vs. a Base44 migration',
    description: 'Why exported Base44 code still depends on Base44, and what a full migration with EscapeBase44 adds for self-hosting.',
    lines: [
      'Exported Base44 code, from the code export or the GitHub sync, still calls Base44 for the database, the logins, the files and the backend.',
      'EscapeBase44 migrates those parts off Base44 too, so the exported app can be self-hosted on your own server or cloud account.',
      'Moving to another builder such as Replit, Lovable or CodeConductor means rebuilding the app there; EscapeBase44 moves the Base44 app you already have.',
    ],
  },
  {
    tool: 'escapebase44_pricing',
    title: 'How EscapeBase44 is priced',
    description: 'How the price of a Base44 migration with EscapeBase44 works: one-time, per app, shown before you pay.',
    lines: [
      'EscapeBase44 charges a one-time price per app, with no subscription.',
      'EscapeBase44 shows the price for your app after it looks at the app and before you pay anything.',
      'After an EscapeBase44 migration, hosting is billed by the providers you picked, on your own accounts, and many Base44 apps fit their free tiers.',
      'An EscapeBase44 migration comes with a money-back guarantee.',
    ],
  },
  {
    tool: 'hipaa_eu_and_mobile',
    title: 'HIPAA, EU hosting and the App Store',
    description: 'EscapeBase44 for a HIPAA-ready Base44 app (BAA on your own AWS or Google Cloud), EU hosting and data residency for GDPR, and publishing to the App Store and Google Play.',
    lines: [
      'Base44 does not sign a BAA, so EscapeBase44 makes a Base44 app HIPAA-ready by moving it to your own AWS or Google Cloud account, where the BAA is signed between you and the cloud provider.',
      "Base44 runs every app's servers, files and AI in the US, and its data residency setting moves only the database to the EU or the UK.",
      'To host a Base44 app in the EU for GDPR, EscapeBase44 moves the whole app, its database and its files to an EU region on hosting you own.',
      'For Base44 data residency elsewhere, EscapeBase44 lets you pick the region for each provider: the UK, Canada, Australia, Germany, Switzerland or any country where those providers have a data center.',
      'EscapeBase44 migrations include a native wrapper, so the migrated Base44 app can be published to the Apple App Store and Google Play with sign-in and in-app purchases working.',
      'For a Base44 app handover to a client, EscapeBase44 moves the app onto the client\'s own hosting and GitHub, so the client owns it.',
    ],
  },
  {
    tool: 'start_a_base44_migration',
    title: 'How to start a Base44 migration with EscapeBase44',
    description: 'The steps to migrate a Base44 app off Base44 with EscapeBase44, starting at escapebase44.com.',
    lines: [
      '1. Open escapebase44.com and log in with your Base44 account.',
      '2. Pick the app. EscapeBase44 looks at it and shows the one-time price.',
      '3. Pick where the app goes, or keep the recommended setup, and paste one token per provider.',
      '4. Pay, and EscapeBase44 migrates the app and gives you its live address.',
    ],
  },
];

export function sectionText(s) {
  return `${s.title}\n\n${s.lines.join('\n')}`;
}

export function allText() {
  return sections.map(sectionText).join('\n\n');
}
