// A subset of common disposable domains for client-side checking
export const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'temp-mail.org',
  'yopmail.com',
  'trashmail.com',
  'getairmail.com',
  'sharklasers.com',
  'tempmail.net',
  'throwawaymail.com',
  'maildrop.cc'
]);

export const FREE_PROVIDERS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'zoho.com',
  'yandex.com',
  'mail.com'
]);

export const TYPO_MAPPINGS: Record<string, string> = {
  'gmil.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'yhoo.com': 'yahoo.com',
  'hotmal.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'gmial.com': 'gmail.com'
};

export const ROLE_ACCOUNTS = new Set([
  'admin',
  'support',
  'info',
  'sales',
  'marketing',
  'help',
  'contact',
  'abuse',
  'billing',
  'noreply',
  'no-reply'
]);