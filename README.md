# LegalSeal Protocol

Cryptographic attorney attestation protocol for AI-generated legal output.

100,000+ lawyers use legal AI tools daily. Bar associations mandate human verification of AI output, but no technical infrastructure exists to prove it happened. LegalSeal fills that gap.

## How It Works

1. **Hash** — The AI-generated document is hashed with SHA-256 (the document itself is never stored)
2. **Attest** — The reviewing attorney builds a structured attestation linking their identity to the document hash
3. **Sign** — The attestation is cryptographically signed with the attorney's RSA private key
4. **Register** — The signed attestation is stored in a Supabase verification registry
5. **Verify** — Anyone can look up a document hash and verify the attorney's signature

## Quick Start

```bash
npm install
```

### Run the Example

```bash
node examples/basic-verification.js
```

This demonstrates the full flow: hashing a document, signing an attestation, verifying the signature, and detecting tampering.

### Start the API Server

```bash
# Set up your environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

node src/verify.js
```

## API Endpoints

### `POST /attestations`

Register a signed attestation.

```bash
curl -X POST http://localhost:3000/attestations \
  -H "Content-Type: application/json" \
  -d '{
    "document_hash": "abc123...",
    "attorney_name": "Sarah Chen",
    "bar_number": "CA-298371",
    "jurisdiction": "California",
    "signature": "base64-signature..."
  }'
```

### `GET /attestations/:hash`

Look up all attestations for a document hash.

```bash
curl http://localhost:3000/attestations/abc123...
```

### `GET /attestations/attorney/:barNumber`

Look up all attestations by a specific attorney.

```bash
curl http://localhost:3000/attestations/attorney/CA-298371
```

### `GET /health`

```bash
curl http://localhost:3000/health
```

## Project Structure

```
src/
  hash.js    — SHA-256 document hashing
  sign.js    — RSA key generation, attestation building, signing & verification
  verify.js  — Express API server with Supabase registry
protocol/
  SPEC.md    — Full protocol specification
examples/
  basic-verification.js — End-to-end working example
```

## Supabase Setup

Create a `verifications` table with this schema:

```sql
CREATE TABLE verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_hash TEXT NOT NULL,
  attorney_name TEXT NOT NULL,
  bar_number TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  review_date TIMESTAMPTZ DEFAULT now(),
  attestation_statement TEXT,
  signature TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_verifications_hash ON verifications (document_hash);
CREATE INDEX idx_verifications_bar ON verifications (bar_number);
```

## Environment Variables

| Variable       | Description              |
|----------------|--------------------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Your Supabase anon key    |
| `PORT`         | API server port (default: 3000) |

## Security

- Document content is **never stored** — only SHA-256 hashes
- Private keys are **never transmitted** — only signatures are persisted
- The protocol does **not** validate bar membership; integrators should verify bar status through jurisdiction-specific APIs
- TLS should be enforced on all API endpoints in production

## License

ISC
