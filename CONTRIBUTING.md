# Contributing to LegalSeal Protocol

Thanks for your interest in contributing to LegalSeal. This document covers the basics for getting started.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies with `npm install`
4. Create a feature branch from `main`

## Development Setup

Copy the environment template and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Run the example to verify your setup:

```bash
node examples/basic-verification.js
```

## Making Changes

- Keep changes focused — one feature or fix per pull request
- Follow the existing code style (CommonJS modules, JSDoc comments)
- Update documentation if your change affects the API, protocol spec, or setup instructions
- Add or update examples if you introduce new functionality

## Protocol Changes

Changes to [protocol/SPEC.md](protocol/SPEC.md) require extra care:

- Open an issue first to discuss the proposed change
- Clearly describe the motivation and any backwards compatibility implications
- Protocol version bumps must be reflected in the spec, the `/health` endpoint, and the README

## Commit Messages

Write clear, concise commit messages that describe what the change does and why. Use the imperative mood (e.g., "Add public key validation" not "Added public key validation").

## Pull Requests

1. Ensure the example still runs successfully
2. Describe what your PR does and link any related issues
3. Keep the diff as small as reasonably possible

## Reporting Issues

When reporting a bug, include:

- Steps to reproduce
- Expected vs actual behavior
- Node.js version and OS

## Security

If you discover a security vulnerability, **do not** open a public issue. Instead, contact the maintainers directly so it can be addressed before disclosure.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT license.
