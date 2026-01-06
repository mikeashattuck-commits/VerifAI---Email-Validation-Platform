import { DnsResponse } from '../types';

/**
 * Checks MX records for a domain using Google's DNS-over-HTTPS API.
 * This allows us to perform "server-like" DNS checks from the browser.
 */
export async function getMxRecords(domain: string): Promise<string[]> {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    
    if (!response.ok) {
      console.warn('DNS check failed network request');
      return [];
    }

    const data: DnsResponse = await response.json();

    if (data.Status !== 0 || !data.Answer) {
      return [];
    }

    // Parse MX records from the 'data' field (e.g., "5 gmail-smtp-in.l.google.com.")
    return data.Answer
      .map(record => record.data)
      .sort((a, b) => {
        const priorityA = parseInt(a.split(' ')[0], 10);
        const priorityB = parseInt(b.split(' ')[0], 10);
        return priorityA - priorityB;
      });
  } catch (error) {
    console.error('Error fetching MX records:', error);
    return [];
  }
}