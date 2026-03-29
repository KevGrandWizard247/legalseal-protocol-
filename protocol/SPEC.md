# LegalSeal Protocol Specification v1.0

## 1. Overview

LegalSeal is a cryptographic attestation protocol that enables attorneys to create verifiable, tamper-proof records of their review of AI-generated legal documents. It provides the technical infrastructure to satisfy bar association mandates for human verification of AI output.

## 2. Goals

- Provide cryptographic proof that a licensed attorney reviewed a specific document
- Create a tamper-proof link between the document, the attorney, and their attestation
- Enable third-party verification without exposing the original document
- Maintain a public registry of attestations

## 3. Definitions

- **Document Hash**: A SHA-256 hex digest of the document content (UTF-8 encoded)
- **Attestation**: A structured JSON payload linking a document hash to an attorney's identity and review statement
- **Signature**: An RSA-SHA256 digital signature over the canonical attestation payload
- **Registry**: A persistent store of signed attestations (Supabase `verifications` table)

## 4. Attestation Payload

The canonical attestation payload is a JSON string with the following fields, serialized in this exact order:

```json
{
  "documentHash": "<SHA-256 hex string>",
  "attorneyName": "<full legal name>",
  "barNumber": "<bar association number>",
  "jurisdiction": "<issuing jurisdiction>",
  "reviewDate": "<ISO 8601 date string>",
  "attestationStatement": "<free-text attestation>"
}
```

If no custom statement is provided, the default is:

> I, {attorneyName}, have reviewed this AI-generated legal document and attest to its accuracy and compliance.

## 5. Signing Process

1. **Hash** the document content using SHA-256 to produce a hex digest.
2. **Build** the attestation payload as a canonical JSON string.
3. **Sign** the payload using RSA-SHA256 with the attorney's 2048-bit RSA private key.
4. **Encode** the signature as a Base64 string.
5. **Register** the attestation and signature in the verification registry.

## 6. Verification Process

1. **Retrieve** the attestation record from the registry by document hash.
2. **Rebuild** the canonical attestation payload from the stored fields.
3. **Verify** the RSA-SHA256 signature using the attorney's public key.
4. **Confirm** that the document hash matches the hash of the document in question.

## 7. Registry Schema

The `verifications` table stores attestation records with the following columns:

| Column                 | Type      | Description                        |
|------------------------|-----------|------------------------------------|
| id                     | uuid      | Primary key                        |
| document_hash          | text      | SHA-256 hex digest of the document |
| attorney_name          | text      | Attorney's full legal name         |
| bar_number             | text      | Bar association number             |
| jurisdiction           | text      | Issuing jurisdiction               |
| review_date            | timestamp | Date of attorney review            |
| attestation_statement  | text      | The attestation text               |
| signature              | text      | Base64-encoded RSA-SHA256 signature|
| public_key             | text      | PEM-encoded RSA public key         |
| created_at             | timestamp | Record creation timestamp          |

## 8. API Endpoints

### `POST /attestations`
Register a signed attestation. Required body fields: `document_hash`, `attorney_name`, `bar_number`, `jurisdiction`, `signature`, `public_key`. Optional: `review_date`, `attestation_statement`.

### `GET /attestations/:hash`
Retrieve all attestations for a given document hash.

### `GET /attestations/attorney/:barNumber`
Retrieve all attestations by a specific attorney.

### `GET /health`
Returns API status and protocol version.

## 9. Security Considerations

- Private keys must never be transmitted or stored in the registry. Only signatures are persisted.
- Document content is never stored — only the hash. This preserves client confidentiality.
- The protocol does not validate bar membership. Integrators should verify bar status through jurisdiction-specific APIs.
- TLS should be enforced on all API endpoints in production.

## 10. Future Extensions

- Multi-attorney co-signing for documents requiring multiple reviews
- On-chain anchoring of attestation hashes for additional immutability
- Bar association API integration for real-time license verification
- Timestamping authority (TSA) integration for non-repudiation
