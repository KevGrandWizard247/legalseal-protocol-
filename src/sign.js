const crypto = require('crypto');

/**
 * Generate an RSA key pair for attorney signing.
 */
function generateKeyPair() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
}

/**
 * Build the canonical attestation payload that gets signed.
 */
function buildAttestation({ documentHash, attorneyName, barNumber, jurisdiction, reviewDate, statement }) {
  return JSON.stringify({
    documentHash,
    attorneyName,
    barNumber,
    jurisdiction,
    reviewDate,
    attestationStatement: statement || `I, ${attorneyName}, have reviewed this AI-generated legal document and attest to its accuracy and compliance.`,
  });
}

/**
 * Sign an attestation payload with the attorney's private key.
 */
function signAttestation(attestationPayload, privateKey) {
  const signer = crypto.createSign('SHA256');
  signer.update(attestationPayload);
  signer.end();
  return signer.sign(privateKey, 'base64');
}

/**
 * Verify a signature against the attestation payload and public key.
 */
function verifySignature(attestationPayload, signature, publicKey) {
  const verifier = crypto.createVerify('SHA256');
  verifier.update(attestationPayload);
  verifier.end();
  return verifier.verify(publicKey, signature, 'base64');
}

/**
 * High-level: create a full signed attestation.
 */
function createSignedAttestation(details, privateKey) {
  const payload = buildAttestation(details);
  const signature = signAttestation(payload, privateKey);
  return {
    ...JSON.parse(payload),
    signature,
  };
}

module.exports = {
  generateKeyPair,
  buildAttestation,
  signAttestation,
  verifySignature,
  createSignedAttestation,
};
