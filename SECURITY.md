# Security Policy

## Security Considerations

Venice Studio is designed as a local, privacy-focused web application. This document outlines security considerations and known trade-offs.

## API Key Storage

### Current Implementation (Browser)

**Method**: localStorage  
**Risk Level**: Low to Medium (acceptable for local use)

**Why this approach:**
1. **Local-only operation**: Application runs entirely in the browser
2. **No server**: No backend to compromise
3. **Origin isolation**: localStorage is isolated to the app's origin
4. **HTTPS only**: Keys are only transmitted to Venice AI over HTTPS
5. **User control**: Users can clear keys at any time

**Mitigation strategies:**
- Keys never logged or exposed in console
- No telemetry or analytics
- No third-party access
- Users should not use this in shared/public computers

### Future Enhancement (Desktop App)

When packaged as a Tauri desktop app:
- Use OS-level secure storage (keychain on macOS, Credential Manager on Windows)
- Encrypt keys at rest
- Require user authentication for key access

## Data Privacy

### What We Store
- API key (localStorage)
- User preferences (localStorage)
- Temporary request stats (memory only)

### What We Don't Store
- Conversation history (not persisted)
- Generated images (not persisted)
- User prompts (not logged)
- Personal information

### Data Flow
```
User Device → Venice AI API
(No intermediary servers)
```

## Network Security

### HTTPS Only
- All Venice API calls over HTTPS
- No unencrypted communication
- Certificate validation enforced

### Headers Exposure
Venice response headers may contain:
- Rate limit information
- Account balances
- Request IDs

These are displayed in the Stats panel but not stored persistently.

## Code Security

### Dependencies
- Regular updates via Dependabot
- Audit with `npm audit`
- No known high-severity vulnerabilities

### Build Process
- TypeScript for type safety
- ESLint for code quality
- No eval() or dangerous patterns

## Known Limitations

### Browser-Based Storage
⚠️ **Known Issue**: API keys stored in localStorage (CodeQL alert)

**Status**: Accepted risk for browser-based application  
**Justification**: 
- Necessary for stateless web app operation
- Alternative (cookies) has similar risks
- Users warned to not use on shared devices
- Future desktop version will use OS keychain

**Recommendation**: 
- Use in trusted, personal devices only
- Don't use in public/shared computers
- Clear browser data when done if on shared device

### Client-Side Only
- No server-side validation
- Relies on Venice API for security
- Trust boundary at Venice API

## Best Practices for Users

### Do's ✅
- Use on your personal device
- Keep your API key secret
- Update the app regularly
- Use HTTPS connections only
- Clear localStorage if sharing device

### Don'ts ❌
- Don't share your API key
- Don't use on public/shared computers
- Don't expose localhost to network
- Don't embed in public websites
- Don't commit .env files

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email security concerns to the maintainers
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours.

## Security Roadmap

### Near-term (v0.2)
- [ ] Add session timeout for API key
- [ ] Implement key expiry warnings
- [ ] Add "secure context" checks

### Future (v1.0+)
- [ ] Tauri desktop app with OS keychain
- [ ] Encrypted localStorage (if staying web-based)
- [ ] Content Security Policy headers
- [ ] Subresource Integrity (SRI)

## Compliance

### GDPR
- No personal data collected
- No cookies used
- No tracking or analytics
- User data stays local

### Venice AI Terms
- Users responsible for API key security
- Must comply with Venice AI terms of service
- Rate limits enforced by Venice API

## Security Checklist

Before each release:
- [ ] Run `npm audit`
- [ ] Update dependencies
- [ ] Run CodeQL analysis
- [ ] Review localStorage usage
- [ ] Test HTTPS enforcement
- [ ] Verify no hardcoded secrets
- [ ] Check for console.log of sensitive data
- [ ] Review third-party dependencies

## Additional Resources

- [Venice AI Security](https://venice.ai/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Guidelines](https://developer.mozilla.org/en-US/docs/Web/Security)

## Security Acknowledgments

We use:
- CodeQL for static analysis
- npm audit for dependency scanning
- GitHub Security Advisories
- Community security reports

---

**Last Updated**: 2025-10-19  
**Version**: 0.1.0
