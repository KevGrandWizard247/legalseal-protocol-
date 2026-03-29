const crypto = require('crypto');
const fs = require('fs');

/**
 * Hash a document string using SHA-256.
 */
function hashDocument(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

/**
 * Hash a document file using SHA-256.
 */
function hashFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return hashDocument(content);
}

module.exports = { hashDocument, hashFile };
