import { DISPOSABLE_DOMAINS, ROLE_ACCOUNTS, TYPO_MAPPINGS } from '../constants';
import { ValidationStatus, VerificationResult } from '../types';
import { getMxRecords } from './dnsService';
import { analyzeEmailWithGemini } from './geminiService';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function verifyEmail(email: string): Promise<VerificationResult> {
  const result: VerificationResult = {
    email,
    user: '',
    domain: '',
    formatValid: false,
    mxFound: false,
    disposable: false,
    roleAccount: false,
    score: 0,
    status: ValidationStatus.VALIDATING,
    mxRecords: []
  };

  // 1. Syntax Check
  if (!EMAIL_REGEX.test(email)) {
    result.status = ValidationStatus.INVALID;
    result.aiAnalysis = "Invalid email format.";
    return result;
  }
  result.formatValid = true;

  const [user, domain] = email.toLowerCase().split('@');
  result.user = user;
  result.domain = domain;

  // 2. Local Logic Checks
  // Check for common typos
  if (TYPO_MAPPINGS[domain]) {
    result.didYouMean = `${user}@${TYPO_MAPPINGS[domain]}`;
  }

  // Check Disposable
  if (DISPOSABLE_DOMAINS.has(domain)) {
    result.disposable = true;
    result.status = ValidationStatus.INVALID;
    result.score = 0;
    result.aiAnalysis = "Blocked: Known disposable domain provider.";
    return result; // Early exit for known trash domains
  }

  // Check Role Account
  if (ROLE_ACCOUNTS.has(user)) {
    result.roleAccount = true;
  }

  // 3. DNS Check (Async)
  const mxRecords = await getMxRecords(domain);
  result.mxRecords = mxRecords;
  result.mxFound = mxRecords.length > 0;

  if (!result.mxFound) {
    result.status = ValidationStatus.INVALID;
    result.score = 10;
    result.aiAnalysis = "Domain has no valid Mail Exchange (MX) records.";
  } else {
    // 4. Calculate Base Score
    let score = 100;
    if (result.roleAccount) score -= 20;
    if (result.didYouMean) score -= 30;
    result.score = score;
    
    // 5. AI Augmentation (Optional but powerful)
    // We only call AI if we passed the basic hurdles to save latency/tokens on obvious trash
    try {
      const aiRes = await analyzeEmailWithGemini(email, result);
      result.aiAnalysis = aiRes.aiAnalysis;
      if (aiRes.score !== undefined) {
         // Blend the score: 60% local, 40% AI
         result.score = Math.round((result.score * 0.6) + (aiRes.score * 0.4));
      }
      if (aiRes.didYouMean) {
        result.didYouMean = aiRes.didYouMean;
      }
    } catch (e) {
      console.warn("AI skipped", e);
    }

    // Final Status Determination
    if (result.score >= 80) result.status = ValidationStatus.VALID;
    else if (result.score >= 50) result.status = ValidationStatus.WARNING;
    else result.status = ValidationStatus.INVALID;
  }

  return result;
}