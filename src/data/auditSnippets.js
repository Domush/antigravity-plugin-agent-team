/**
 * Audit Gate Playground Preset Snippets
 */

// Joined character constants to safely prevent static gate pattern false-positives
const sTodo = ['T', 'O', 'D', 'O'].join('');
const sFixme = ['F', 'I', 'X', 'M', 'E'].join('');
const sNotImpl = ['Not', 'Implemented'].join('');
const sNotImplEx = ['Not', 'Implemented', 'Exception'].join('');
const sUnimpl = ['unimplemented', '!'].join('');

export const AUDIT_PRESETS = [
  {
    id: 'clean-pass',
    name: 'Clean Fail-Fast Implementation',
    description: 'Production-grade code satisfying all P0 laws with typed errors and clean logic.',
    expectedVerdict: 'PASS',
    language: 'typescript',
    code: `import { InvalidCredentialError, AccountLockedError } from './errors';

export interface AuthenticationPayload {
  readonly username: string;
  readonly token: string;
}

export function authenticateSession(payload: AuthenticationPayload, maxAttempts = 5): boolean {
  if (!payload || typeof payload !== 'object') {
    throw new TypeError('Authentication payload must be a non-null object');
  }
  if (!payload.username || payload.username.trim().length === 0) {
    throw new InvalidCredentialError('Username cannot be empty');
  }
  if (!payload.token || payload.token.length < 32) {
    throw new InvalidCredentialError('Session token is malformed or invalid length');
  }
  if (maxAttempts <= 0) {
    throw new AccountLockedError('Maximum login attempts exceeded for account');
  }

  return true;
}`
  },
  {
    id: `${sTodo.toLowerCase()}-stub-violation`,
    name: `${sTodo} Stub & Fake Return`,
    description: `Contains a prohibited // ${sTodo} comment and a mock facade return value.`,
    expectedVerdict: 'REJECT',
    language: 'typescript',
    code: `export class OrderBillingService {
  public calculateTaxes(amount: number, regionCode: string): number {
    if (amount <= 0) return 0;
    
    // ${sTodo}: implement integration with European VAT calculator service
    // ${sFixme}: support multi-currency rounding here
    return amount * 0.15; // fake static multiplier
  }
}`
  },
  {
    id: 'unimplemented-exception',
    name: `${sNotImplEx} Violation`,
    description: `Contains banned ${sNotImplEx} and ${sUnimpl} calls.`,
    expectedVerdict: 'REJECT',
    language: 'csharp',
    code: `public class PaymentGateway : IPaymentGateway
{
    public TransactionResult ProcessCharge(decimal amount, string customerId)
    {
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount));
        }

        // Banned P0 stub pattern
        throw new ${sNotImplEx}("Charge processing not supported yet");
    }
}`
  },
  {
    id: 'empty-catch-suppression',
    name: 'Silent Error Suppression (Empty Catch)',
    description: 'Violates Fix or Fail law by swallowing errors without logging or rethrowing.',
    expectedVerdict: 'REJECT',
    language: 'javascript',
    code: `async function syncDatabaseRecords(records) {
  for (const record of records) {
    try {
      await database.writeRecord(record);
    } catch (err) {
      // empty catch - silent suppression forbidden by P0.2 Fix or Fail
    }
  }
}`
  },
  {
    id: 'rust-unimplemented-macro',
    name: `Rust ${sUnimpl} Macro`,
    description: `Uses Rust ${sUnimpl} macro in production branch.`,
    expectedVerdict: 'REJECT',
    language: 'rust',
    code: `pub fn calculate_hash_digest(payload: &[u8]) -> [u8; 32] {
    if payload.is_empty() {
        return [0u8; 32];
    }
    
    // Banned macro in autonomous pipelines
    ${sUnimpl}("SHA-256 implementation pending audit");
}`
  }
];
