const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { buildAttestation } = require('./sign');
require('dotenv').config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/**
 * POST /attestations
 * Register a new signed attestation in the Supabase registry.
 */
app.post('/attestations', async (req, res) => {
  const {
    document_hash,
    attorney_name,
    bar_number,
    jurisdiction,
    review_date,
    attestation_statement,
    signature,
    public_key,
  } = req.body;

  if (!document_hash || !attorney_name || !bar_number || !jurisdiction || !signature || !public_key) {
    return res.status(400).json({ error: 'Missing required fields: document_hash, attorney_name, bar_number, jurisdiction, signature, public_key' });
  }

  const { data, error } = await supabase
    .from('verifications')
    .insert({
      document_hash,
      attorney_name,
      bar_number,
      jurisdiction,
      review_date: review_date || new Date().toISOString(),
      attestation_statement: attestation_statement || `I, ${attorney_name}, have reviewed this AI-generated legal document and attest to its accuracy and compliance.`,
      signature,
      public_key,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ attestation: data });
});

/**
 * GET /attestations/:hash
 * Look up all attestations for a given document hash.
 */
app.get('/attestations/:hash', async (req, res) => {
  const { data, error } = await supabase
    .from('verifications')
    .select('*')
    .eq('document_hash', req.params.hash);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'No attestations found for this document hash' });
  }

  res.json({ attestations: data });
});

/**
 * GET /attestations/attorney/:barNumber
 * Look up all attestations by a given attorney's bar number.
 */
app.get('/attestations/attorney/:barNumber', async (req, res) => {
  const { data, error } = await supabase
    .from('verifications')
    .select('*')
    .eq('bar_number', req.params.barNumber);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ attestations: data || [] });
});

/**
 * GET /health
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', protocol: 'LegalSeal', version: '1.0.0' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`LegalSeal verification API running on port ${PORT}`);
  });
}

module.exports = app;
